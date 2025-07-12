import type { APIRoute } from 'astro';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface RateLimitEntry {
  count: number;
  lastRequest: number;
}

// In-memory rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per 15 minutes

// Input validation and sanitization
function validateAndSanitizeInput(data: any): { isValid: boolean; errors: string[]; sanitized?: ContactFormData } {
  const errors: string[] = [];
  
  // Check if data exists
  if (!data || typeof data !== 'object') {
    errors.push('Invalid form data');
    return { isValid: false, errors };
  }

  const { name, email, message } = data;

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Name is required');
  } else if (name.trim().length === 0) {
    errors.push('Name cannot be empty');
  } else if (name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Invalid email format');
  } else if (email.length > 254) {
    errors.push('Email cannot exceed 254 characters');
  }

  // Validate message
  if (!message || typeof message !== 'string') {
    errors.push('Message is required');
  } else if (message.trim().length === 0) {
    errors.push('Message cannot be empty');
  } else if (message.length > 5000) {
    errors.push('Message cannot exceed 5000 characters');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize input - remove potentially dangerous characters and trim
  const sanitized: ContactFormData = {
    name: name.trim().replace(/[<>\"'&]/g, ''),
    email: email.trim().toLowerCase(),
    message: message.trim().replace(/[<>]/g, '') // Remove HTML tags but allow other chars
  };

  return { isValid: true, errors: [], sanitized };
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(clientIP);

  if (!entry) {
    // First request from this IP
    rateLimitStore.set(clientIP, { count: 1, lastRequest: now });
    return { allowed: true };
  }

  // Clean old entries
  if (now - entry.lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(clientIP, { count: 1, lastRequest: now });
    return { allowed: true };
  }

  // Check if rate limit exceeded
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.lastRequest + RATE_LIMIT_WINDOW - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment counter
  rateLimitStore.set(clientIP, { count: entry.count + 1, lastRequest: now });
  return { allowed: true };
}

function getClientIP(request: Request): string {
  // Try various headers to get real client IP
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback - in development this might be localhost
  return 'unknown';
}

async function sendEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  // Email sending logic would go here
  // For security, we'll use environment variables for configuration
  const emailTo = import.meta.env.CONTACT_EMAIL_TO;
  const emailService = import.meta.env.CONTACT_EMAIL_SERVICE;
  
  if (!emailTo) {
    console.log('Contact form submission (email not configured):', {
      from: data.email,
      name: data.name,
      message: data.message.substring(0, 100) + '...'
    });
    return { success: true }; // Return success even if email isn't configured
  }

  // Here you would integrate with your preferred email service
  // Examples: SendGrid, AWS SES, Nodemailer, etc.
  // For now, we'll just log the message
  console.log('Contact form submission:', {
    to: emailTo,
    from: data.email,
    name: data.name,
    message: data.message
  });

  return { success: true };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Security headers
    const securityHeaders = {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    // Check rate limiting
    const clientIP = getClientIP(request);
    const rateLimitCheck = checkRateLimit(clientIP);
    
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        }),
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': rateLimitCheck.retryAfter?.toString() || '900'
          }
        }
      );
    }

    // Parse and validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid content type. Expected application/json.' 
        }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Parse request body
    let requestData;
    try {
      requestData = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON in request body.' 
        }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(requestData);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed',
          details: validation.errors 
        }),
        { status: 400, headers: securityHeaders }
      );
    }

    // Send email
    const emailResult = await sendEmail(validation.sanitized!);
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to send message. Please try again later.' 
        }),
        { status: 500, headers: securityHeaders }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      }),
      { status: 200, headers: securityHeaders }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  }
};

// Reject non-POST requests
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { 
      status: 405, 
      headers: { 
        'Content-Type': 'application/json',
        'Allow': 'POST'
      } 
    }
  );
};