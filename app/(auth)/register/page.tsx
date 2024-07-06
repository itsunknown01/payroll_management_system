import React from 'react'

import RegisterForm from '@/components/forms/auth/registerForm'
import AuthWrapper from '@/components/wrappers/authWrapper'

const RegisterPage = () => {
  return (
    <AuthWrapper
    heading='Payroll Management System'
    description='REGISTER'
    backButtonLink='/login'
    backButtonTitle='Already have an account'
    showSocial
    image
    >
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage
