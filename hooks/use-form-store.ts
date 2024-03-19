import { DepartmentSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export const useFormStore = () => {
    const form = useForm({
        resolver: zodResolver(DepartmentSchema),
        defaultValues: {
            name: ""
        }
    })

    return form
}