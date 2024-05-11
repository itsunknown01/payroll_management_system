import LoginForm from "@/components/forms/auth/loginForm";
import AuthWrapper from "@/components/wrappers/authWrapper";

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
