"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json()
            setPosts(data)
        };
        fetchPosts();
    }, [])


    const handleTagClick = (value) => {
        console.log("tag", value)
        setSearchText(value)
    };
    useEffect(() => {
        const search = async () => {
            try {
                const res = await fetch("/api/prompt/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ searchVal: searchText }),
                });

                if (!res.ok) throw new Error("Failed to fetch search results");

                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        if (searchText) {
            search();
        } else {
            const fetchPosts = async () => {
                const res = await fetch("/api/prompt");
                const data = await res.json();
                setPosts(data);
            };
            fetchPosts();
        }
    }, [searchText]);


    return (
        <section className="feed">
            <form className="w-full relative flex-center">
                <input
                    type="text"
                    placeholder="Search for prompts or tags...."
                    value={searchText}
                    onChange={(e) => { setSearchText(e.target.value) }}
                    required
                    className="search_input peer"
                />
            </form>
            <div className="mt-16 prompt_layout">
                {
                    posts.map((post) => (
                        <>
                            <PromptCard
                                key={post._id}
                                post={post}
                                handleTagClick={handleTagClick}
                            />
                        </>
                    ))
                }
            </div>
        </section >
    )
}

export default Feed