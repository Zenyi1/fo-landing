import { NextResponse, type NextRequest } from "next/server";

// Europe and North America get the intelligence page as the homepage; everyone
// else keeps the licensing homepage. Rewrite rather than redirect, so the URL
// stays "/" and /intelligence remains directly reachable from anywhere.
//
// Geographic Europe, including the non-EU east and the crown dependencies, plus
// the US, Canada and Mexico. Turkey and the Caucasus are left out: they sit
// mostly in Asia and read as licensing markets rather than as Europe. Kept as
// one string because Prettier puts a 56-element array on 56 lines.
const OPERATING_SYSTEM_MARKETS = new Set(
  // Europe
  (
    "AD AL AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR " +
    "HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS RU SE " +
    "SI SJ SK SM UA VA XK " +
    // North America
    "CA MX US"
  ).split(" "),
);

export function proxy(request: NextRequest) {
  // set by Vercel's edge — absent locally and on any other host, in which case
  // we fall through to the licensing homepage rather than hiding it from all
  const country = request.headers.get("x-vercel-ip-country");
  if (country && OPERATING_SYSTEM_MARKETS.has(country)) {
    return NextResponse.rewrite(new URL("/intelligence", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
