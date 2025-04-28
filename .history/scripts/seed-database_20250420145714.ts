import { PrismaClient } from "@prisma/client"
import { testCatalog } from "../lib/test-catalog"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seeding...")

  // Clear existing data
  await prisma.testResult.deleteMany({})
  await prisma.purchasedTest.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("Database cleared. Seeding new data...")

  // Seed tests from test catalog
  for (const test of testCatalog.all) {
    console.log(`Creating test: ${test.title}`)

    // Create the test
    const createdTest = await prisma.test.create({
      data: {
        id: test.id,
        title: test.title,
        description: test.description,
        price: test.price,
        duration: test.duration,
       
        level: test.level,
        category: test.category,
        subcategory: test.subcategory,
        childCategory: test.childCategory,
      },
    })

    // Create test questions
    for (const question of test.questions) {
      await prisma.question.create({
        data: {
          testId: createdTest.id,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          topic: question.topic,
          type: question.type,
          difficulty: question.difficulty,
        },
      })
    }
  }

  console.log("Tests and questions created successfully")

  // Create demo user
  console.log("Creating demo user")
  await prisma.user.create({
    data: {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      phone: "+919876543210",
      password: "$2a$10$PsYCFyB9qb/QlAGnKkpyleQ1PZF3xmgqSzXnqYkffyuDGC8VyeOie", // 'password123'
      isVerified: true,
    },
  })

  console.log("Database seeding completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
