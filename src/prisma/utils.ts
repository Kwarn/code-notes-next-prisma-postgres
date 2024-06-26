export const generateRandomUsers = (numOfUsers: number) => {
  const users: { name: string; email: string }[] = [];
  for (let i = 0; i < numOfUsers; i++) {
    const randomNum = generateRandomNumber(1000000000);
    users.push({
      name: `test user ${randomNum}`,
      email: `test-user-${randomNum}@test.com`,
    });
  }
  return users;
};

export const generateRandomNumber = (max: number = 1000) => {
  const randomDecimal = Math.random();
  const randomNumberInRange = randomDecimal * max;
  const randomNumber = Math.floor(randomNumberInRange);
  return randomNumber + 1;
};

const noteCategories = [
  "front-end",
  "back-end",
  "dev-ops",
  "general",
  "next",
  "prisma",
  "graphql",
  "vercel",
];

export const generateRandomNotes = (n: number) => {
  return Array.from({ length: n }, () => {
    const category =
      noteCategories[generateRandomNumber(noteCategories.length - 1)];
    return {
      category: category,
      content: `A cool note about ${category}`,
    };
  });
};
