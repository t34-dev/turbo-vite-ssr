import { redirect } from "vike/abort";

export function authGuard(pageContext: any) {
  if (!pageContext.user) {
    throw redirect("/auth/sign-in");
  }
}
