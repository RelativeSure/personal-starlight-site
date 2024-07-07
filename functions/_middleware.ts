//import proxyflare from "@flaregun-net/proxyflare-for-pages"

const slackRoute: Route = {
  {
    from: {
      pattern: "rasmusj.dk/proxyflare",
      alsoMatchWWWSubdomain: true,
    },
    to: { url: "slack.com", statusCode: 301, },
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
