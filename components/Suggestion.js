"use client"
import React, { useEffect, useState } from 'react'
import minifaker from "minifaker";
import "minifaker/locales/en";

function Suggestion() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      const suggestions = minifaker.array(5, (i) =>({
        username: minifaker.username({locale: "en"}).toLowerCase(),
        jobTitle:minifaker.jobTitle(),
        id:i,
      }));

      setSuggestions(suggestions);
    }, []);
  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for You</h3>
            <button className='text-gray-600 font-semibold'>See All</button>
        </div>

        {suggestions.map((suggestion) =>(
            <div className='flex items-center justify-between mt-3'>
                <img className='h-10 rounded-full border p-[2px]'
                src={`https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`}  />

                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'>{suggestion.username}</h2>
                    <h3 className='text-xs text-gray-400 truncate w-[230px]'>{suggestion.jobTitle}</h3>

                </div>
                <button className='text-blue-400 font-semibold'>Follow</button>

            </div>
        ))}

    </div>
  )
}

export default Suggestion