import LoginForm from "@/components/forms/auth/loginForm";
import AuthWrapper from "@/components/wrappers/authWrapper";
import CardWrapper from "@/components/wrappers/cardWrapper";
import React from "react";

const LoginPage = () => {
  return (
    <AuthWrapper
      heading="Payroll Management System"
      description="LOGIN"
      backButtonLink="/register"
      backButtonTitle="Don't have an account"
      showSocial
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
