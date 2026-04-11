"use client";

import TopBar from '../_common/TopBar';
import LoginForm from "@/src/app/login/LoginForm";

function LoginPage() {
  return (
    <>
        <TopBar
          text="Log In"
          isPuzzlePage={false}
        />
      <LoginForm />
    
    </>
  );
}

export default LoginPage;