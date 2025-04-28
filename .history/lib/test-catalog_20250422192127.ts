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
function generateUpCentralTests() {
  const allTests = []
  let testIdCounter = 1

  // Define main categories and their subcategories
  const categories = [
    {
      name: "UP",
      subcategories: [
        { name: "Police", key: "up-police" },
        { name: "Teaching", key: "up-teaching" },
        { name: "Clerical", key: "up-clerical" },
        { name: "Technical", key: "up-technical" },
      ],
    },
    {
      name: "Central",
      subcategories: [
        { name: "SSC", key: "ssc" },
        { name: "Banking", key: "banking" },
        { name: "Railway", key: "railway" },
        { name: "Defense", key: "defense" },
      ],
    },
  ]

  // Generate tests for each category
  const categoryTests = {}
  const subcategoryTests = {}
  const childCategoryTests = {}

  categories.forEach((category) => {
    const categoryKey = category.name.toLowerCase()
    categoryTests[categoryKey] = []

    category.subcategories.forEach((subcategory) => {
      const subcategoryKey = subcategory.key
      subcategoryTests[subcategoryKey] = []

      childCategories[subcategoryKey].forEach((childCategory) => {
        const childCategoryKey = childCategory.toLowerCase().replace(/\s+/g, "-")
        const childCategoryFullKey = `${subcategoryKey}-${childCategoryKey}`
        childCategoryTests[childCategoryFullKey] = []

        // Generate 100 tests per child category
        for (let i = 0; i < 100; i++) {
          const test = generateTestQuestions(category.name, subcategory.name, childCategory, testIdCounter)
          
          allTests.push(test)
          categoryTests[categoryKey].push(test)
          subcategoryTests[subcategoryKey].push(test)
          childCategoryTests[childCategoryFullKey].push(test)

          testIdCounter++
        }
      })
    })
  })

  return {
    all: allTests,

    // Main categories
    up: categoryTests["up"] || [],
    central: categoryTests["central"] || [],

    // UP Subcategories
    upPolice: subcategoryTests["up-police"] || [],
    upTeaching: subcategoryTests["up-teaching"] || [],
    upClerical: subcategoryTests["up-clerical"] || [],
    upTechnical: subcategoryTests["up-technical"] || [],

    // Central Subcategories
    ssc: subcategoryTests["ssc"] || [],
    banking: subcategoryTests["banking"] || [],
    railway: subcategoryTests["railway"] || [],
    defense: subcategoryTests["defense"] || [],

    // UP Police Child Categories
    upPoliceConstable: childCategoryTests["up-police-police-constable"] || [],
    upPoliceSI: childCategoryTests["up-police-police-si"] || [],
    upHeadConstable: childCategoryTests["up-police-head-constable"] || [],
    upFireman: childCategoryTests["up-police-fireman"] || [],
    upJailWarder: childCategoryTests["up-police-jail-warder"] || [],

    // UP Teaching Child Categories
    upUPTET: childCategoryTests["up-teaching-uptet"] || [],
    upAssistantTeacher: childCategoryTests["up-teaching-assistant-teacher"] || [],
    upTGT: childCategoryTests["up-teaching-tgt"] || [],
    upPGT: childCategoryTests["up-teaching-pgt"] || [],
    upShikshaMitra: childCategoryTests["up-teaching-shiksha-mitra"] || [],

    // UP Clerical Child Categories
    upLekhpal: childCategoryTests["up-clerical-lekhpal"] || [],
    upVDO: childCategoryTests["up-clerical-vdo"] || [],
    upRevenueInspector: childCategoryTests["up-clerical-revenue-inspector"] || [],
    upClerk: childCategoryTests["up-clerical-clerk"] || [],
    upStenographer: childCategoryTests["up-clerical-stenographer"] || [],

    // UP Technical Child Categories
    upJECivil: childCategoryTests["up-technical-je-civil"] || [],
    upJEElectrical: childCategoryTests["up-technical-je-electrical"] || [],
    upJEMechanical: childCategoryTests["up-technical-je-mechanical"] || [],
    upTechnicalAssistant: childCategoryTests["up-technical-technical-assistant"] || [],
    upLabTechnician: childCategoryTests["up-technical-lab-technician"] || [],

    // SSC Child Categories
    sscCGL: childCategoryTests["ssc-cgl"] || [],
    sscCHSL: childCategoryTests["ssc-chsl"] || [],
    sscMTS: childCategoryTests["ssc-mts"] || [],
    sscCPO: childCategoryTests["ssc-cpo"] || [],
    sscGD: childCategoryTests["ssc-gd-constable"] || [],

    // Banking Child Categories
    bankingPO: childCategoryTests["banking-po"] || [],
    bankingClerk: childCategoryTests["banking-clerk"] || [],
    bankingSO: childCategoryTests["banking-so"] || [],
    bankingRRB: childCategoryTests["banking-rrb"] || [],
    bankingNABARD: childCategoryTests["banking-nabard"] || [],

    // Railway Child Categories
    railwayGroupD: childCategoryTests["railway-group-d"] || [],
    railwayNTPC: childCategoryTests["railway-ntpc"] || [],
    railwayALP: childCategoryTests["railway-alp"] || [],
    railwayJE: childCategoryTests["railway-je"] || [],
    railwayStationMaster: childCategoryTests["railway-station-master"] || [],

    // Defense Child Categories
    defenseNDA: childCategoryTests["defense-nda"] || [],
    defenseCDS: childCategoryTests["defense-cds"] || [],
    defenseAFCAT: childCategoryTests["defense-afcat"] || [],
    defenseAirmen: childCategoryTests["defense-airmen"] || [],
    defenseNavySailor: childCategoryTests["defense-navy-sailor"] || [],
  }
}

// Generate all tests
const generatedTests = generateUpCentralTests()

// Export test catalog
export const testCatalog = {
  ...generatedTests,
  // Include custom test if needed
  all: [...generatedTests.all], 
}