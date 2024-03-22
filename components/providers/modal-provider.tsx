"use client"

import React, { useEffect, useState } from 'react'
import CreateDepartmentModal from '../modals/department/create-department-modal'
import EditDepartmentModal from '../modals/department/edit-department-modal'
import DeleteDepartmentModal from '../modals/department/delete-department-modal'

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
    </>
  )
}

export default ModalProvider
