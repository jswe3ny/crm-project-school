import Navbar from "~/components/Navbar";

import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LoadingPage } from "~/components/LoadingPage";
import { useRouter } from "next/router";

// import TicketFeed from "~/components/TicketFeed";
import { api } from "~/utils/api";
import { Session } from "node_modules/next-auth/core/types";


export default  function Dashboard ({session} : {session : Session}){
    const { data: sessionData } = useSession();
    const {data, isLoading} = api.ticket.getAll.useQuery();
    const router = useRouter();
    // console.log(session)
    if (isLoading) 
    return <LoadingPage />;
    return(
        <>
            
            <Navbar />
            <h1 className="text-center text-gray-800 text-4xl my-6 font-semibold tracking-wide">{sessionData?.user.email}&apos;s Dashboard</h1>

            {/* Ticket Feed */}
            <div className=" mx-auto max-w-4xl bg-blue-400/50 p-6" >
               {
                data?.map((ticket) => {
                    return (
                        <div className="bg-gray-200 text-gray-800 p-8 my-4 rounded-md hover:cursor-pointer" key={ticket.id} onClick={() => {void router.push(`/${ticket.userId}/tickets/${ticket.id}`)}}>
                            <p>{ticket.email}</p>
                            <p>{ticket.message}</p>

                        </div>
                    )
                })
               }
            </div>
            <footer className="h-40 bg-blue-600 mt-10">

            </footer>
        </>
        
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // console.log("params: ", ctx.params?.ticket);
    // console.log
    
    const session = await getServerAuthSession(ctx);
    if (!session) {
      return{
        redirect : {
          destination:'/',
          permanent: false
        }
      }
    }

    return {
      props: {session}
    };
  };