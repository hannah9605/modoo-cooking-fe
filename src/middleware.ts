import { auth } from "./auth";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
}

// 로그인 해야지만 들어가지는 page들
// export const config = {
//   matcher: ["/Cooking/Recipe"],
// };
