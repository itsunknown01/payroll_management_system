import DepartmentClient from '@/components/department/client'

const DepartmentPage = async () => {
  return (
    <div className='w-full'>
      <div className='flex-1 space-y-2 pt-6 p-8 w-full'>
        <DepartmentClient data={[]} />
      </div>
    </div>
  )
}

export default DepartmentPage
