import { INewUser } from '@/types'
import {
useQuery,
useMutation,
useQueryClient,
useInfiniteQuery,
}from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount , createPost} from '../appwrite/api'

// this file is the gateway between api file and main tsx file we call this functions 

export const useCreateUserAccount=()=>{
    return useMutation({
        mutationFn:(user:INewUser)=>createUserAccount(user),
    });
};
export const useSignInAccount=()=>{
    return useMutation({
        mutationFn:(user:{
            email:string;
            password:string})=>signInAccount(user)
    })
}
export const useSignOutAccount=()=>{
    return useMutation({
        mutationFn:signOutAccount
    })
}
export const useCreatePost=()=>{
    return useMutation({
        mutationFn:createPost
    })
}