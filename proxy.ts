import { proxy } from 'routingcat/next/proxy'

export default proxy()

export const config = {
  matcher: ['/((?!_next/|_rc/|api/|.*\\.(?!rsc$)[a-z0-9]+$).*)'], // RoutingCat: pages and .rsc payloads, prefetches included
}
