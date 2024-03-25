import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters is required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    }), 
})

export const DepartmentSchema = z.object({
    name: z.string().min(1,{
        message: "Department Name is required"
    }), 
});

export const PositionSchema = z.object({
    departmentId: z.string().min(1,{
        message: "Selecting a department is required"
    }),
    name: z.string().min(1,{
        message: "Position Name is required"
    }), 
})

export const EmployeeSchema = z.object({
    departmentId: z.string().min(1,{
        message: "Selecting a department is required"
    }),
    firstname: z.string().min(1,{
        message: "First Name is required"
    }), 
    middlename: z.string().min(1,{
        message: "Middle Name is required"
    }), 
    lastname: z.string().min(1,{
        message: "Last Name is required"
    }),
    positionId: z.string().min(1,{
        message: "Selecting a position is required"
    }),
    salary: z.string().min(1,{
        message: "Salary is required"
    })
})

export const AllowanceSchema = z.object({
    allowance: z.string().min(1, {
        message: "Allowance is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    })
})
export const DeductionSchema = z.object({
    deduction: z.string().min(1, {
        message: "Allowance is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    })
})