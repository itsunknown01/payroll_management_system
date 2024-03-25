import React from 'react'
import { AllowanceColumn } from './column'

interface AllowanceInfoProps {
    data: AllowanceColumn
}

const AllowanceInfo = ({data}: AllowanceInfoProps) => {
  return (
    <div className='flex flex-col'>
      <h1>Name :
        <span className='pl-1'>
        {data.info.allowance}
        </span>
        </h1>
      <p>description :
        <span className='pl-1'>
        {data.info.description}
        </span>
        </p>
    </div>
  )
}

export default AllowanceInfo
