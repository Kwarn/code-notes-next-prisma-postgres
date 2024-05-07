import { generateRandomNotes, generateRandomUsers } from "./utils";
import prisma from "@/lib/prisma";

async function main() {
  await createUsersWithNotes();
  await createAddNoteForm();
}

async function createUsersWithNotes() {
  const users = generateRandomUsers(10);
  for (const { name, email } of users) {
    await prisma.user.create({
      data: {
        name,
        email,
        notes: {
          createMany: {
            data: generateRandomNotes(3),
          },
        },
      },
    });
  }
}

async function createAddNoteForm() {
  await prisma.form.create({
    data: {
      name: "createNote",
      formFields: {
        create: [
          {
            label: "Select category",
            name: "category",
            type: "select",
            options: JSON.stringify([
              { label: "NextJs", value: "next" },
              { label: "Graphql", value: "graphql" },
            ]),
          },
          {
            label: "Note",
            name: "content",
            type: "textarea",
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
