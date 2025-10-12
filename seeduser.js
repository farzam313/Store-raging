// seedUsers.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = [];

  for (let i = 1; i <= 20; i++) {
    users.push({
      name: `User${i}`,
      email: `user${Date.now()}_${i}@example.com`, // unique email
      password: `password${i}`,
      active: true,
    });
  }

  for (const user of users) {
    try {
      await prisma.user.create({ data: user });
      console.log(`Inserted: ${user.email}`);
    } catch (e) {
      if (e.code === "P2002") {
        console.warn(`Skipped duplicate: ${user.email}`);
      } else {
        console.error(e);
      }
    }
  }

  console.log("All users processed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
