"use client"

import React, { useEffect, useState } from 'react'
import CreateDepartmentModal from '../modals/create-department-modal'

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
    </>
  )
}

export default ModalProvider
