import React from 'react'
import { DeductionColumn } from './column'

interface DeductionInfoProps {
    data: DeductionColumn
}

const DeductionInfo = ({data}: DeductionInfoProps) => {
  return (
    <div className='flex flex-col'>
      <h1>Name :
        <span className='pl-1'>
        {data.info.deduction}
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

export default DeductionInfo
