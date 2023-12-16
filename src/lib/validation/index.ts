import * as z from "zod"

export const SignupvalidationSchema = z.object({
    name : z.string().min(2,{message:'To short'}),
    username: z.string().min(2,{message:'To short'}),
    email:z.string(),
    password:z.string().min(8,{message:'Password Must have 8 letters'}),

  })