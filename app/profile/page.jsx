"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const ProfilePage = () => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([]);
  const router = useRouter();



  useEffect(() => {
    if (session?.user?.id) {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/users/${session.user.id}/posts`);
          if (!res.ok) throw new Error("Failed to fetch posts");

          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchPosts();
    }
  }, [session]);

  return (

    <>
      {
        !session ? router.replace("/") :
          <Profile
            name="My"
            desc="Welcome to your personlized profile page"
            data={posts}
          />
      }
    </>
  )
}

export default ProfilePage