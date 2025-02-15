"use client"
import { useState, useEffect } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";
import { useSession } from "next-auth/react";


function Stories() {
    const [storyUsers, setStoryUsers] = useState([]);
    const { data : session } = useSession();

    useEffect(() => {
      const storyUsers = minifaker.array(20, (i) =>({
        username: minifaker.username({locale: "en"}).toLowerCase(),
        img:`https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
        id:i,
      }));

      setStoryUsers(storyUsers);
      console.log(storyUsers);
    }, [])
    
  return (

    <div className="flex space-x-2 p-6 bg-white mt-8 
    border-gray-200 border rounded-sm overflow-x-scroll
    scrollbar-thin scrollbar-thumb-black"> 

    {/* Here we are making our first story with my profile name */}
    {session && (
        <Story img={session.user.image} username={session.user.username} />
    )}

        {storyUsers.map((user) =>(
            <Story key={user.id} username={user.username} img={user.img} />
        ))}
    </div>
  )
}

export default Stories