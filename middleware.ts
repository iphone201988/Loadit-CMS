import { NextRequest, NextResponse } from "next/server";

const api_url = process.env.API_URL;

const authenticatedMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/signin";

  try {
    const authSession = request.cookies.get("token")?.value;

    if (!authSession) {
      return NextResponse.redirect(url);
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + authSession);
    const response = await fetch(`${api_url}/admin/getPricings`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.redirect(url);
    }

    const responseData = await response.json();

    if (responseData.success) {
      return NextResponse.next();
    }
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.redirect(url);
  }
};

const middleware = (request: NextRequest) => {
  const excludedPaths = ["/auth/signin", "/auth/forget_password"];
  const isImage = request.nextUrl.pathname.includes("/images/");

  if (excludedPaths.includes(request.nextUrl.pathname)) {
    const authSession = request.cookies.get("token")?.value;
    if (authSession) {
      const baseUrl = request.nextUrl.origin;
      const previousPage = "/";

      const redirectUrl = new URL(previousPage, baseUrl);

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (request.nextUrl.pathname.includes("/logout")) {
    const baseUrl = request.nextUrl.origin;
    const previousPage = "/auth/signin";
    const redirectUrl = new URL(previousPage, baseUrl);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.delete("token");
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    
    return response
  }

  if (!excludedPaths.includes(request.nextUrl.pathname) && !isImage) {
    return authenticatedMiddleware(request);
  }
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image/public/public|/images|favicon.ico|robots.txt).*)",
  ],
};
