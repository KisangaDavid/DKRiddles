import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/signIn", request.url));
  }
}
// TODO: transition to using kebab case for all urls
export const config = {
  matcher: ["/profile"],
};
