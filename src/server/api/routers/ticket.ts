import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(({ctx}) => {
        return ctx.db.ticket.findMany({
            where: {
                userId : ctx.session.user.id
            },
        });
    }),
    getSingleTicket: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input}) => {
        const ticket = await ctx.db.ticket.findUnique({
            where: {
                id: input.id
            }
        })

        return ticket;
    }),
    
    create: protectedProcedure
    .input(
        z.object({
            fname: z.string(), lname: z.string(), email: z.string(), message: z.string() 
        })
    )
    .mutation(({ctx, input}) => {
        return ctx.db.ticket.create({
            data: {
                fname: input.fname,
                lname: input.lname,
                email: input.email,
                message: input.message,
                userId: ctx.session.user.id
            }
        })
    })

   
  });
  