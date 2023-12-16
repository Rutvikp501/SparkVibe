import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupvalidationSchema } from "@/lib/validation"
import Loader from "@/components/shared/loader"
import { Link } from "react-router-dom"

const SignupForm = () => {
  const isloading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupvalidationSchema>>({
    resolver: zodResolver(SignupvalidationSchema),
    defaultValues: {
      name: '',
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupvalidationSchema>) {
   //const newUser = await createUserAccount(values)
    console.log(values)
  }


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col" >
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Create new account </h2>
        <p className=" text-light-3 small-medium md:base-regular mt-2">Please enter your details </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-5 w-full mt-4">
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
            {isloading?(
              <div className="flex-center gap-2">
               <Loader/> Loading....
              </div>
            ):"Sign up"}
          </Button>
          <p className=" text-small-regular text-light-2 text-center mt-2"> Already have an account?
          <Link to="/sign-in" className=" text-primary-500 text-center mt-2"> Log in</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm
