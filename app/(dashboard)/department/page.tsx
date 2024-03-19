import DepartmentClient from '@/components/department/client'
import { db } from '@/lib/db'

const DepartmentPage = async () => {
  const departments = await db.department.findMany()
  
  return (
    <div className='w-full'>
      <div className='flex-1 space-y-2 pt-6 p-8 w-full'>
        <DepartmentClient data={departments} />
      </div>
    </div>
  )
}

export default DepartmentPage
