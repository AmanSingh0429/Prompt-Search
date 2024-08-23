"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"
import { useSession } from "next-auth/react"

const EditPrompt = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    };
    if (promptId) {
      getPromptDetails()
    }
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true)

    if (!promptId) {
      alert("No Prompt ID Found")
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.replace("/profile")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmiting(false)
    }
  };
  return (

    <>
      {
        !session ? router.replace("/") :
          <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submiting}
            handleSubmit={updatePrompt}
          />
      }
    </>
  )
}

export default EditPrompt