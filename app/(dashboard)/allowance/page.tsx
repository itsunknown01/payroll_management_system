import AllowanceClient from '@/components/layouts/allowance/client'
import { AllowanceColumn } from '@/components/layouts/allowance/column'
import { db } from '@/lib/db'
import { auth } from '@/services/next-auth/auth'
import React from 'react'

const AllowancePage = async () => {
  const session = await auth()
  const userId=  session?.user.id
  
  const allowances = await db.allowance.findMany({
    where: {
      userId
    }
  })

  const formattedData: AllowanceColumn[] = allowances.map((item)=> ({
    id: item.id,
    name: item.allowance,
    info: {
      allowance: item.allowance,
      description: item.description
    }
  }))
  return (
    <div className='w-full'>
        <div className='flex-2 space-y-2 pt-6 p-8 w-full'>
          <AllowanceClient data={formattedData} />
        </div>
    </div>
  )
}

export default AllowancePage
