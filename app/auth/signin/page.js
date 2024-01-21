import Button from "@/app/auth/signin/Button";
import Header from "@/components/Header";
import { getProviders, signIn } from "next-auth/react";
import React from 'react'

//this happens at the browser
export async function page() {
    const providers = await getProviders();
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img className='w-80' src={'/images/PlanetPulseWording.png'}
        alt="App Logo" />
    <div className="mt-40">
      {Object.values(providers ||{providers}).map((provider) => (
        <div key={provider.name}>
            {/* Here we are giving that on getting sign in with google we need to redirect to the home page with callbackUrl */}
          <Button provider={provider} />
        </div>
      ))}

    </div>

    </div>
    
    </>
  )
}

export default page








