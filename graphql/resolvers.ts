import prisma from "@/lib/prisma";

export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    notes: () => {
      return prisma.note.findMany();
    },
  },
};
