"use client";
import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestion from './Suggestion'
import { useSession } from 'next-auth/react'

function Feed() {
    const { data : session } = useSession(); 
  return (
    // in the nmain tailwind class when it is max it has 3 columns , and when medium we have 2 columns and when it is small then we have 1 column that is mobile view
    <main className={`grid grid-cols-1 md:grid-cols-2 
    md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        <section className="col-span-2">
        {/* Section */}
        {/* Stories*/}
        <Stories />

        {/* Posts */}
        <Posts />
        </section>

        {session && (
        <section className='hidden xl:inline-grid md:col-span-1'>
        <div className='fixed top-20'> 
        {/* Mini Profile */}
        <MiniProfile />

        {/* Suggestion */}
        <Suggestion />
        </div>
        </section>
        )}
    </main>
  )
}

export default Feed