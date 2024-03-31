import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   
    const session = await getServerAuthSession(ctx);
    if (!session) {
      return{
        redirect : {
          destination:'/',
          permanent: false
        }
      }
    }
    const temp = ctx.params?.ticket as string;
    return {
      props: { session, temp},
    };
  };

export default function Ticket({temp} : {temp: string}) {
   
    const ticketId= temp;

    const {data, isLoading} = api.ticket.getSingleTicket.useQuery({
        id: ticketId,
    });

    if (isLoading) return <p>loading</p>
    return (
      <>
        <Navbar />

        <div className="flex flex-col relative  max-w-2xl mx-auto p-5 bg-gray-100">
          <p className="text-2xl ml-3">From: {data?.fname} {data?.lname}</p>
          <p className="text-lg mb-8 ml-7 mt-6  leading-8">Message: {data?.message}</p>

          <textarea name="response" id="response" className=" my-8 h-[40vh] p-5 border border-gray-900 rounded-md" ></textarea>

          <div className="flex justify-center">
            <button onClick={()=> {console.log("message sent")}} className="px-7 py-3 text-2xl bg-green-500 rounded-2xl mx-auto">Send</button>
          </div>
          <button className=" absolute top-0 right-0 p-5 text-3xl font-bold text-red-500">&#10006;</button>

        </div>
      </>
      
    )
}

