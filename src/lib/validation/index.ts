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
  export const UservalidationSchema = z.object({
    name:z.string(),
    username:z.string(),
    email:z.string(),
    file: z.custom<File[]>(),
    bio:z.string(),

  })
export const PostvalidationSchema = z.object({
    caption:z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location:z.string().min(2).max(100),
    tags:z.string(),
  })