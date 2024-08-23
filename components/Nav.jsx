'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {
    const [providers, setProviders] = useState();
    const [toggleDropdown, setToggleDropdown] = useState(false);


    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        setUpProviders();
    }, [])

    const { data: session } = useSession();



    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src={"/assets/images/logo.svg"}
                    alt="Promptopia"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* desktop nav */}
            <div className="max-sm:hidden">
                {
                    session?.user ?
                        <div className="flex gap-3 ">
                            <Link href="/create-prompt" className="black_btn">
                                Create Post
                            </Link>
                            <button type="button" onClick={signOut} className="outline_btn" >Sign Out</button>
                            <Link href="/profile">
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    alt="Profile"
                                    className="rounded-full"
                                />

                            </Link>
                        </div> :
                        <>
                            {providers &&
                                Object.values(providers).map((providers) => (
                                    <button
                                        type="button"
                                        key={providers.name}
                                        onClick={() => signIn(providers.id)}
                                        className="black_btn"
                                    >
                                        SignIn
                                    </button>
                                ))
                            }
                        </>
                }

            </div>
            {/* mobile nav */}
            <div className="sm:hidden flex relative">
                {
                    session?.user ?
                        <div className="flex">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                alt="Profile"
                                className="rounded-full"
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                            {
                                toggleDropdown && (
                                    <div className="dropdown items-center">
                                        <Link href="/profile"
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(false)}>
                                            My Profile
                                        </Link>
                                        <Link href="/create-prompt"
                                            className="dropdown_link"
                                            onClick={() => setToggleDropdown(false)}>
                                            Create Post
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setToggleDropdown(false);
                                                signOut();
                                            }}
                                            className="mt-5 w-full black_btn"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }

                        </div> :
                        <>
                            {providers &&
                                Object.values(providers).map((providers) => (
                                    <button
                                        type="button"
                                        key={providers.name}
                                        onClick={() => signIn(providers.id)}
                                        className="black_btn"
                                    >
                                        SignIn
                                    </button>
                                ))
                            }
                        </>
                }
            </div>
        </nav>
    )
}

export default Nav