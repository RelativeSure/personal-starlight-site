import proxyflare from "@flaregun-net/proxyflare-for-pages"
import type { Route } from "@flaregun-net/proxyflare-for-pages/build/types"

const routes: Route[] = [
    {
      from: {
        pattern: "rasmusj.dk/proxyflare",
        alsoMatchWWWSubdomain: true,
      },
      to: {
        url: "slack.com",
        // website: {
        //     mode: "spa",
        //     resources: [],
        // }
      },
    },
  ]

// `PagesFunction` is from @cloudflare/workers-types
export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: false },
        routes,
      },
    })(context),
  // other Pages plugins and middleware
]