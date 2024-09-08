import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  // Redirect to login if there's no token
  if (!token) {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  // Restrict access based on roles
  const userRole = token.role;

  if (url.pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/protected/:path*'],
};
