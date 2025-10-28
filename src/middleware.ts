import { NextRequest, NextResponse } from 'next/server';

const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Verificar si la ruta ya tiene /es en la URL
  const pathnameHasEs = pathname.startsWith('/es/') || pathname === '/es';
  
  // Si tiene /es, hacer rewrite a la ruta real y establecer locale español
  if (pathnameHasEs) {
    const newPathname = pathname.replace(/^\/es/, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = newPathname;
    
    const response = NextResponse.rewrite(url);
    response.cookies.set('locale', 'es', {
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
  
  // Solo cambiar a español si el dominio es .es
  if (hostname.endsWith('.es')) {
    // Si dominio es .es pero URL no tiene /es, redirigir
    const url = request.nextUrl.clone();
    url.pathname = `/es${pathname}`;
    
    const response = NextResponse.redirect(url);
    response.cookies.set('locale', 'es', {
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
  
  // Para cualquier otro caso (localhost, .com, vercel), usar inglés por defecto
  const response = NextResponse.next();
  response.cookies.set('locale', defaultLocale, {
    path: '/',
    sameSite: 'lax',
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

