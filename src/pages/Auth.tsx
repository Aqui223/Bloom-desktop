import AuthHeader from "../components/auth/AuthHeader.tsx";
import {AuthFooter} from "../components/auth/AuthFooter.tsx";
import {AuthContent} from "../components/auth/AuthContent.tsx";

export function Auth() {
  return (
    <main className="size-full flex flex-col justify-center items-center">
      <AuthHeader/>
      <AuthContent/>
      <AuthFooter/>
    </main>
  )
}
