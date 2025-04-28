import  PrismaClient  from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()

  try {
    console.log("Connecting to database...")

    // Test connection with a simple query
    await prisma.$queryRaw`SELECT 1`
    console.log("Database connection successful!")

    console.log("Database setup complete!")
  } catch (error) {
    console.error("Database setup failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
