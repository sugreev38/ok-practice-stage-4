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
    category: category.toLowerCase().replace(/\s+/g, "-"),
    subcategory: subcategory.toLowerCase().replace(/\s+/g, "-"),
    childCategory: childCategory.toLowerCase().replace(/\s+/g, "-"),
  }
}

// Define child categories for each subcategory
const childCategories = {
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

// Generate tests for UP and Central Government
function generateUpAndCentralTests() {
  const allTests = []
  let testIdCounter = 1

  // Define UP and Central Government categories and their subcategories
  const categories = [
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
    up: categoryTests["uttar-pradesh"] || [],
    central: categoryTests["central-government"] || [],
    // Subcategories
    upPolice: subcategoryTests["up-police"] || [],
    upTeaching: subcategoryTests["up-teaching"] || [],
    upClerical: subcategoryTests["up-clerical"] || [],
    upTechnical: subcategoryTests["up-technical"] || [],
    ssc: subcategoryTests["ssc"] || [],
    banking: subcategoryTests["banking"] || [],
    railway: subcategoryTests["railway"] || [],
    defense: subcategoryTests["defense"] || [],
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

// Custom test with questions
const customTest = {
  id: 10001,