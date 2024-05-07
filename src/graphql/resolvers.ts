import { YogaInitialContext } from "graphql-yoga";
import prisma from "@/lib/prisma";

export const resolvers = {
  Query: {
    users: (_: undefined, __: undefined, context: YogaInitialContext) => {
      return prisma.user.findMany();
    },
    notes: (_: undefined, __: undefined, context: YogaInitialContext) => {
      return prisma.note.findMany();
    },
    form: (
      _parent: undefined,
      { formName }: { formName: string },
      context: YogaInitialContext
    ) => {
      return prisma.form.findFirst({
        where: { name: formName },
        include: { formFields: true },
      });
    },
  },
};
