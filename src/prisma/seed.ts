import { generateRandomNotes, generateRandomUsers } from "../../src/helpers/utils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
