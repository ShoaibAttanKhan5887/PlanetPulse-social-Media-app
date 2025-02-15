import React from 'react'

function Story({img,username}) {
  return (
    <div >
        <img src={img} alt={username} className="h-14 b-14 rounded-full p-[1.5px] border-emerald-500 border-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" />
        <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  )
}

export default Story