"use client"

import React, { useEffect, useState } from 'react'
import CreateDepartmentModal from '../modals/department/create-department-modal'
import EditDepartmentModal from '../modals/department/edit-department-modal'
import DeleteDepartmentModal from '../modals/department/delete-department-modal'
import CreatePositionModal from '../modals/position/create-position-modal'
import EditPositionModal from '../modals/position/edit-position-modal'
import DeletePositionModal from '../modals/position/delete-position-modal'
import CreateEmployeeModal from '../modals/employee/create-employee-modal'
import EditEmployeeModal from '../modals/employee/edit-employee-modal'
import DeleteEmployeeModal from '../modals/employee/delete-employee-modal'
import { EmployeeDetailsModal } from '../modals/employee/employee-details-modal'
import CreateAllowanceModal from '../modals/allowance/create-allowance-modal'
import EditAllowanceModal from '../modals/allowance/edit-allowance-modal'
import DeleteAllowanceModal from '../modals/allowance/delete-allowance-modal'
import CreateDeductionModal from '../modals/deduction/create-deduction-modal'
import EditDeductionModal from '../modals/deduction/edit-deduction-modal'
import DeleteDeductionModal from '../modals/deduction/delete-deduction-modal'
import EmployeeAllowanceModal from '../modals/employee-allowance/employee-allowance-modal'
import EmployeeDeductionModal from '../modals/employee-deduction/employee-deduction-modal'
import CreatePayrollModal from '../modals/payroll/create-payroll-modal'
import CreateAttendanceModal from '../modals/attendance/create-attendance-modal'
import EditPayrollModal from '../modals/payroll/edit-payroll-modal'
import DeletePayrollModal from '../modals/payroll/delete-payroll-modal'
import ViewPayrollModal from '../modals/payroll/view-payroll-modal'
import CreateUserModal from '../modals/user/create-user-modal'

const ModalProvider = () => {
  const [isMounted,setIsMounted] = useState(false)
    
  useEffect(() => {
    setIsMounted(true)
  },[])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Department */}
      <CreateDepartmentModal />
      <EditDepartmentModal />
      <DeleteDepartmentModal />
      
      {/* Positon */}
      <CreatePositionModal />
      <EditPositionModal />
      <DeletePositionModal/>
      
      {/* Employee */}
      <CreateEmployeeModal />
      <EditEmployeeModal/>
      <DeleteEmployeeModal/>
      <EmployeeDetailsModal />
      <EmployeeAllowanceModal/>
      <EmployeeDeductionModal />
      
      {/* Allowance */}
      <CreateAllowanceModal />
      <EditAllowanceModal/>
      <DeleteAllowanceModal />

      {/* Deduction */}
      <CreateDeductionModal/>
      <EditDeductionModal />
      <DeleteDeductionModal/>

      {/* Payroll */}
      <CreatePayrollModal/>
      <EditPayrollModal />
      <DeletePayrollModal />
      <ViewPayrollModal />
 
      {/* Attedance */}
      <CreateAttendanceModal />

      {/* User */}
      <CreateUserModal />
    </>
  )
}

export default ModalProvider
