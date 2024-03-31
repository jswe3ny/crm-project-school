import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



export default function Navbar() {

    const { data: sessionData } = useSession();    
    return (
        <nav className="bg-blue-500 text-gray-50 border-b-2 flex justify-around align-bottom text-2xl tracking-wider">
        <div className="flex gap-2">
            <div className="flex align-middle justify-center">
                <Link className="mx-5 my-auto py-6 "href={`/${sessionData?.user.id}/dashboard`}>Dashboard</Link>
            </div>
            <div className="flex align-middle justify-center">
                <Link className="mx-5 my-auto py-6"href={"/"}>Stats</Link>
            </div>
        </div>
        <button onClick={() => void signOut({callbackUrl: '/'})}>Sign out</button>
    </nav>
    )
   
}