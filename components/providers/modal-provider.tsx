"use client"

import React, { useEffect, useState } from 'react'
import CreateDepartmentModal from '../modals/department/create-department-modal'
import EditDepartmentModal from '../modals/department/edit-department-modal'
import DeleteDepartmentModal from '../modals/department/delete-department-modal'
import CreatePositionModal from '../modals/position/create-position-modal'
import EditPositionModal from '../modals/position/edit-position-modal'
import DeletePositionModal from '../modals/position/delete-position-modal'
import CreateEmployeeModal from '../modals/employee/create-employee-modal'

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
      <CreateDepartmentModal />
      <EditDepartmentModal />
      <DeleteDepartmentModal />
      <CreatePositionModal />
      <EditPositionModal />
      <DeletePositionModal/>
      <CreateEmployeeModal />
    </>
  )
}

export default ModalProvider
