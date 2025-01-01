import React from 'react'
import { Avatar,AvatarImage,AvatarFallback} from '@radix-ui/react-avatar'
const Profile = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 my-20'>
     <h1 className='font-bold text-2xl text-center md:text-left'> This is my profile </h1>
     <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
        <div className='flex flex-col items-center'>
        <Avatar className="h-24 w-24 md:h-32 md:w-32  mb-4 rounded-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
        </div>
     </div>
    </div>
  )
}

export default Profile
