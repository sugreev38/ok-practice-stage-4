import { generateQuestionsForSubcategory } from "./question-generator"

// Question generator for different exam subcategories
function generateTestQuestions(category: string, subcategory: string, childCategory: string, id: number) {
  // Generate 100 questions for each test
  const questions = generateQuestionsForSubcategory(subcategory, id, 100)

  return {
    id,
    title: `${childCategory} Test ${id % 100 === 0 ? 100 : id % 100}`,
    description: `Comprehensive test for ${category} ${subcategory} - ${childCategory} exam preparation`,
    price: 5,
    level: id % 3 === 0 ? "Advanced" : id % 2 === 0 ? "Intermediate" : "Beginner",
    questions: questions,
    questionCount: questions.length,
    duration: 60 + (id % 4) * 30, // Between 60-150 minutes
    category: category.toLowerCase(),
    subcategory: subcategory.toLowerCase().replace(/\s+/g, "-"),
    childCategory: childCategory.toLowerCase().replace(/\s+/g, "-"),
  }
}

// Define child categories for each subcategory
const childCategories = {
  // Haryana Police child categories
  "haryana-police": ["Police-Constable", "Police-SI", "Police-Head Constable", "Police Commando", "Police Driver"],

  // Haryana Teaching child categories
  "haryana-teaching": ["JBT Teacher", "HTET", "PGT", "TGT", "CTET"],

  // Haryana Clerical child categories
  "haryana-clerical": ["Clerk", "Gram Sachiv", "Patwari", "Kanungo", "Accountant"],

  // Haryana Technical child categories
  "haryana-technical": ["JE Civil", "JE Electrical", "JE Mechanical", "Computer Operator", "Draftsman"],

  // Rajasthan Police child categories
  "rajasthan-police": [
    "Police Constable",
    "Police SI",
    "Police Head Constable",
    "Police Driver",
    "Police Wireless Operator",
  ],

  // Rajasthan Teaching child categories
  "rajasthan-teaching": ["REET Level 1", "REET Level 2", "Senior Teacher", "Grade II Teacher", "Grade III Teacher"],

  // Rajasthan Clerical child categories
  "rajasthan-clerical": ["LDC", "UDC", "Gram Sevak", "Patwari", "Stenographer"],

  // Rajasthan Technical child categories
  "rajasthan-technical": ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Helper", "Lab Assistant"],

  // UP Police child categories
  "up-police": ["Police Constable", "Police SI", "Head Constable", "Fireman", "Jail Warder"],

  // UP Teaching child categories
  "up-teaching": ["UPTET", "Assistant Teacher", "TGT", "PGT", "Shiksha Mitra"],

  // UP Clerical child categories
  "up-clerical": ["Lekhpal", "VDO", "Revenue Inspector", "Clerk", "Stenographer"],

  // UP Technical child categories
  "up-technical": ["JE Civil", "JE Electrical", "JE Mechanical", "Technical Assistant", "Lab Technician"],

  // SSC child categories
  ssc: ["CGL", "CHSL", "MTS", "CPO", "GD Constable"],

  // Banking child categories
  banking: ["PO", "Clerk", "SO", "RRB", "NABARD"],

  // Railway child categories
  railway: ["Group D", "NTPC", "ALP", "JE", "Station Master"],

  // Defense child categories
  defense: ["NDA", "CDS", "AFCAT", "Airmen", "Navy Sailor"],
}

// Generate exactly 100 tests for each child category
function generateChildCategoryTests() {
  const allTests: {
    id: number; title: string; description: string; price: number; level: string; questions: any[]; questionCount: number; duration: number // Between 60-150 minutes
    category: string; subcategory: string; childCategory: string
  }[] = []
  let testIdCounter = 1

  // Define all main categories and their subcategories
  const categories = [
    {
      name: "Haryana",
      subcategories: [
        { name: "Police", key: "haryana-police" },
        { name: "Teaching", key: "haryana-teaching" },
        { name: "Clerical", key: "haryana-clerical" },
        { name: "Technical", key: "haryana-technical" },
      ],
    },
    {
      name: "Rajasthan",
      subcategories: [
        { name: "Police", key: "rajasthan-police" },
        { name: "Teaching", key: "rajasthan-teaching" },
        { name: "Clerical", key: "rajasthan-clerical" },
        { name: "Technical", key: "rajasthan-technical" },
      ],
    },
    {
      name: "Uttar Pradesh",
      subcategories: [
        { name: "Police", key: "up-police" },
        { name: "Teaching", key: "up-teaching" },
        { name: "Clerical", key: "up-clerical" },
        { name: "Technical", key: "up-technical" },
      ],
    },
    {
      name: "Central Government",
      subcategories: [
        { name: "SSC", key: "ssc" },
        { name: "Banking", key: "banking" },
        { name: "Railway", key: "railway" },
        { name: "Defense", key: "defense" },
      ],
    },
  ]

  // Generate tests for all categories, subcategories, and child categories
  const categoryTests = {}
  const subcategoryTests = {}
  const childCategoryTests = {}

  // Generate tests for each category
  categories.forEach((category) => {
    const categoryKey = category.name.toLowerCase().replace(/\s+/g, "-")
    categoryTests[categoryKey] = []

    // Generate tests for each subcategory
    category.subcategories.forEach((subcategory) => {
      const subcategoryKey = subcategory.key
      subcategoryTests[subcategoryKey] = []

      // Generate tests for each child category
      childCategories[subcategoryKey].forEach((childCategory) => {
        const childCategoryKey = childCategory.toLowerCase().replace(/\s+/g, "-")
        const childCategoryFullKey = `${subcategoryKey}-${childCategoryKey}`
        childCategoryTests[childCategoryFullKey] = []

        // Generate exactly 100 tests for this child category
        for (let i = 0; i < 100; i++) {
          const test = generateTestQuestions(category.name, subcategory.name, childCategory, testIdCounter)

          // Add test to all relevant collections
          allTests.push(test)
          categoryTests[categoryKey].push(test)
          subcategoryTests[subcategoryKey].push(test)
          childCategoryTests[childCategoryFullKey].push(test)

          testIdCounter++
        }
      })
    })
  })

  // Return all test collections
  return {
    all: allTests,

    // Main categories
    haryana: categoryTests["haryana"] || [],
    rajasthan: categoryTests["rajasthan"] || [],
    up: categoryTests["uttar-pradesh"] || [],
    central: categoryTests["central-government"] || [],

    // Subcategories
    haryanaPolice: subcategoryTests["haryana-police"] || [],
    haryanaTeaching: subcategoryTests["haryana-teaching"] || [],
    haryanaClerical: subcategoryTests["haryana-clerical"] || [],
    haryanaTechnical: subcategoryTests["haryana-technical"] || [],

    rajasthanPolice: subcategoryTests["rajasthan-police"] || [],
    rajasthanTeaching: subcategoryTests["rajasthan-teaching"] || [],
    rajasthanClerical: subcategoryTests["rajasthan-clerical"] || [],
    rajasthanTechnical: subcategoryTests["rajasthan-technical"] || [],

    upPolice: subcategoryTests["up-police"] || [],
    upTeaching: subcategoryTests["up-teaching"] || [],
    upClerical: subcategoryTests["up-clerical"] || [],
    upTechnical: subcategoryTests["up-technical"] || [],

    ssc: subcategoryTests["ssc"] || [],
    banking: subcategoryTests["banking"] || [],
    railway: subcategoryTests["railway"] || [],
    defense: subcategoryTests["defense"] || [],

    // Child categories - Haryana Police
    haryanaPoliceConstable: childCategoryTests["haryana-police-police-constable"] || [],
    haryanaPoliceSubInspector: childCategoryTests["haryana-police-police-si"] || [],
    haryanaPoliceHeadConstable: childCategoryTests["haryana-police-police-head-constable"] || [],
    haryanaPoliceCommando: childCategoryTests["haryana-police-police-commando"] || [],
    haryanaPoliceDriver: childCategoryTests["haryana-police-police-driver"] || [],

    // Child categories - Haryana Teaching
    haryanaJbtTeacher: childCategoryTests["haryana-teaching-jbt-teacher"] || [],
    haryanaHtet: childCategoryTests["haryana-teaching-htet"] || [],
    haryanaPgt: childCategoryTests["haryana-teaching-pgt"] || [],
    haryanaTgt: childCategoryTests["haryana-teaching-tgt"] || [],
    haryanaCtet: childCategoryTests["haryana-teaching-ctet"] || [],

    // Child categories - Haryana Clerical
    haryanaClerk: childCategoryTests["haryana-clerical-clerk"] || [],
    haryanaGramSachiv: childCategoryTests["haryana-clerical-gram-sachiv"] || [],
    haryanaPatwari: childCategoryTests["haryana-clerical-patwari"] || [],
    haryanaKanungo: childCategoryTests["haryana-clerical-kanungo"] || [],
    haryanaAccountant: childCategoryTests["haryana-clerical-accountant"] || [],

    // Child categories - Haryana Technical
    haryanaJeCivil: childCategoryTests["haryana-technical-je-civil"] || [],
    haryanaJeElectrical: childCategoryTests["haryana-technical-je-electrical"] || [],
    haryanaJeMechanical: childCategoryTests["haryana-technical-je-mechanical"] || [],
    haryanaComputerOperator: childCategoryTests["haryana-technical-computer-operator"] || [],
    haryanaDraftsman: childCategoryTests["haryana-technical-draftsman"] || [],

    // Child categories - Rajasthan Police
    rajasthanPoliceConstable: childCategoryTests["rajasthan-police-police-constable"] || [],
    rajasthanPoliceSubInspector: childCategoryTests["rajasthan-police-police-si"] || [],
    rajasthanPoliceHeadConstable: childCategoryTests["rajasthan-police-police-head-constable"] || [],
    rajasthanPoliceDriver: childCategoryTests["rajasthan-police-police-driver"] || [],
    rajasthanPoliceWirelessOperator: childCategoryTests["rajasthan-police-police-wireless-operator"] || [],

    // Child categories - Rajasthan Teaching
    rajasthanReetLevel1: childCategoryTests["rajasthan-teaching-reet-level-1"] || [],
    rajasthanReetLevel2: childCategoryTests["rajasthan-teaching-reet-level-2"] || [],
    rajasthanSeniorTeacher: childCategoryTests["rajasthan-teaching-senior-teacher"] || [],
    rajasthanGradeIiTeacher: childCategoryTests["rajasthan-teaching-grade-ii-teacher"] || [],
    rajasthanGradeIiiTeacher: childCategoryTests["rajasthan-teaching-grade-iii-teacher"] || [],

    // Child categories - Rajasthan Clerical
    rajasthanLdc: childCategoryTests["rajasthan-clerical-ldc"] || [],
    rajasthanUdc: childCategoryTests["rajasthan-clerical-udc"] || [],
    rajasthanGramSevak: childCategoryTests["rajasthan-clerical-gram-sevak"] || [],
    rajasthanPatwari: childCategoryTests["rajasthan-clerical-patwari"] || [],
    rajasthanStenographer: childCategoryTests["rajasthan-clerical-stenographer"] || [],

    // Child categories - Rajasthan Technical
    rajasthanJeCivil: childCategoryTests["rajasthan-technical-je-civil"] || [],
    rajasthanJeElectrical: childCategoryTests["rajasthan-technical-je-electrical"] || [],
    rajasthanJeMechanical: childCategoryTests["rajasthan-technical-je-mechanical"] || [],
    rajasthanTechnicalHelper: childCategoryTests["rajasthan-technical-technical-helper"] || [],
    rajasthanLabAssistant: childCategoryTests["rajasthan-technical-lab-assistant"] || [],

    // Child categories - UP Police
    upPoliceConstable: childCategoryTests["up-police-police-constable"] || [],
    upPoliceSubInspector: childCategoryTests["up-police-police-si"] || [],
    upHeadConstable: childCategoryTests["up-police-head-constable"] || [],
    upFireman: childCategoryTests["up-police-fireman"] || [],
    upJailWarder: childCategoryTests["up-police-jail-warder"] || [],

    // Child categories - UP Teaching
    upUptet: childCategoryTests["up-teaching-uptet"] || [],
    upAssistantTeacher: childCategoryTests["up-teaching-assistant-teacher"] || [],
    upTgt: childCategoryTests["up-teaching-tgt"] || [],
    upPgt: childCategoryTests["up-teaching-pgt"] || [],
    upShikshaMitra: childCategoryTests["up-teaching-shiksha-mitra"] || [],

    // Child categories - UP Clerical
    upLekhpal: childCategoryTests["up-clerical-lekhpal"] || [],
    upVdo: childCategoryTests["up-clerical-vdo"] || [],
    upRevenueInspector: childCategoryTests["up-clerical-revenue-inspector"] || [],
    upClerk: childCategoryTests["up-clerical-clerk"] || [],
    upStenographer: childCategoryTests["up-clerical-stenographer"] || [],

    // Child categories - UP Technical
    upJeCivil: childCategoryTests["up-technical-je-civil"] || [],
    upJeElectrical: childCategoryTests["up-technical-je-electrical"] || [],
    upJeMechanical: childCategoryTests["up-technical-je-mechanical"] || [],
    upTechnicalAssistant: childCategoryTests["up-technical-technical-assistant"] || [],
    upLabTechnician: childCategoryTests["up-technical-lab-technician"] || [],

    // Child categories - SSC
    sscCgl: childCategoryTests["ssc-cgl"] || [],
    sscChsl: childCategoryTests["ssc-chsl"] || [],
    sscMts: childCategoryTests["ssc-mts"] || [],
    sscCpo: childCategoryTests["ssc-cpo"] || [],
    sscGdConstable: childCategoryTests["ssc-gd-constable"] || [],

    // Child categories - Banking
    bankingPo: childCategoryTests["banking-po"] || [],
    bankingClerk: childCategoryTests["banking-clerk"] || [],
    bankingSo: childCategoryTests["banking-so"] || [],
    bankingRrb: childCategoryTests["banking-rrb"] || [],
    bankingNabard: childCategoryTests["banking-nabard"] || [],

    // Child categories - Railway
    railwayGroupD: childCategoryTests["railway-group-d"] || [],
    railwayNtpc: childCategoryTests["railway-ntpc"] || [],
    railwayAlp: childCategoryTests["railway-alp"] || [],
    railwayJe: childCategoryTests["railway-je"] || [],
    railwayStationMaster: childCategoryTests["railway-station-master"] || [],

    // Child categories - Defense
    defenseNda: childCategoryTests["defense-nda"] || [],
    defenseCds: childCategoryTests["defense-cds"] || [],
    defenseAfcat: childCategoryTests["defense-afcat"] || [],
    defenseAirmen: childCategoryTests["defense-airmen"] || [],
    defenseNavySailor: childCategoryTests["defense-navy-sailor"] || [],
  }
}

// Generate all tests
const generatedTests = generateChildCategoryTests()

// Custom test with questions
const customTest = {
  id: 10001,
  title: "Custom Test",
  description: "A test with custom questions",
  price: 5,
  level: "Intermediate",
  questions: [
    {
      id: "q-10001-1",
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
      type: "general-knowledge",
      topic: "geography",
      difficulty: "Easy",
    },
    {
      id: "q-10001-2",
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      type: "general-knowledge",
      topic: "science",
      difficulty: "Easy",
    },
    {
      id: "q-10001-3",
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare",
      type: "general-knowledge",
      topic: "literature",
      difficulty: "Easy",
    },
    {
      id: "q-10001-4",
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
      type: "general-knowledge",
      topic: "chemistry",
      difficulty: "Easy",
    },
    {
      id: "q-10001-5",
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["Japan", "China", "South Korea", "Thailand"],
      correctAnswer: "Japan",
      type: "general-knowledge",
      topic: "geography",
      difficulty: "Easy",
    },
  ],
  questionCount: 5,
  duration: 60,
  category: "custom",
  subcategory: "general",
  childCategory: "general-knowledge",
}

// Test catalog data for government exams
export const testCatalog = {
  ...generatedTests,
  all: [...generatedTests.all, customTest],
}
