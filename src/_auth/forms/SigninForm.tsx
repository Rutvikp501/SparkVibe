import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninvalidationSchema } from "@/lib/validation"
import { useToast } from "@/components/ui/use-toast"

import { Link,useNavigate } from "react-router-dom"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading:isUserLoading}=useUserContext()
  const navigate = useNavigate()
  const {mutateAsync: signInAccount , isPending:isSigningIn } = useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninvalidationSchema>>({
    resolver: zodResolver(SigninvalidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const  onSubmit = async (values: z.infer<typeof SigninvalidationSchema>) =>{
    try {
   const session = await signInAccount({
    email: values.email,
    password: values.password,
   })
   if(!session){
    toast({ title: "Sign up failed. Please try again."})
    navigate("/sign-in");
    return;
   }
   const isLoggedIn = await checkAuthUser();
   if (isLoggedIn){
    form.reset();

    navigate('/')
   }else{
   return toast({title:'Sign up failed. Please try again.'})
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
            { isSigningIn || isUserLoading ?(
              <div className="flex-center gap-2">
               Loading....
              </div>
            ):"Sign in"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2"> Don't have an account?
          <Link to="/sign-up" className=" text-primary-500 text-center mt-2"> Sign up</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SigninForm

