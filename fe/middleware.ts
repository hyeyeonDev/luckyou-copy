// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabase from './utils/supabase/client';

const publicRoutes = [
  '/signin',
  '/auth/callback',
  '/_next/static',
  '/_next/image',
  '/images',
  '/public',
  '/upload',
  '/favicon.ico',
  '/favicon.svg',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 인증 없이 접근 가능
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // http://localhost:3000/tarot/result/03650394-a2b9-40e2-a7d9-b53035c9d291
  // 정규식: /:dynamic1/:dynamic2 형태 (예: /foo/bar)
  // const basePathRegex = /^\/[^\/]+\/[^\/]+$/;
  // 정규식: /:dynamic1/:dynamic2/* 형태 (예: /foo/bar/sub, /foo/bar/sub/another)
  // const subPathRegex = /^\/[^\/]+\/[^\/]+\/.+/;

  // if (subPathRegex.test(pathname)) {
  //   return NextResponse.next();
  // }

  // 로그인하지 않은 경우 로그인 페이지로 리디렉션
  // 로그인 후 처리할 수 있는 세션을 업데이트하는 부분
  // const sessionResponse = await updateSession(request);
  // console.log(sessionResponse);
  // 세션 업데이트 결과에 따라 로그인되지 않은 경우 리디렉션
  // if (!sessionResponse.ok) {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  // 인증된 사용자라면 요청을 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    `/((?!signin|images|public|upload|api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
};
