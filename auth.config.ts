import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      // Public routes
      const publicRoutes = ['/', '/login'];

      // Protect dashboard routes
      if (path.startsWith('/dashboard')) {
        if (!isLoggedIn) return false; // redirect to login
        return true; // allow access
      }

      // Redirect logged-in users away from login page
      if (isLoggedIn && path === '/login') {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Allow access to all other public routes
      if (publicRoutes.includes(path)) return true;

      // Default fallback: allow
      return true;
    },
  },
  providers: [], // add providers later
} satisfies NextAuthConfig;
