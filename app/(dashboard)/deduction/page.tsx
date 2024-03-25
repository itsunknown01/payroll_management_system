import DeductionClient from '@/components/layouts/deduction/client'
import React from 'react'

const DeductionPage = async () => {
  
  return (
    <div className='w-full'>
      <div className='flex-2 space-y-2 pt-6 p-8 w-full'>
        <DeductionClient data={[]} />
      </div>
    </div>
  )
}

export default DeductionPage
