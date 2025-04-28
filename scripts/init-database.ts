import { PrismaClient } from "@prisma/client"
import { testCatalog } from "../lib/test-catalog"
import { generateQuestions } from "../lib/question-generator"

const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Starting database initialization...")

    // Create tests from the catalog
    console.log("Creating tests from catalog...")
    for (const category of Object.keys(testCatalog)) {
      for (const subcategory of Object.keys(testCatalog[category].subcategories)) {
        const subcategoryData = testCatalog[category].subcategories[subcategory]

        for (const childCategory of Object.keys(subcategoryData.childCategories)) {
          const childCategoryData = subcategoryData.childCategories[childCategory]

          for (const test of childCategoryData.tests) {
            console.log(`Creating test: ${test.title}`)

            // Generate questions for this test
            const questions = generateQuestions(test.questionCount, childCategory)

            // Create the test
            const createdTest = await prisma.test.create({
              data: {
                title: test.title,
                description: test.description,
                price: test.price,
                duration: test.duration,
                numQuestions: test.questionCount,
                level: test.level,
                category: category,
                subcategory: subcategory,
                childCategory: childCategory,
              },
            })

            // Create questions for this test
            for (const question of questions) {
              await prisma.question.create({
                data: {
                  testId: createdTest.id,
                  question: question.question,
                  options: question.options,
                  correctAnswer: question.correctAnswer,
                  topic: question.topic,
                  type: "multiple-choice",
                  difficulty: test.level,
                },
              })
            }
          }
        }
      }
    }

    console.log("Database initialization completed successfully!")
  } catch (error) {
    console.error("Error initializing database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
