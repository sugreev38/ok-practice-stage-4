import { generateQuestionsForSubcategory } from "./question-generator"

// Generate test data with questions for each test
function generateTestQuestions(category: string, subcategory: string, id: number) {
  return {
    id,
    title: `${subcategory} Test ${id % 100 === 0 ? 100 : id % 100}`,
    description: `Comprehensive test for ${category} ${subcategory} exam preparation`,
    price: 5,
    level: id % 3 === 0 ? "Advanced" : id % 2 === 0 ? "Intermediate" : "Beginner",
    questions: generateQuestionsForSubcategory(subcategory, id, 50),
    questionCount: 50,
    duration: 60 + (id % 4) * 30, // Between 60-150 minutes
    category: category.toLowerCase(),
    subcategory: subcategory.toLowerCase().replace(/\s+/g, "-"),
  }
}

// Generate 100 tests for each subcategory
// Haryana subcategories (IDs 1-400)
const haryanaPoliceTests = Array.from({ length: 100 }, (_, i) => generateTestQuestions("Haryana", "Police", i + 1))
const haryanaTeachingTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Haryana", "Teaching", i + 101),
)
const haryanaClerkTests = Array.from({ length: 100 }, (_, i) => generateTestQuestions("Haryana", "Clerical", i + 201))
const haryanaTechnicalTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Haryana", "Technical", i + 301),
)

// Rajasthan subcategories (IDs 401-800)
const rajasthanPoliceTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Rajasthan", "Police", i + 401),
)
const rajasthanTeachingTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Rajasthan", "Teaching", i + 501),
)
const rajasthanClerkTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Rajasthan", "Clerical", i + 601),
)
const rajasthanTechnicalTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Rajasthan", "Technical", i + 701),
)

// UP subcategories (IDs 801-1200)
const upPoliceTests = Array.from({ length: 100 }, (_, i) => generateTestQuestions("Uttar Pradesh", "Police", i + 801))
const upTeachingTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Uttar Pradesh", "Teaching", i + 901),
)
const upClerkTests = Array.from({ length: 100 }, (_, i) => generateTestQuestions("Uttar Pradesh", "Clerical", i + 1001))
const upTechnicalTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Uttar Pradesh", "Technical", i + 1101),
)

// Central Government subcategories (IDs 1201-1600)
const sscTests = Array.from({ length: 100 }, (_, i) => generateTestQuestions("Central Government", "SSC", i + 1201))
const bankingTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Central Government", "Banking", i + 1301),
)
const railwayTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Central Government", "Railway", i + 1401),
)
const defenseTests = Array.from({ length: 100 }, (_, i) =>
  generateTestQuestions("Central Government", "Defense", i + 1501),
)

// Combine all tests by category
const haryanaTests = [...haryanaPoliceTests, ...haryanaTeachingTests, ...haryanaClerkTests, ...haryanaTechnicalTests]
const rajasthanTests = [
  ...rajasthanPoliceTests,
  ...rajasthanTeachingTests,
  ...rajasthanClerkTests,
  ...rajasthanTechnicalTests,
]
const upTests = [...upPoliceTests, ...upTeachingTests, ...upClerkTests, ...upTechnicalTests]
const centralTests = [...sscTests, ...bankingTests, ...railwayTests, ...defenseTests]

// Test catalog data for government exams
export const testCatalog = {
  all: [...haryanaTests, ...rajasthanTests, ...upTests, ...centralTests],

  // Main categories
  haryana: haryanaTests,
  rajasthan: rajasthanTests,
  up: upTests,
  central: centralTests,

  // Haryana subcategories
  haryanaPolice: haryanaPoliceTests,
  haryanaTeaching: haryanaTeachingTests,
  haryanaClerical: haryanaClerkTests,
  haryanaTechnical: haryanaTechnicalTests,

  // Rajasthan subcategories
  rajasthanPolice: rajasthanPoliceTests,
  rajasthanTeaching: rajasthanTeachingTests,
  rajasthanClerical: rajasthanClerkTests,
  rajasthanTechnical: rajasthanTechnicalTests,

  // UP subcategories
  upPolice: upPoliceTests,
  upTeaching: upTeachingTests,
  upClerical: upClerkTests,
  upTechnical: upTechnicalTests,

  // Central Government subcategories
  ssc: sscTests,
  banking: bankingTests,
  railway: railwayTests,
  defense: defenseTests,
}