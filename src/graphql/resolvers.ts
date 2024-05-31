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
    note: (_: undefined, { id }: { id: string }) => {
      return prisma.note.findFirst({
        where: { id },
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

      if (!user) throw new Error(`User with ID ${userId} not found`); // TODO: handle this better

      return prisma.note.create({
        data: {
          category,
          content,
          authorId: userId,
        },
      });
    },
    updateNote: (_: undefined, { id, category, content }: NoteType) => {
      return prisma.note.update({
        where: { id },
        data: {
          category,
          content,
        },
      });
    },
    deleteNote: (_: undefined, { id }: NoteType) => {
      return prisma.note.delete({
        where: { id },
      });
    },
  },
};
