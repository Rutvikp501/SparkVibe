import * as z from "zod"

export const SignupvalidationSchema = z.object({
    name : z.string().min(2,{message:'To short'}),
    username: z.string().min(2,{message:'To short'}),
    email:z.string(),
    password:z.string().min(8,{message:'Password Must have 8 letters'}),

  })
export const SigninvalidationSchema = z.object({
    email:z.string(),
    password:z.string().min(8,{message:'Password Must have 8 letters'}),

  })
export const PostvalidationSchema = z.object({
    caption:z.string().min(5).max(22)
  })