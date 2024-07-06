import DeductionClient from '@/components/layouts/deduction/client'
import { DeductionColumn } from '@/components/layouts/deduction/column'
import { db } from '@/lib/db'
import { auth } from '@/services/next-auth/auth'
import React from 'react'

const DeductionPage = async () => {
  const session = await auth()
  const userId=  session?.user.id

  const deductions = await db.deduction.findMany({
    where: {
      userId
    },
  })

  const formattedData: DeductionColumn[] = deductions.map((item) => ({
    id: item.id,
    name: item.deduction,
    info: {
      deduction: item.deduction,
      description: item.description
    }
  }))

  return (
    <div className='w-full'>
      <div className='flex-2 space-y-2 pt-6 p-8 w-full'>
        <DeductionClient data={formattedData} />
      </div>
    </div>
  )
}

export default DeductionPage
