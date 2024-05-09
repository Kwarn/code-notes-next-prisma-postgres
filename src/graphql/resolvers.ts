import prisma from "@/lib/prisma";
import { NoteType } from "@/types/types";

export const resolvers = {
  Query: {
    users: (_: undefined, __: undefined) => {
      return prisma.user.findMany();
    },
    notes: (_: undefined, __: undefined) => {
      return prisma.note.findMany({
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    },
    form: (_parent: undefined, { formName }: { formName: string }) => {
      return prisma.form.findFirst({
        where: { name: formName },
        include: { formFields: true },
      });
    },
  },
  Mutation: {
    createNoteForUser: (_: undefined, { category, content }: NoteType) => {
      const userId = "clvz16fi20000plfiil3p72us"; // TODO: move this to context
      const user = prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) throw new Error(`User with ID ${userId} not found`);

      return prisma.note.create({
        data: {
          category,
          content,
          authorId: userId,
        },
      });
    },
    deleteNote: (_: undefined, { id }: NoteType) => {

      console.log(id)
      return prisma.note.delete({
        where: { id },
      });
    },
  },
};
