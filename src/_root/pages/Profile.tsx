import { useUserContext } from '@/context/AuthContext'
import React from 'react'

const Profile = () => {
  const user1 = useUserContext()
  const user = user1.user
  return (
    <div className="grid-container">
    <div className="grid-post_user">
            
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    user.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{user.name}</p>
              </div>
            
          </div>
          </div>
  )
}

export default Profile
