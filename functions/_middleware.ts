import proxyflare from "@flaregun-net/proxyflare-for-pages"

const routes: Route[] = [
  {
    from: {
      pattern: "rasmusj.dk/proxyflare",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "https://slack.com" },
  },
]

// `PagesFunction` is from @cloudflare/workers-types
export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: true },
        routes,
      },
    })(context),
  // other Pages plugins and middleware
]
