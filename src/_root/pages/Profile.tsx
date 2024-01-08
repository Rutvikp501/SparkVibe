
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserContext } from '@/context/AuthContext'
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import { Link, useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams();
  const { data: user , isLoading } = useGetUserById(id || "");
  const user1 = useUserContext()
 
  
  //const user = user1.user
//   for (const document of posts1?.pages[0].documents) {
//     if (document.creator.email==user.email){
//       var  userpost=posts1
//     }
// }
  
  return (
    <div className="explore-container">
    <div className="post_details-container">
    

 
      <div className="post_details-card">
        <img
          src={user?.imageUrl }
          alt="creator"
          className="post_details-img"
        />

        <div className="post_details-info">
          <div className="flex-between w-full">
           
            <div className="flex-center gap-4">
              
            <CardHeader>
  <CardTitle>{user?.name}</CardTitle>
  <CardDescription className=' text-light-3'>@{user?.username}</CardDescription>
</CardHeader>

{user?.$id == user1?.user.id && ( // Use && for conditional rendering
      <Link
        to={`/update-user/${user?.$id}`}
      >
        <img
          src={"/assets/icons/edit.svg"}
          alt="edit"
          width={24}
          height={24}
        />
      </Link>
    )}
            </div>
          </div>

          <hr className="border w-full border-dark-4/80" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.bio}
            </p>
          </div>
       
          {/* <GridPostList key={`page-`} posts={userpost?.pageParams} /> */}
          
        </div>
      </div>
  
    </div>
    
    </div>

  )
}

export default Profile
