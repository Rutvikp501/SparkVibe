import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupvalidationSchema } from "@/lib/validation"
import { useToast } from "@/components/ui/use-toast"

import { Link,useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading:isUserLoading}=useUserContext()
  const navigate = useNavigate()
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupvalidationSchema>>({
    resolver: zodResolver(SignupvalidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })


  const {mutateAsync: createUserAccount ,isPending:isCreatingUser}=useCreateUserAccount();
  const {mutateAsync: signInAccount , isPending:isSigningIn } = useSignInAccount();

  // 2. Define a submit handler.
  const  onSubmit = async (values: z.infer<typeof SignupvalidationSchema>) =>{
    try {
   const newUser = await createUserAccount(values);
   if(!newUser){
    return toast({ title: "Sign up failed. Please try again.!"})
   }
   const session = await signInAccount({
    email: values.email,
    password: values.password,
   })
   if(!session){
    toast({ title: "A user with the same email already exists"})
    // navigate("/sign-up");
    return;
   }
   const isLoggedIn = await checkAuthUser();
   if (isLoggedIn){
    form.reset();

    navigate('/')
   }else{
   return toast({title:'Sign up failed. Please try again.!!!'})
   }
  } catch (error) {
    console.log({ error });
  }
  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col" >
        <img src="/assets/images/logo-no-background.svg" alt="logo"  width={200} height={500}/>

        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account</h2>
        <p className=" text-light-3 small-medium md:base-regular mt-2">Wellcome back ! Please enter your details </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col  w-full mt-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UserName</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="Password" className="shad-input" {...field} />
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="shad-button_primary">
        {isCreatingUser || isSigningIn || isUserLoading ?(
          <div className="flex-center gap-2">
           Loading....
          </div>
        ):"Sign up"}
      </Button>
      <p className="text-small-regular text-light-2 text-center mt-2"> Already have an account?
      <Link to="/sign-in" className=" text-primary-500 text-center mt-2"> Log in</Link>
      </p>
    </form>
      </div>
    </Form>

  )
}

export default SignupForm
