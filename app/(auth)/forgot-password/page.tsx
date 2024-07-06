import ForgotPasswordForm from "@/components/forms/auth/forgotPasswordForm";
import AuthWrapper from "@/components/wrappers/authWrapper";

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper
      heading="Payroll Management System"
      description="Forgot Your Password?"
      backButtonLink="/login"
      backButtonTitle="Back to Login"
      >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
