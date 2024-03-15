import React from 'react'

import RegisterForm from '@/components/forms/registerForm'
import AuthWrapper from '@/components/wrappers/authWrapper'

const RegisterPage = () => {
  return (
    <AuthWrapper
    heading='Payroll Management System'
    description='REGISTER'
    backButtonLink='/login'
    backButtonTitle='Already have an account'
    showSocial
    >
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage
