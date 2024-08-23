"use client"

import { useSession } from "next-auth/react";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";




const PromptCard = ({ post, handleTagClick }) => {
    //<---HOOKS--->
    const router = useRouter()
    const { data: session } = useSession()
    const pathname = usePathname()
    const [copied, setCopied] = useState("");

    //<---FUNCTIONS--->
    const handleVisitProfile = async (post) => {

        if (session?.user.email === post.creator.email) {
            router.push(`/profile`)
            return
        }


        router.push(`/profile/${post.creator._id}`)

    };



    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                location.reload()
            } catch (error) {
                console.log(error.message)
            }
        }
    };
    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    };
    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000);
    };

    return (
        <div className="prompt_card">

            <div className="flex justify-between items-start gap-5 " >
                <div >
                    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={() => handleVisitProfile(post)}>
                        <Image
                            src={post.creator.image}
                            height={40}
                            width={40}
                            className="rounded-full object-contain"
                        />
                        <div className="flex flex-col">
                            <h3 className="font-satoshi font-semibold text-gray-900">
                                {post.creator.username}
                            </h3>
                            <p className="font-inter text-sm text-gray-500">
                                {post.creator.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
                    onClick={() => handleCopy()}
                >
                    <Image
                        src={copied === post.prompt ?
                            "/assets/icons/tick.svg" :
                            "/assets/icons/copy.svg"}
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className="font-satoshi text-sm my-4 text-gray-700">
                {post.prompt}
            </p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>
            {
                session?.user.id === post.creator._id && pathname === '/profile' && (
                    <div className="mt-5 flex justify-end  gap-4 border-t border-gray-300 pt-3">
                        <p
                            className="text-sm font-inter cursor-pointer green_gradient"
                            onClick={() => handleEdit(post)}
                        >
                            Edit
                        </p>
                        <p
                            className="text-sm font-inter cursor-pointer orange_gradient"
                            onClick={() => handleDelete(post)}
                        >
                            Delete
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default PromptCard