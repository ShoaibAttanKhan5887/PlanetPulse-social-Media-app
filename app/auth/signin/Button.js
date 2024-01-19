"use client";

import { signIn } from "next-auth/react";

export default function Button({provider}) {
    return (
        <button className="p-3 bg-blue-400 rounded-lg"onClick={() => signIn(provider.id, { callbackUrl: "/"})}>
            Sign in with {provider.name}
          </button>
    )
}