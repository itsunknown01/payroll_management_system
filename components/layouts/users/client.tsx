"use client"

import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/hooks/use-modal-store'
import { Plus } from 'lucide-react'
import React from 'react'
import { columns } from './columns'

interface UsersClientProps {
    data: any
}

const UsersClient = ({data}: UsersClientProps) => {
    const {onOpen} = useModal()
  return (
    <div className="w-full">
        <div className="flex items-center justify-between pb-6">
        <Heading
          title={`Allowance(${data.length})`}
          description="Manage allowance here"
          className="gap-y-2"
        />
        <Button onClick={() => onOpen("createUser")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div> 

      <Separator />
      <DataTable data={data} columns={columns} searchkey="name" /> 
    </div>
  )
}

export default UsersClient
