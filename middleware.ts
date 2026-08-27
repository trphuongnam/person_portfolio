import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  // Case 1: Đã có token mà cố vào trang login → đá sang dashboard/contact
  if (pathname === '/admin/login') {
    if (token) {
      return NextResponse.redirect(new URL('/admin/contact', request.url));
    }
    return NextResponse.next(); // chưa có token → cho vào trang login bình thường
  }

  // Case 2: Các route /admin khác → yêu cầu phải có token
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Có token → cho đi tiếp vào ĐÚNG trang đang request (không redirect cứng sang contact)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
