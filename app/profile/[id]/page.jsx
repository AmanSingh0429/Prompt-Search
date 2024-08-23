"use client"

import Profile from "@components/Profile"
import { useEffect, useState } from "react"


const ProfilePage = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (params.id) {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/users/${params.id}/posts`);
          if (!res.ok) throw new Error("Failed to fetch posts");
          const data = await res.json();
          setName(data.at(0).creator.username)
          setPosts(data);
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchPosts();
    }
  }, [params]);
  return (
    <>
      <Profile
        name={`User ${name}'s`}
        desc={`Welcome to ${name}'s personlized profile page`}
        data={posts}
      />
    </>
  )
}

export default ProfilePage