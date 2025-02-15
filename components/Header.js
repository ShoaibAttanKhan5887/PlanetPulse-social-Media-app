"use client";
import Image from 'next/image'
import React from 'react'
import{
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
}from "@heroicons/react/outline"
import {HomeIcon} from "@heroicons/react/solid"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalAtom';

function Header() {
    const {data : session } = useSession();
    // This below code is used for testing whether the session is working properly or not
   // console.log(session);
    const [ open, setOpen ] = useRecoilState(modalState);
    const router = useRouter();


  return (
    // providing shadow to the header and making the headeer to stick at the top whenever you move to the page
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div onClick={() => router.push('/')}className="relative hidden lg:inline-grid w-24 cursor-pointer">
            <Image src={'/images/PlanetPulseWording.png'} alt="App Image" layout="fill" objectFit="contain"/>
        </div>
        <div onClick={() => router.push('/')} className="relative lg:hidden flex-shrink-0 w-10 cursor-pointer">
        <Image src={'/images/PlanetPulseLogo.png'} alt="App Image" layout="fill" objectFit="contain"/>
        </div>

        {/* Middle */}
        <div className="max-w-xs">
        <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-500"/>
            </div>
            <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder="Search" />
        </div>

        </div>
        

        {/* Right */}
        {/* Here 'items-center' will bring the logo, search and home button in line check by removing it */}
        {/* Here 'navBtn' is a custom utility created by us which is present in global.css check that */}
        <div className="flex items-center justify-end space-x-4">
        <HomeIcon onClick={() => router.push('/')} className="navBtn"/>
        <MenuIcon className="h-6 md:hidden cursor-pointer" />

        {session ? (
         <>   
        <div className="relative navBtn">
        <PaperAirplaneIcon className="navBtn rotate-45"/>
        <div className="absolute -top-2 -right-3 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
        </div>
        <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
        <UserGroupIcon className="navBtn" />
        <HeartIcon className="navBtn" />
        <img onClick={signOut} src={session.user.image}
         alt="profile pic" 
         className=" h-10 w-10 rounded-full cursor-pointer" />
         </>
        ) : (
            <button onClick={signIn}>Sign In</button>
        )}
        </div>
      </div>
     
    </div>
  )
}

export default Header