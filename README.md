# CV and Documentation

A personal documentation site built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), serving as both a CV and a knowledge base.

## 📚 Content

This site contains documentation and resources on various topics:
- IT Security
- Kubernetes
- Linux Systems
- Windows & WSL
- Bookmarks collection for:
  - Development
  - Security
  - Games
  - Health
  - And more...

## 🚀 Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [Starlight](https://starlight.astro.build) - Documentation Theme
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React](https://reactjs.org) - UI Components
- [TypeScript](https://www.typescriptlang.org) - Type Safety
- [MDX](https://mdxjs.com) - Enhanced Markdown
- [Cloudflare Pages](https://pages.cloudflare.com) - Hosting

## 🛠️ Development

### Prerequisites

- Node.js >= 24.0
- pnpm (Package Manager)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the site
- `pnpm preview` - Preview the built site
- `pnpm check` - Run type checking

## 📦 Project Structure

```markdown
.
├── src/
│   ├── content/    # Documentation content (MDX)
│   ├── components/ # UI components
│   ├── layouts/    # Page layouts
│   ├── pages/      # Route pages
│   └── styles/     # Global styles
├── public/         # Static assets
└── astro.config.mjs # Astro configuration
```

## 📧 Contact Form

The site includes a secure contact form with comprehensive security features:

### Security Features
- **Input Validation**: Server-side and client-side validation with sanitization
- **Rate Limiting**: 5 requests per IP per 15-minute window
- **XSS Protection**: Input sanitization and security headers
- **CSRF Protection**: Secure API endpoint with proper headers
- **Type Safety**: TypeScript validation throughout

### Configuration

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Configure your email settings in `.env`:
   ```env
   CONTACT_EMAIL_TO=your-email@example.com
   ```

3. The form will log submissions to console if no email is configured, making it safe for development.

### API Endpoint

The contact form uses `/api/contact` endpoint with:
- JSON-only requests
- Comprehensive input validation
- Rate limiting per IP address
- Security headers (XSS, CSRF protection)
- Error handling with detailed validation messages

## 🌐 Deployment

The site is configured for Cloudflare deployment using Wrangler.
