import { Models } from "appwrite"
import FileUploader from "../shared/FileUploader"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations"
import Loader from "../shared/Loader"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UservalidationSchema } from "@/lib/validation"
import { z } from "zod"
import { toast } from "../ui/use-toast"
type  UserFormsProps ={
    user?:Models.Document;
    action: "Create" | "Update";
  };

const UserForm = ({user,action}:UserFormsProps) => {
   //console.log(user);
    
    const {mutateAsync:updateUser, isPending:isLoadingUpdate}=useUpdateUser();
    const navigate =useNavigate()

    const form = useForm<z.infer<typeof UservalidationSchema>>({
        resolver: zodResolver(UservalidationSchema),
        defaultValues: {
            name: user ? user?.name:"",
            username: user ? user?.username :"",
            file:[],
            email: user ? user?.email:"",   
            bio: user ? user?.bio:"",   
    
        },
      })
      async function onSubmit(value: z.infer<typeof UservalidationSchema>) {
        if (user && action === "Update") {
            
          const updateduser = await updateUser({
            ...value,
            userId:user?.$id,
            bio:value?.bio,
            imageId: user.imageId,
            imageUrl: user.imageUrl,
          });
          if (!updateduser) {
            toast({
              title: `${action} post failed. Please try again.`,
            });
          }
          return navigate(`/profile/${user.$id}`);
        }
      };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" shad-form_label">name</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field}/>
              {/* <Textarea className="shad-textarea custom-scrollbar" {...field}>
              </Textarea> */}
              </FormControl>
              <FormMessage className=" shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" shad-form_label" >username</FormLabel>
              <FormControl>
              <Input type="text" className="shad-input" {...field}/>
              {/* <Textarea className="shad-textarea custom-scrollbar" {...field}>
              </Textarea> */}
              </FormControl>
              <FormMessage className=" shad-form_message" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" shad-form_label">Add Photos</FormLabel>
              <FormControl>
              <FileUploader 
              fieldChange={field.onChange}
              mediaUrl={user?.imageUrl}
              />
              </FormControl>
              <FormMessage className=" shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" shad-form_label">Add email</FormLabel>
              <FormControl>
              {/* <Textarea className="shad-textarea custom-scrollbar" {...field}>
              </Textarea> */}
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className=" shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" shad-form_label">Add Bio.</FormLabel>
              <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="Tell Us More about you"  {...field}>
              </Textarea>
                {/* <Input type="text" 
                className="shad-input" placeholder="Tell Us More about you" {...field}/> */}
              </FormControl>
              <FormMessage className=" shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
       
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={ isLoadingUpdate}>
            {(isLoadingUpdate) && <Loader />}
            {action} Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
