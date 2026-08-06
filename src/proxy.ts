import { NextResponse, type NextRequest } from "next/server";

// US visitors get the intelligence page as the homepage; everyone else keeps the
// licensing homepage. Rewrite rather than redirect, so the URL stays "/" and
// /intelligence remains directly reachable from anywhere.
export function proxy(request: NextRequest) {
  // set by Vercel's edge — absent locally and on any other host, in which case
  // we fall through to the licensing homepage rather than hiding it from all
  if (request.headers.get("x-vercel-ip-country") === "US") {
    return NextResponse.rewrite(new URL("/intelligence", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
