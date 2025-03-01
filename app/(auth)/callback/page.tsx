import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201) {
    redirect("/dashboard");
    // const redirectUrl = auth.status === 200 || auth.status === 201 ? ' /dashboard ' : ' /sign-in ';
    // console.log('Redirecting to:', redirectUrl); // 打印出重定向路径
    // redirect(redirectUrl);
  } else if (
    auth.status === 400 ||
    auth.status === 403 ||
    auth.status === 500
  ) {
    redirect("/sign-in");
  }
};

export default AuthCallbackPage;
