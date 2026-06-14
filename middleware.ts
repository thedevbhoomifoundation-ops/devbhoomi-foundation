import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/internship/apply(.*)',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Protect admin routes
  if (isAdminRoute(req)) {
    // If accessing admin login page, allow checking or sign-in
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const roles = (sessionClaims?.publicMetadata as { roles?: string[] })?.roles || []
    if (!userId || !roles.includes('ADMIN')) {
      const homeUrl = new URL('/', req.url)
      return NextResponse.redirect(homeUrl)
    }
  }

  // Protect regular user dashboard & application routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      const { redirectToSignIn } = await auth()
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
