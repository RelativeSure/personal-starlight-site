import * from "@flaregun-net/proxyflare-for-pages"

const slackRoute: Route = {
  from: { pattern: "rasmusj.dk/proxyflare" },
  to: { 
    url: "slack.com",
    website: {
      mode: "spa",
      resources: [],
      /*resources: [
        "rasmusj.dk/proxyflare/*"
      ]*/
    },
  },
}
  
const routes = [slackRoute]
  
// `PagesFunction` is from @cloudflare/workers-types
/*export const onRequest: PagesFunction[] = [
  (context) =>
    proxyflare({
      config: {
        global: { debug: true },
        routes,
      },
    })(context),
  // other Pages plugins and middleware
]*/
