import NewPasswordForm from "@/components/forms/auth/newPasswordForm";
import AuthWrapper from "@/components/wrappers/authWrapper";

export default function NewPasswordPage() {
    return(
        <AuthWrapper
        heading="Payroll Management System"
        description="New Password"
        backButtonLink="/login"
        backButtonTitle="Back to Login"
        >
         <NewPasswordForm />
        </AuthWrapper>
    )
}