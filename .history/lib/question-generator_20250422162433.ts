// Question generator for different exam subcategories

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate a unique ID for each question
function generateQuestionId(testId: number, questionIndex: number): string {
  return `q-${testId}-${questionIndex}`
}

// Base question types for different categories
// const questionTypes = {
//   // Police exam questions
//   police: [
//     {
//       type: "general-knowledge",
//       topics: ["current-affairs", "history", "geography", "policing", "law", "constitution"],
//     },
//     {
//       type: "aptitude",
//       topics: ["reasoning", "numerical-ability", "data-interpretation"],
//     },
//     {
//       type: "language",
//       topics: ["hindi", "english", "comprehension", "grammar"],
//     },
//     {
//       type: "physical-knowledge",
//       topics: ["fitness", "first-aid", "emergency-response"],
//     },
//   ],

//   // Teaching exam questions
//   teaching: [
//     {
//       type: "pedagogy",
//       topics: ["teaching-methods", "child-development", "learning-theories", "evaluation"],
//     },
//     {
//       type: "subject-knowledge",
//       topics: ["mathematics", "science", "social-studies", "language"],
//     },
//     {
//       type: "education-policy",
//       topics: ["nep", "education-acts", "right-to-education", "inclusive-education"],
//     },
//     {
//       type: "child-psychology",
//       topics: ["development", "learning", "motivation", "classroom-management"],
//     },
//   ],

//   // Clerical exam questions
//   clerical: [
//     {
//       type: "office-procedures",
//       topics: ["filing", "record-keeping", "correspondence", "office-management"],
//     },
//     {
//       type: "computer-knowledge",
//       topics: ["ms-office", "internet", "email", "basic-hardware"],
//     },
//     {
//       type: "numerical-ability",
//       topics: ["arithmetic", "percentage", "ratio", "data-interpretation"],
//     },
//     {
//       type: "language",
//       topics: ["english", "hindi", "comprehension", "letter-writing"],
//     },
//   ],

//   // Technical exam questions
//   technical: [
//     {
//       type: "engineering",
//       topics: ["civil", "electrical", "mechanical", "computer-science"],
//     },
//     {
//       type: "mathematics",
//       topics: ["algebra", "calculus", "trigonometry", "statistics"],
//     },
//     {
//       type: "physics",
//       topics: ["mechanics", "electricity", "magnetism", "modern-physics"],
//     },
//     {
//       type: "technical-aptitude",
//       topics: ["logical-reasoning", "data-interpretation", "technical-drawing"],
//     },
//   ],

//   // SSC exam questions
//   ssc: [
//     {
//       type: "general-awareness",
//       topics: ["current-affairs", "history", "geography", "economics", "polity"],
//     },
//     {
//       type: "quantitative-aptitude",
//       topics: ["arithmetic", "algebra", "geometry", "trigonometry", "data-interpretation"],
//     },
//     {
//       type: "english",
//       topics: ["grammar", "vocabulary", "comprehension", "verbal-ability"],
//     },
//     {
//       type: "reasoning",
//       topics: ["logical-reasoning", "analytical-reasoning", "verbal-reasoning", "non-verbal-reasoning"],
//     },
//   ],

//   // Banking exam questions
//   banking: [
//     {
//       type: "banking-awareness",
//       topics: ["banking-history", "financial-institutions", "monetary-policy", "banking-terms"],
//     },
//     {
//       type: "quantitative-aptitude",
//       topics: ["arithmetic", "data-interpretation", "number-series", "simplification"],
//     },
//     {
//       type: "reasoning",
//       topics: ["logical-reasoning", "analytical-reasoning", "puzzles", "seating-arrangement"],
//     },
//     {
//       type: "english",
//       topics: ["grammar", "vocabulary", "comprehension", "verbal-ability"],
//     },
//   ],

//   // Railway exam questions
//   railway: [
//     {
//       type: "general-awareness",
//       topics: ["current-affairs", "railway-history", "geography", "science"],
//     },
//     {
//       type: "technical-knowledge",
//       topics: ["basic-electricity", "mechanics", "railway-engineering", "signals"],
//     },
//     {
//       type: "mathematics",
//       topics: ["arithmetic", "algebra", "geometry", "mensuration"],
//     },
//     {
//       type: "reasoning",
//       topics: ["logical-reasoning", "analytical-reasoning", "data-sufficiency"],
//     },
//   ],

//   // Defense exam questions
//   defense: [
//     {
//       type: "general-knowledge",
//       topics: ["current-affairs", "defense", "history", "geography", "polity"],
//     },
//     {
//       type: "mathematics",
//       topics: ["arithmetic", "algebra", "geometry", "trigonometry"],
//     },
//     {
//       type: "english",
//       topics: ["grammar", "vocabulary", "comprehension", "verbal-ability"],
//     },
//     {
//       type: "reasoning",
//       topics: ["logical-reasoning", "analytical-reasoning", "spatial-ability"],
//     },
//   ],
// }

// // Question templates for different topics
// const questionTemplates: Record<string, any[]> = {
//   // History Questions
//   history: [
//     {
//       question: "The Battle of Plassey was fought in which year?",
//       options: ["1757", "1764", "1775", "1748"],
//       correctAnswer: "1757",
//     },
//     {
//       question: "Who founded the Maurya Empire?",
//       options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Chanakya"],
//       correctAnswer: "Chandragupta Maurya",
//     },
//     {
//       question: "The Quit India Movement was launched in which year?",
//       options: ["1942", "1930", "1947", "1940"],
//       correctAnswer: "1942",
//     },
//     {
//       question: "Who was the first woman President of the Indian National Congress?",
//       options: ["Annie Besant", "Sarojini Naidu", "Indira Gandhi", "Sucheta Kriplani"],
//       correctAnswer: "Annie Besant",
//     },
//     {
//       question: "The Jallianwala Bagh Massacre took place in which city?",
//       options: ["Amritsar", "Lahore", "Delhi", "Lucknow"],
//       correctAnswer: "Amritsar",
//     },
//     {
//       question: "Who was the first Prime Minister of India?",
//       options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Rajendra Prasad"],
//       correctAnswer: "Jawaharlal Nehru",
//     },
//     {
//       question: "The Indus Valley Civilization flourished during which period?",
//       options: ["2500-1500 BCE", "1500-500 BCE", "3500-2500 BCE", "500 BCE-500 CE"],
//       correctAnswer: "2500-1500 BCE",
//     },
//     {
//       question: "Who was the last Mughal Emperor of India?",
//       options: ["Bahadur Shah Zafar", "Aurangzeb", "Shah Alam II", "Akbar II"],
//       correctAnswer: "Bahadur Shah Zafar",
//     },
//     {
//       question: "The Revolt of 1857 started from which place?",
//       options: ["Meerut", "Delhi", "Kanpur", "Lucknow"],
//       correctAnswer: "Meerut",
//     },
//     {
//       question: "Who was known as the 'Iron Man of India'?",
//       options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
//       correctAnswer: "Sardar Vallabhbhai Patel",
//     },
//   ],

//   // Geography Questions
//   geography: [
//     {
//       question: "Which is the largest state in India by area?",
//       options: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"],
//       correctAnswer: "Rajasthan",
//     },
//     {
//       question: "The Tropic of Cancer passes through how many states in India?",
//       options: ["8", "7", "9", "6"],
//       correctAnswer: "8",
//     },
//     {
//       question: "Which river is known as the 'Sorrow of Bihar'?",
//       options: ["Kosi", "Ganga", "Son", "Gandak"],
//       correctAnswer: "Kosi",
//     },
//     {
//       question: "Which state has the highest literacy rate in India?",
//       options: ["Kerala", "Mizoram", "Goa", "Tripura"],
//       correctAnswer: "Kerala",
//     },
//     {
//       question: "The Siachen Glacier is located in which mountain range?",
//       options: ["Karakoram", "Himalayas", "Pir Panjal", "Ladakh"],
//       correctAnswer: "Karakoram",
//     },
//     {
//       question: "Which is the southernmost point of India?",
//       options: ["Indira Point", "Kanyakumari", "Rameshwaram", "Dhanushkodi"],
//       correctAnswer: "Indira Point",
//     },
//     {
//       question: "Which state shares borders with the maximum number of states in India?",
//       options: ["Uttar Pradesh", "Madhya Pradesh", "Assam", "Bihar"],
//       correctAnswer: "Uttar Pradesh",
//     },
//     {
//       question: "Which is the largest freshwater lake in India?",
//       options: ["Wular Lake", "Dal Lake", "Chilika Lake", "Pulicat Lake"],
//       correctAnswer: "Wular Lake",
//     },
//     {
//       question: "Which state in India has the longest coastline?",
//       options: ["Gujarat", "Tamil Nadu", "Andhra Pradesh", "Maharashtra"],
//       correctAnswer: "Gujarat",
//     },
//     {
//       question: "Which is the highest waterfall in India?",
//       options: ["Jog Falls", "Dudhsagar Falls", "Nohkalikai Falls", "Kunchikal Falls"],
//       correctAnswer: "Kunchikal Falls",
//     },
//   ],

//   // Current Affairs Questions
//   "current-affairs": [
//     {
//       question: "Who is the current Chief Minister of [STATE]?",
//       options: ["[NAME1]", "[NAME2]", "[NAME3]", "[NAME4]"],
//       correctAnswer: "[NAME1]",
//     },
//     {
//       question: "Which scheme was launched by the Government of India to provide financial assistance to farmers?",
//       options: ["[SCHEME1]", "[SCHEME2]", "[SCHEME3]", "[SCHEME4]"],
//       correctAnswer: "[SCHEME1]",
//     },
//     {
//       question: "When was [EVENT] implemented in India?",
//       options: ["[YEAR1]", "[YEAR2]", "[YEAR3]", "[YEAR4]"],
//       correctAnswer: "[YEAR1]",
//     },
//     {
//       question: "Which state has recently implemented the new education policy first in India?",
//       options: ["Madhya Pradesh", "Gujarat", "Karnataka", "Uttar Pradesh"],
//       correctAnswer: "Gujarat",
//     },
//     {
//       question: "Who is the current Chief Justice of India?",
//       options: ["D.Y. Chandrachud", "N.V. Ramana", "S.A. Bobde", "Ranjan Gogoi"],
//       correctAnswer: "D.Y. Chandrachud",
//     },
//     {
//       question: "Which country hosted the G20 Summit in 2023?",
//       options: ["India", "Indonesia", "Italy", "Japan"],
//       correctAnswer: "India",
//     },
//     {
//       question: "Which Indian state was divided into two Union Territories in 2019?",
//       options: ["Jammu and Kashmir", "Andhra Pradesh", "Bihar", "Uttar Pradesh"],
//       correctAnswer: "Jammu and Kashmir",
//     },
//     {
//       question: "Who is the current President of India?",
//       options: ["Droupadi Murmu", "Ram Nath Kovind", "Pratibha Patil", "Pranab Mukherjee"],
//       correctAnswer: "Droupadi Murmu",
//     },
//     {
//       question: "Which Indian became the CEO of Twitter (now X) in 2023?",
//       options: ["Linda Yaccarino", "Parag Agrawal", "Sundar Pichai", "Satya Nadella"],
//       correctAnswer: "Linda Yaccarino",
//     },
//     {
//       question: "Which Indian state hosted the 2023 Cricket World Cup final?",
//       options: ["Gujarat", "Maharashtra", "Tamil Nadu", "Karnataka"],
//       correctAnswer: "Gujarat",
//     },
//   ],

//   // Policing Questions
//   policing: [
//     {
//       question: "Under which section of CrPC is a police officer authorized to arrest without warrant?",
//       options: ["Section 41", "Section 50", "Section 60", "Section 70"],
//       correctAnswer: "Section 41",
//     },
//     {
//       question: "What is the full form of FIR in the context of police procedures?",
//       options: [
//         "First Information Report",
//         "Final Investigation Report",
//         "Formal Inquiry Record",
//         "Field Incident Report",
//       ],
//       correctAnswer: "First Information Report",
//     },
//     {
//       question: "Which of the following is NOT a duty of a police constable?",
//       options: [
//         "Passing judgment in court cases",
//         "Maintaining law and order",
//         "Crime prevention",
//         "Evidence collection",
//       ],
//       correctAnswer: "Passing judgment in court cases",
//     },
//     {
//       question: "Under which section of IPC is the offense of 'Giving false evidence' defined?",
//       options: ["Section 191", "Section 201", "Section 211", "Section 221"],
//       correctAnswer: "Section 191",
//     },
//     {
//       question:
//         "What is the minimum educational qualification required for the post of Police Constable in most states?",
//       options: ["10+2 (Higher Secondary)", "Graduation", "10th Pass", "Post Graduation"],
//       correctAnswer: "10+2 (Higher Secondary)",
//     },
//     {
//       question: "Which of the following is NOT a type of police custody?",
//       options: ["Judicial custody", "Preventive custody", "Executive custody", "Investigative custody"],
//       correctAnswer: "Executive custody",
//     },
//     {
//       question: "What is the maximum period for which a person can be detained in police custody?",
//       options: ["15 days", "90 days", "180 days", "60 days"],
//       correctAnswer: "15 days",
//     },
//     {
//       question: "Which of the following is NOT a power of a police officer?",
//       options: ["Pronouncing judgment", "Arresting without warrant", "Search and seizure", "Investigation"],
//       correctAnswer: "Pronouncing judgment",
//     },
//     {
//       question: "Under which section of CrPC can a police officer conduct a search without a warrant?",
//       options: ["Section 165", "Section 100", "Section 102", "Section 41"],
//       correctAnswer: "Section 165",
//     },
//     {
//       question: "What is the full form of NCRB?",
//       options: [
//         "National Crime Records Bureau",
//         "National Criminal Registration Board",
//         "National Crime Reporting Body",
//         "National Center for Records and Biometrics",
//       ],
//       correctAnswer: "National Crime Records Bureau",
//     },
//   ],

//   // Law Questions
//   law: [
//     {
//       question: "Which Article of the Indian Constitution abolishes untouchability?",
//       options: ["Article 17", "Article 14", "Article 21", "Article 25"],
//       correctAnswer: "Article 17",
//     },
//     {
//       question: "Under which section of IPC is the offense of 'Murder' defined?",
//       options: ["Section 302", "Section 307", "Section 299", "Section 304"],
//       correctAnswer: "Section 302",
//     },
//     {
//       question: "Which of the following is a cognizable offense?",
//       options: ["Murder", "Defamation", "Assault", "Cheating"],
//       correctAnswer: "Murder",
//     },
//     {
//       question: "The Right to Information Act was enacted in which year?",
//       options: ["2005", "2000", "2010", "2002"],
//       correctAnswer: "2005",
//     },
//     {
//       question: "Which of the following is NOT a Fundamental Right under the Indian Constitution?",
//       options: ["Right to Property", "Right to Equality", "Right to Freedom", "Right to Constitutional Remedies"],
//       correctAnswer: "Right to Property",
//     },
//     {
//       question: "Which Article of the Indian Constitution deals with the Right to Education?",
//       options: ["Article 21A", "Article 19", "Article 14", "Article 32"],
//       correctAnswer: "Article 21A",
//     },
//     {
//       question: "Under which section of IPC is the offense of 'Sedition' defined?",
//       options: ["Section 124A", "Section 153A", "Section 295A", "Section 499"],
//       correctAnswer: "Section 124A",
//     },
//     {
//       question: "Which of the following is NOT a type of writ under the Indian Constitution?",
//       options: ["Writ of Prohibition", "Writ of Certiorari", "Writ of Mandamus", "Writ of Injunction"],
//       correctAnswer: "Writ of Injunction",
//     },
//     {
//       question: "The Consumer Protection Act was enacted in which year?",
//       options: ["1986", "1991", "2000", "2019"],
//       correctAnswer: "1986",
//     },
//     {
//       question: "Which of the following is NOT a source of law in India?",
//       options: ["Executive Orders", "Customs", "Precedents", "Legislation"],
//       correctAnswer: "Executive Orders",
//     },
//   ],

//   // Constitution Questions
//   constitution: [
//     {
//       question: "Who is known as the 'Father of the Indian Constitution'?",
//       options: ["Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel"],
//       correctAnswer: "Dr. B.R. Ambedkar",
//     },
//     {
//       question: "How many Fundamental Rights are guaranteed by the Indian Constitution?",
//       options: ["6", "7", "5", "8"],
//       correctAnswer: "6",
//     },
//     {
//       question: "Which part of the Indian Constitution deals with Fundamental Rights?",
//       options: ["Part III", "Part IV", "Part II", "Part V"],
//       correctAnswer: "Part III",
//     },
//     {
//       question: "The Preamble to the Indian Constitution was amended by which Constitutional Amendment?",
//       options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
//       correctAnswer: "42nd Amendment",
//     },
//     {
//       question: "Which Article of the Indian Constitution provides for the appointment of the Prime Minister?",
//       options: ["Article 75", "Article 74", "Article 76", "Article 78"],
//       correctAnswer: "Article 75",
//     },
//     {
//       question: "Which Schedule of the Indian Constitution deals with the official languages?",
//       options: ["Eighth Schedule", "Seventh Schedule", "Ninth Schedule", "Tenth Schedule"],
//       correctAnswer: "Eighth Schedule",
//     },
//     {
//       question: "How many Articles were there in the original Constitution of India?",
//       options: ["395", "448", "350", "400"],
//       correctAnswer: "395",
//     },
//     {
//       question: "Which Article of the Indian Constitution abolishes the practice of untouchability?",
//       options: ["Article 17", "Article 15", "Article 14", "Article 16"],
//       correctAnswer: "Article 17",
//     },
//     {
//       question: "The Constitution of India came into force on:",
//       options: ["26th January 1950", "15th August 1947", "26th November 1949", "30th January 1948"],
//       correctAnswer: "26th January 1950",
//     },
//     {
//       question: "Which part of the Indian Constitution deals with the Directive Principles of State Policy?",
//       options: ["Part IV", "Part III", "Part V", "Part VI"],
//       correctAnswer: "Part IV",
//     },
//   ],

//   // Mathematics Questions
//   arithmetic: [
//     {
//       question:
//         "If [NUM1] men can complete a work in [NUM2] days, how many men are required to complete the same work in [NUM3] days?",
//       options: ["[ANS1]", "[ANS2]", "[ANS3]", "[ANS4]"],
//       correctAnswer: "[ANS1]",
//     },
//     {
//       question:
//         "A train running at [SPEED] km/hr crosses a platform of length [LENGTH] meters in [TIME] seconds. What is the length of the train?",
//       options: ["[ANS1] meters", "[ANS2] meters", "[ANS3] meters", "[ANS4] meters"],
//       correctAnswer: "[ANS1] meters",
//     },
//     {
//       question:
//         "If the simple interest on a sum of money at [RATE]% per annum for [YEARS] years is Rs. [INTEREST], what is the principal amount?",
//       options: ["Rs. [ANS1]", "Rs. [ANS2]", "Rs. [ANS3]", "Rs. [ANS4]"],
//       correctAnswer: "Rs. [ANS1]",
//     },
//     {
//       question: "The average of 5 consecutive numbers is 27. What is the largest of these numbers?",
//       options: ["29", "30", "31", "28"],
//       correctAnswer: "29",
//     },
//     {
//       question:
//         "A shopkeeper gives a discount of 10% on the marked price and still makes a profit of 20%. If the cost price is Rs. 600, what is the marked price?",
//       options: ["Rs. 800", "Rs. 900", "Rs. 750", "Rs. 720"],
//       correctAnswer: "Rs. 800",
//     },
//     {
//       question:
//         "If [NUM1] workers can complete a task in [NUM2] days, how many workers are needed to complete it in [NUM3] days?",
//       options: ["[ANS1]", "[ANS2]", "[ANS3]", "[ANS4]"],
//       correctAnswer: "[ANS1]",
//     },
//     {
//       question: "What is the compound interest on Rs. 10,000 at 10% per annum for 2 years?",
//       options: ["Rs. 2,100", "Rs. 2,000", "Rs. 2,200", "Rs. 2,500"],
//       correctAnswer: "Rs. 100",
//     },
//     {
//       question:
//         "If the cost price of 15 articles is equal to the selling price of 12 articles, what is the profit percentage?",
//       options: ["25%", "20%", "30%", "15%"],
//       correctAnswer: "25%",
//     },
//     {
//       question: "A car travels 150 km in 3 hours. What is its speed in meters per second?",
//       options: ["13.89 m/s", "15 m/s", "12.5 m/s", "41.67 m/s"],
//       correctAnswer: "13.89 m/s",
//     },
//     {
//       question: "If a : b = 2 : 3 and b : c = 4 : 5, then a : c = ?",
//       options: ["8 : 15", "2 : 5", "4 : 5", "3 : 5"],
//       correctAnswer: "8 : 15",
//     },
//   ],

//   // Algebra Questions
//   algebra: [
//     {
//       question: "Solve for x: 3x - 7 = 14",
//       options: ["x = 7", "x = 8", "x = 6", "x = 9"],
//       correctAnswer: "x = 7",
//     },
//     {
//       question: "If a² - b² = 9 and a + b = 3, then what is the value of a - b?",
//       options: ["3", "6", "9", "1"],
//       correctAnswer: "3",
//     },
//     {
//       question: "Factorize: x² - 5x + 6",
//       options: ["(x - 2)(x - 3)", "(x - 1)(x - 6)", "(x - 3)(x - 2)", "(x + 2)(x + 3)"],
//       correctAnswer: "(x - 2)(x - 3)",
//     },
//     {
//       question: "If x + y = 10 and xy = 21, what is the value of x² + y²?",
//       options: ["58", "100", "42", "79"],
//       correctAnswer: "58",
//     },
//     {
//       question: "Solve the quadratic equation: x² - 7x + 12 = 0",
//       options: ["x = 3, x = 4", "x = 2, x = 5", "x = 1, x = 6", "x = -3, x = -4"],
//       correctAnswer: "x = 3, x = 4",
//     },
//     {
//       question: "If 2x + 3y = 12 and 3x - 2y = 8, what is the value of x?",
//       options: ["4", "3", "2", "5"],
//       correctAnswer: "4",
//     },
//     {
//       question: "What is the value of x in the equation: log₂(x) = 3?",
//       options: ["8", "6", "4", "16"],
//       correctAnswer: "8",
//     },
//     {
//       question: "If a + b + c = 10 and ab + bc + ca = 27, what is the value of a² + b² + c²?",
//       options: ["46", "54", "100", "73"],
//       correctAnswer: "46",
//     },
//     {
//       question: "Simplify: (2x³y²)² ÷ (4x²y)",
//       options: ["x⁴y³", "x⁶y⁴", "x⁴y⁴", "x²y³"],
//       correctAnswer: "x⁴y³",
//     },
//     {
//       question: "If f(x) = x² - 3x + 2, what is the value of f(2)?",
//       options: ["0", "1", "2", "4"],
//       correctAnswer: "0",
//     },
//   ],

//   // English Questions
//   grammar: [
//     {
//       question: "Choose the correct form of the verb: She [BLANK] to the market yesterday.",
//       options: ["go", "goes", "went", "gone"],
//       correctAnswer: "went",
//     },
//     {
//       question: "Identify the part of speech of the underlined word: The [WORD] dog barked loudly.",
//       options: ["Noun", "Pronoun", "Adjective", "Adverb"],
//       correctAnswer: "Adjective",
//     },
//     {
//       question: "Choose the correct synonym of '[WORD]':",
//       options: ["[SYN1]", "[SYN2]", "[SYN3]", "[SYN4]"],
//       correctAnswer: "[SYN1]",
//     },
//     {
//       question: "Choose the correct article: I saw ____ one-eyed man at the park.",
//       options: ["a", "an", "the", "no article needed"],
//       correctAnswer: "a",
//     },
//     {
//       question: "Identify the tense: She has been working here since 2010.",
//       options: ["Present Perfect Continuous", "Present Perfect", "Past Perfect", "Simple Present"],
//       correctAnswer: "Present Perfect Continuous",
//     },
//     {
//       question: "Choose the correct preposition: The book is ____ the table.",
//       options: ["on", "in", "at", "by"],
//       correctAnswer: "on",
//     },
//     {
//       question: "Identify the type of sentence: How beautiful the sunset is!",
//       options: ["Exclamatory", "Interrogative", "Imperative", "Declarative"],
//       correctAnswer: "Exclamatory",
//     },
//     {
//       question: "Choose the correct plural form of 'child':",
//       options: ["children", "childs", "childrens", "child"],
//       correctAnswer: "children",
//     },
//     {
//       question: "Identify the passive voice: The cake was baked by Mary.",
//       options: ["Passive Voice", "Active Voice", "Present Participle", "Past Participle"],
//       correctAnswer: "Passive Voice",
//     },
//     {
//       question: "Choose the correct conjunction: I wanted to go out, ____ it was raining.",
//       options: ["but", "and", "or", "so"],
//       correctAnswer: "but",
//     },
//   ],

//   // Vocabulary Questions
//   vocabulary: [
//     {
//       question: "Choose the correct meaning of the word 'Ambiguous':",
//       options: ["Unclear or having multiple meanings", "Clear and precise", "Ambitious", "Careful"],
//       correctAnswer: "Unclear or having multiple meanings",
//     },
//     {
//       question: "Choose the correct antonym of 'Benevolent':",
//       options: ["Malevolent", "Generous", "Kind", "Charitable"],
//       correctAnswer: "Malevolent",
//     },
//     {
//       question: "Choose the word that is spelled correctly:",
//       options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
//       correctAnswer: "Accommodate",
//     },
//     {
//       question: "Choose the correct meaning of the idiom 'To bite the dust':",
//       options: ["To be defeated", "To die", "To eat dirt", "To be humiliated"],
//       correctAnswer: "To be defeated",
//     },
//     {
//       question: "Choose the word that is closest in meaning to 'Frugal':",
//       options: ["Economical", "Wasteful", "Generous", "Extravagant"],
//       correctAnswer: "Economical",
//     },
//     {
//       question: "Choose the correct antonym of 'Verbose':",
//       options: ["Concise", "Lengthy", "Wordy", "Detailed"],
//       correctAnswer: "Concise",
//     },
//     {
//       question: "Choose the word that is spelled correctly:",
//       options: ["Necessary", "Neccessary", "Necesary", "Neccesary"],
//       correctAnswer: "Necessary",
//     },
//     {
//       question: "Choose the correct meaning of the idiom 'To hit the nail on the head':",
//       options: ["To do or say exactly the right thing", "To hurt oneself", "To build something", "To be angry"],
//       correctAnswer: "To do or say exactly the right thing",
//     },
//     {
//       question: "Choose the word that is closest in meaning to 'Diligent':",
//       options: ["Hardworking", "Lazy", "Careless", "Intelligent"],
//       correctAnswer: "Hardworking",
//     },
//     {
//       question: "Choose the correct antonym of 'Ephemeral':",
//       options: ["Permanent", "Temporary", "Fleeting", "Transient"],
//       correctAnswer: "Permanent",
//     },
//   ],

//   // Reasoning Questions
//   "logical-reasoning": [
//     {
//       question: "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
//       options: ["Uncle", "Father", "Grandfather", "Brother"],
//       correctAnswer: "Uncle",
//     },
//     {
//       question: "Complete the series: 2, 6, 12, 20, [BLANK]",
//       options: ["30", "32", "36", "42"],
//       correctAnswer: "30",
//     },
//     {
//       question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
//       options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBQH"],
//       correctAnswer: "EDRIRL",
//     },
//     {
//       question:
//         "In a row of children, Rahul is 7th from the left and Mohan is 5th from the right. If they interchange their positions, Rahul becomes 11th from the left. How many children are there in the row?",
//       options: ["15", "16", "17", "18"],
//       correctAnswer: "17",
//     },
//     {
//       question: "If 'MOUSE' is written as 'PRUQC', then how is 'KEYBOARD' written in that code?",
//       options: ["ICZBPYSE", "ICZAPYRD", "JDZCPZSE", "JDZAPYRD"],
//       correctAnswer: "ICZBPYSE",
//     },
//     {
//       question: "If 'CAT' is coded as '312', how would 'DOG' be coded?",
//       options: ["415", "514", "451", "541"],
//       correctAnswer: "415",
//     },
//     {
//       question: "Complete the analogy: Hand : Glove :: Foot : ?",
//       options: ["Sock", "Shoe", "Leg", "Toe"],
//       correctAnswer: "Shoe",
//     },
//     {
//       question: "If all Roses are Flowers and all Flowers are Plants, which of the following is definitely true?",
//       options: ["All Roses are Plants", "All Plants are Flowers", "All Plants are Roses", "None of these"],
//       correctAnswer: "All Roses are Plants",
//     },
//     {
//       question: "Find the odd one out: 16, 25, 36, 49, 64, 81, 100",
//       options: ["49", "64", "81", "100"],
//       correctAnswer: "49",
//     },
//     {
//       question: "If 'DELHI' is coded as '73541', how would 'MUMBAI' be coded?",
//       options: ["13129185", "13129815", "13192815", "13192185"],
//       correctAnswer: "13129185",
//     },
//   ],

//   // Teaching Methods Questions
//   "teaching-methods": [
//     {
//       question: "Which of the following is NOT a characteristic of the project method of teaching?",
//       options: ["Teacher-centered approach", "Learning by doing", "Problem-solving", "Real-life application"],
//       correctAnswer: "Teacher-centered approach",
//     },
//     {
//       question: "The concept of 'Zone of Proximal Development' was proposed by:",
//       options: ["Lev Vygotsky", "Jean Piaget", "B.F. Skinner", "John Dewey"],
//       correctAnswer: "Lev Vygotsky",
//     },
//     {
//       question: "Which teaching method is most suitable for developing critical thinking skills?",
//       options: ["Discussion method", "Lecture method", "Demonstration method", "Drill method"],
//       correctAnswer: "Discussion method",
//     },
//     {
//       question: "Bloom's Taxonomy categorizes cognitive learning objectives into how many levels?",
//       options: ["6", "5", "7", "4"],
//       correctAnswer: "6",
//     },
//     {
//       question: "Which of the following is an example of formative assessment?",
//       options: ["Class quiz", "Final examination", "End-of-year test", "Board examination"],
//       correctAnswer: "Class quiz",
//     },
//     {
//       question: "Which of the following is NOT a principle of constructivist teaching?",
//       options: ["Rote memorization", "Active learning", "Collaborative learning", "Reflective learning"],
//       correctAnswer: "Rote memorization",
//     },
//     {
//       question: "The 'Flipped Classroom' approach involves:",
//       options: [
//         "Students learning content at home and practicing in class",
//         "Teachers lecturing in class and students practicing at home",
//         "Students teaching other students",
//         "Teachers flipping between different subjects",
//       ],
//       correctAnswer: "Students learning content at home and practicing in class",
//     },
//     {
//       question: "Which of the following is NOT a characteristic of the inquiry-based learning method?",
//       options: [
//         "Teacher provides all the answers",
//         "Students ask questions",
//         "Students investigate to find answers",
//         "Students construct their own understanding",
//       ],
//       correctAnswer: "Teacher provides all the answers",
//     },
//     {
//       question: "The concept of 'Multiple Intelligences' was proposed by:",
//       options: ["Howard Gardner", "B.F. Skinner", "Jean Piaget", "Lev Vygotsky"],
//       correctAnswer: "Howard Gardner",
//     },
//     {
//       question: "Which of the following is NOT a type of cooperative learning strategy?",
//       options: ["Individual competition", "Think-Pair-Share", "Jigsaw", "Numbered Heads Together"],
//       correctAnswer: "Individual competition",
//     },
//   ],

//   // Child Development Questions
//   "child-development": [
//     {
//       question: "According to Piaget, the 'Concrete Operational Stage' occurs between which ages?",
//       options: ["7-11 years", "2-7 years", "11-15 years", "0-2 years"],
//       correctAnswer: "7-11 years",
//     },
//     {
//       question: "Which of the following is NOT a characteristic of the pre-operational stage of cognitive development?",
//       options: ["Conservation", "Egocentrism", "Animism", "Symbolic thinking"],
//       correctAnswer: "Conservation",
//     },
//     {
//       question: "The concept of 'Attachment Theory' was developed by:",
//       options: ["John Bowlby", "Erik Erikson", "B.F. Skinner", "Jean Piaget"],
//       correctAnswer: "John Bowlby",
//     },
//     {
//       question: "Which of the following is a fine motor skill?",
//       options: ["Using scissors", "Running", "Jumping", "Climbing stairs"],
//       correctAnswer: "Using scissors",
//     },
//     {
//       question: "According to Erikson, the psychosocial crisis of adolescence is:",
//       options: [
//         "Identity vs. Role Confusion",
//         "Industry vs. Inferiority",
//         "Initiative vs. Guilt",
//         "Trust vs. Mistrust",
//       ],
//       correctAnswer: "Identity vs. Role Confusion",
//     },
//     {
//       question: "Which of the following is NOT a stage in Kohlberg's theory of moral development?",
//       options: ["Sensorimotor stage", "Pre-conventional stage", "Conventional stage", "Post-conventional stage"],
//       correctAnswer: "Sensorimotor stage",
//     },
//     {
//       question: "The concept of 'Scaffolding' in child development is associated with:",
//       options: ["Lev Vygotsky", "Jean Piaget", "B.F. Skinner", "Sigmund Freud"],
//       correctAnswer: "Lev Vygotsky",
//     },
//     {
//       question: "Which of the following is NOT a characteristic of secure attachment in infants?",
//       options: [
//         "Avoidance of the caregiver",
//         "Using the caregiver as a secure base",
//         "Seeking comfort from the caregiver when distressed",
//         "Exploring the environment when the caregiver is present",
//       ],
//       correctAnswer: "Avoidance of the caregiver",
//     },
//     {
//       question:
//         "According to Piaget, the process of adjusting existing schemas to incorporate new information is called:",
//       options: ["Accommodation", "Assimilation", "Adaptation", "Organization"],
//       correctAnswer: "Accommodation",
//     },
//     {
//       question: "Which of the following is NOT a characteristic of authoritative parenting?",
//       options: [
//         "Strict rules with no explanation",
//         "High expectations",
//         "Warmth and responsiveness",
//         "Clear boundaries",
//       ],
//       correctAnswer: "Strict rules with no explanation",
//     },
//   ],

//   // Computer Knowledge Questions
//   "ms-office": [
//     {
//       question: "Which of the following is NOT a component of Microsoft Office?",
//       options: ["Photoshop", "Excel", "PowerPoint", "Word"],
//       correctAnswer: "Photoshop",
//     },
//     {
//       question: "In Microsoft Excel, what does the function VLOOKUP do?",
//       options: [
//         "Searches for a value in the first column and returns a value in the same row",
//         "Searches for a value in any column",
//         "Sorts data in ascending order",
//         "Counts the number of cells with values",
//       ],
//       correctAnswer: "Searches for a value in the first column and returns a value in the same row",
//     },
//     {
//       question: "Which shortcut key is used to save a document in Microsoft Word?",
//       options: ["Ctrl+S", "Ctrl+P", "Ctrl+C", "Ctrl+V"],
//       correctAnswer: "Ctrl+S",
//     },
//     {
//       question: "Which view in PowerPoint displays each slide as a thumbnail?",
//       options: ["Slide Sorter View", "Normal View", "Reading View", "Slide Show View"],
//       correctAnswer: "Slide Sorter View",
//     },
//     {
//       question: "In Microsoft Excel, which function is used to count the number of cells that contain numbers?",
//       options: ["COUNT", "SUM", "AVERAGE", "MAX"],
//       correctAnswer: "COUNT",
//     },
//     {
//       question: "Which of the following is NOT a chart type in Microsoft Excel?",
//       options: ["Holographic Chart", "Pie Chart", "Bar Chart", "Line Chart"],
//       correctAnswer: "Holographic Chart",
//     },
//     {
//       question: "In Microsoft Word, what is the default file extension for documents?",
//       options: [".docx", ".doc", ".txt", ".rtf"],
//       correctAnswer: ".docx",
//     },
//     {
//       question: "Which function in Excel returns the largest value in a range of cells?",
//       options: ["MAX", "LARGE", "TOP", "HIGHEST"],
//       correctAnswer: "MAX",
//     },
//     {
//       question: "In Microsoft PowerPoint, what is the keyboard shortcut to start a slide show from the beginning?",
//       options: ["F5", "F1", "Ctrl+F5", "Alt+F5"],
//       correctAnswer: "F5",
//     },
//     {
//       question: "Which of the following is NOT a type of page orientation in Microsoft Word?",
//       options: ["Diagonal", "Portrait", "Landscape", "Custom"],
//       correctAnswer: "Diagonal",
//     },
//   ],

//   // Internet Questions
//   internet: [
//     {
//       question: "What does URL stand for?",
//       options: [
//         "Uniform Resource Locator",
//         "Universal Resource Locator",
//         "Uniform Resource Link",
//         "Universal Resource Link",
//       ],
//       correctAnswer: "Uniform Resource Locator",
//     },
//     {
//       question: "Which of the following is NOT a web browser?",
//       options: ["Oracle", "Chrome", "Firefox", "Safari"],
//       correctAnswer: "Oracle",
//     },
//     {
//       question: "What does HTTP stand for?",
//       options: [
//         "Hypertext Transfer Protocol",
//         "Hypertext Transfer Package",
//         "Hypertext Transmission Protocol",
//         "Hypertext Terminal Protocol",
//       ],
//       correctAnswer: "Hypertext Transfer Protocol",
//     },
//     {
//       question: "Which of the following is used to identify a specific computer on the internet?",
//       options: ["IP Address", "MAC Address", "Domain Name", "URL"],
//       correctAnswer: "IP Address",
//     },
//     {
//       question: "What is the main purpose of a firewall?",
//       options: [
//         "To protect a network from unauthorized access",
//         "To increase internet speed",
//         "To store data",
//         "To compress files",
//       ],
//       correctAnswer: "To protect a network from unauthorized access",
//     },
//     {
//       question: "Which of the following is NOT a search engine?",
//       options: ["Instagram", "Google", "Bing", "Yahoo"],
//       correctAnswer: "Instagram",
//     },
//     {
//       question: "What does ISP stand for?",
//       options: [
//         "Internet Service Provider",
//         "Internet Security Protocol",
//         "Internet Service Protocol",
//         "Internet Security Provider",
//       ],
//       correctAnswer: "Internet Service Provider",
//     },
//     {
//       question: "Which of the following is NOT a valid domain extension?",
//       options: [".web", ".com", ".org", ".net"],
//       correctAnswer: ".web",
//     },
//     {
//       question: "What is the purpose of cookies on websites?",
//       options: [
//         "To store user preferences and tracking information",
//         "To protect websites from hackers",
//         "To increase download speed",
//         "To compress web pages",
//       ],
//       correctAnswer: "To store user preferences and tracking information",
//     },
//     {
//       question: "What does Wi-Fi stand for?",
//       options: ["Wireless Fidelity", "Wired Fidelity", "Wireless Fiber", "Wired Fiber"],
//       correctAnswer: "Wireless Fidelity",
//     },
//   ],

//   // Banking Questions
//   "banking-terms": [
//     {
//       question: "What does NEFT stand for?",
//       options: [
//         "National Electronic Funds Transfer",
//         "National Electronic Financial Transfer",
//         "National Electronic Fast Transfer",
//         "National Electronic Fund Transaction",
//       ],
//       correctAnswer: "National Electronic Funds Transfer",
//     },
//     {
//       question: "Which of the following is NOT a function of the Reserve Bank of India?",
//       options: [
//         "Providing loans to individuals",
//         "Issuing currency",
//         "Banker to the Government",
//         "Regulating other banks",
//       ],
//       correctAnswer: "Providing loans to individuals",
//     },
//     {
//       question: "What is the full form of KYC in banking?",
//       options: ["Know Your Customer", "Keep Your Cash", "Key Yield Control", "Knowledge Yield Curve"],
//       correctAnswer: "Know Your Customer",
//     },
//     {
//       question:
//         "Which of the following is a type of bank account that typically offers higher interest rates but has restrictions on withdrawals?",
//       options: ["Fixed Deposit Account", "Savings Account", "Current Account", "Recurring Deposit Account"],
//       correctAnswer: "Fixed Deposit Account",
//     },
//     {
//       question: "What does CRR stand for in banking?",
//       options: ["Cash Reserve Ratio", "Credit Reserve Ratio", "Capital Reserve Ratio", "Currency Reserve Ratio"],
//       correctAnswer: "Cash Reserve Ratio",
//     },
//     {
//       question: "Which of the following is NOT a type of cheque?",
//       options: ["Transfer Cheque", "Bearer Cheque", "Crossed Cheque", "Order Cheque"],
//       correctAnswer: "Transfer Cheque",
//     },
//     {
//       question: "What is the full form of RTGS?",
//       options: [
//         "Real Time Gross Settlement",
//         "Real Time General Settlement",
//         "Rapid Time Gross Settlement",
//         "Rapid Transfer General System",
//       ],
//       correctAnswer: "Real Time Gross Settlement",
//     },
//     {
//       question: "Which of the following is NOT a type of loan offered by banks?",
//       options: ["Friendship Loan", "Home Loan", "Education Loan", "Personal Loan"],
//       correctAnswer: "Friendship Loan",
//     },
//     {
//       question: "What is the full form of MICR in banking?",
//       options: [
//         "Magnetic Ink Character Recognition",
//         "Magnetic Ink Code Reader",
//         "Machine Ink Character Reader",
//         "Machine Ink Code Recognition",
//       ],
//       correctAnswer: "Magnetic Ink Character Recognition",
//     },
//     {
//       question: "Which of the following is NOT a function of commercial banks?",
//       options: ["Deciding monetary policy", "Accepting deposits", "Providing loans", "Issuing debit cards"],
//       correctAnswer: "Deciding monetary policy",
//     },
//   ],

//   // Railway Questions
//   "railway-history": [
//     {
//       question: "When was the first train in India operated?",
//       options: ["1853", "1848", "1860", "1875"],
//       correctAnswer: "1853",
//     },
//     {
//       question: "The first train in India ran between which two stations?",
//       options: ["Bombay to Thane", "Calcutta to Delhi", "Madras to Bangalore", "Delhi to Agra"],
//       correctAnswer: "Bombay to Thane",
//     },
//     {
//       question: "Who was the first Railway Minister of independent India?",
//       options: ["John Mathai", "Lal Bahadur Shastri", "N. Gopalaswami Ayyangar", "Jawaharlal Nehru"],
//       correctAnswer: "John Mathai",
//     },
//     {
//       question: "Which is the oldest railway station in India?",
//       options: ["Bori Bunder (Mumbai)", "Howrah (Kolkata)", "Chennai Central", "Delhi Junction"],
//       correctAnswer: "Bori Bunder (Mumbai)",
//     },
//     {
//       question: "The Indian Railways is divided into how many zones?",
//       options: ["17", "16", "18", "15"],
//       correctAnswer: "17",
//     },
//     {
//       question: "Which was the first electric train introduced in India?",
//       options: ["Deccan Queen", "Taj Express", "Flying Ranee", "Grand Trunk Express"],
//       correctAnswer: "Deccan Queen",
//     },
//     {
//       question: "In which year was the first underground railway (Metro Railway) started in India?",
//       options: ["1984", "1982", "1995", "1975"],
//       correctAnswer: "1984",
//     },
//     {
//       question: "Which is the longest railway platform in India?",
//       options: ["Gorakhpur", "Kharagpur", "Sonepur", "Kollam"],
//       correctAnswer: "Gorakhpur",
//     },
//     {
//       question: "The headquarters of the Indian Railways is located at:",
//       options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
//       correctAnswer: "New Delhi",
//     },
//     {
//       question: "Which is the oldest locomotive in India that is still in working condition?",
//       options: ["Fairy Queen", "Lord Falkland", "Express", "Sahib"],
//       correctAnswer: "Fairy Queen",
//     },
//   ],

//   // Railway Engineering Questions
//   "railway-engineering": [
//     {
//       question: "What is the standard gauge used in Indian Railways?",
//       options: ["1676 mm", "1435 mm", "1000 mm", "762 mm"],
//       correctAnswer: "1676 mm",
//     },
//     {
//       question: "Which of the following is NOT a type of railway track gauge?",
//       options: ["Diagonal Gauge", "Broad Gauge", "Meter Gauge", "Narrow Gauge"],
//       correctAnswer: "Diagonal Gauge",
//     },
//     {
//       question: "What is the main function of a railway sleeper?",
//       options: [
//         "To hold the rails in position",
//         "To provide comfort to passengers",
//         "To reduce train speed",
//         "To store electrical equipment",
//       ],
//       correctAnswer: "To hold the rails in position",
//     },
//     {
//       question: "Which of the following is used to join two rails together?",
//       options: ["Fish plate", "Sleeper", "Ballast", "Spike"],
//       correctAnswer: "Fish plate",
//     },
//     {
//       question: "What is the purpose of ballast in railway tracks?",
//       options: [
//         "To distribute the load",
//         "To increase train speed",
//         "To reduce noise",
//         "To store electrical equipment",
//       ],
//       correctAnswer: "To distribute the load",
//     },
//     {
//       question: "Which of the following is NOT a type of railway signal?",
//       options: ["Diagonal signal", "Semaphore signal", "Colour light signal", "Position light signal"],
//       correctAnswer: "Diagonal signal",
//     },
//     {
//       question: "What is the maximum speed of Vande Bharat Express in India?",
//       options: ["180 km/h", "200 km/h", "160 km/h", "220 km/h"],
//       correctAnswer: "180 km/h",
//     },
//     {
//       question: "Which of the following is NOT a component of a railway track?",
//       options: ["Transformer", "Rails", "Sleepers", "Ballast"],
//       correctAnswer: "Transformer",
//     },
//     {
//       question: "What is the purpose of a railway turnout?",
//       options: [
//         "To allow trains to change tracks",
//         "To stop trains in emergency",
//         "To supply power to trains",
//         "To measure train speed",
//       ],
//       correctAnswer: "To allow trains to change tracks",
//     },
//     {
//       question: "Which of the following is NOT a type of railway bridge?",
//       options: ["Magnetic bridge", "Arch bridge", "Truss bridge", "Suspension bridge"],
//       correctAnswer: "Magnetic bridge",
//     },
//   ],

//   // Defense Questions
//   defense: [
//     {
//       question: "Who is the Supreme Commander of the Indian Armed Forces?",
//       options: ["President of India", "Prime Minister of India", "Defense Minister", "Chief of Defense Staff"],
//       correctAnswer: "President of India",
//     },
//     {
//       question: "Which of the following is NOT one of the three main branches of the Indian Armed Forces?",
//       options: ["Border Security Force", "Indian Army", "Indian Navy", "Indian Air Force"],
//       correctAnswer: "Border Security Force",
//     },
//     {
//       question: "The National Defense Academy (NDA) is located at:",
//       options: ["Khadakwasla, Pune", "Wellington, Tamil Nadu", "Dehradun, Uttarakhand", "Hyderabad, Telangana"],
//       correctAnswer: "Khadakwasla, Pune",
//     },
//     {
//       question: "Which of the following is India's first indigenous aircraft carrier?",
//       options: ["INS Vikrant", "INS Vikramaditya", "INS Viraat", "INS Vishal"],
//       correctAnswer: "INS Vikrant",
//     },
//     {
//       question: "Operation Vijay was associated with which conflict?",
//       options: ["Kargil War", "Indo-Pak War 1971", "Operation Blue Star", "Goa Liberation"],
//       correctAnswer: "Kargil War",
//     },
//     {
//       question: "Which of the following is NOT a rank in the Indian Army?",
//       options: ["Flight Lieutenant", "Major", "Colonel", "Brigadier"],
//       correctAnswer: "Flight Lieutenant",
//     },
//     {
//       question: "The Indian Military Academy (IMA) is located at:",
//       options: ["Dehradun", "Pune", "Chennai", "Hyderabad"],
//       correctAnswer: "Dehradun",
//     },
//     {
//       question: "Which of the following is India's nuclear-powered submarine?",
//       options: ["INS Arihant", "INS Vikrant", "INS Chakra", "INS Shivalik"],
//       correctAnswer: "INS Arihant",
//     },
//     {
//       question: "The motto of the Indian Army is:",
//       options: ["Service Before Self", "Duty, Honor, Country", "Nation First", "Unity and Discipline"],
//       correctAnswer: "Service Before Self",
//     },
//     {
//       question: "Which of the following is NOT a paramilitary force in India?",
//       options: [
//         "Indian Coast Guard",
//         "Border Security Force",
//         "Central Reserve Police Force",
//         "Indo-Tibetan Border Police",
//       ],
//       correctAnswer: "Indian Coast Guard",
//     },
//   ],

//   // Education Policy Questions
//   nep: [
//     {
//       question:
//         "The National Education Policy (NEP) 2020 proposes to increase the public investment in education to what percentage of GDP?",
//       options: ["6%", "4%", "8%", "10%"],
//       correctAnswer: "6%",
//     },
//     {
//       question: "According to NEP 2020, the new pedagogical structure for school education will be:",
//       options: ["5+3+3+4", "10+2", "8+4", "4+4+4"],
//       correctAnswer: "5+3+3+4",
//     },
//     {
//       question: "Which language does NEP 2020 recommend as the medium of instruction until at least Grade 5?",
//       options: ["Mother tongue/local language", "English", "Hindi", "Sanskrit"],
//       correctAnswer: "Mother tongue/local language",
//     },
//     {
//       question: "What is the target Gross Enrollment Ratio in higher education by 2035 as per NEP 2020?",
//       options: ["50%", "40%", "60%", "30%"],
//       correctAnswer: "50%",
//     },
//     {
//       question: "Which body is proposed to be set up as a single regulator for higher education as per NEP 2020?",
//       options: [
//         "Higher Education Commission of India (HECI)",
//         "University Grants Commission (UGC)",
//         "All India Council for Technical Education (AICTE)",
//         "National Assessment and Accreditation Council (NAAC)",
//       ],
//       correctAnswer: "Higher Education Commission of India (HECI)",
//     },
//     {
//       question: "According to NEP 2020, what will replace the 10+2 structure in school education?",
//       options: ["5+3+3+4 structure", "4+4+4 structure", "6+3+3 structure", "5+4+3 structure"],
//       correctAnswer: "5+3+3+4 structure",
//     },
//     {
//       question: "Which of the following is NOT a key principle of NEP 2020?",
//       options: [
//         "Standardized testing as the primary assessment method",
//         "Respect for diversity and local context",
//         "Equity and inclusion",
//         "Emphasis on conceptual understanding",
//       ],
//       correctAnswer: "Standardized testing as the primary assessment method",
//     },
//     {
//       question: "According to NEP 2020, what is the proposed name for the Ministry of Human Resource Development?",
//       options: [
//         "Ministry of Education",
//         "Ministry of Learning and Development",
//         "Ministry of Knowledge",
//         "Ministry of Human Capital",
//       ],
//       correctAnswer: "Ministry of Education",
//     },
//     {
//       question: "What is the minimum qualification proposed for teachers by NEP 2020?",
//       options: ["4-year integrated B.Ed. degree", "2-year B.Ed. degree", "1-year B.Ed. degree", "D.El.Ed."],
//       correctAnswer: "4-year integrated B.Ed. degree",
//     },
//     {
//       question: "Which of the following is NOT a goal of NEP 2020?",
//       options: [
//         "Privatization of all educational institutions",
//         "Universal access to education at all levels",
//         "Equity and inclusion in education",
//         "Promotion of India as a global study destination",
//       ],
//       correctAnswer: "Privatization of all educational institutions",
//     },
//   ],

//   // Education Acts Questions
//   "education-acts": [
//     {
//       question: "The Right of Children to Free and Compulsory Education Act came into force in which year?",
//       options: ["2010", "2009", "2012", "2008"],
//       correctAnswer: "2010",
//     },
//     {
//       question: "Under the RTE Act, what is the prescribed pupil-teacher ratio for primary classes?",
//       options: ["30:1", "35:1", "40:1", "25:1"],
//       correctAnswer: "30:1",
//     },
//     {
//       question: "Which Article of the Indian Constitution was amended to make education a fundamental right?",
//       options: ["Article 21A", "Article 45", "Article 46", "Article 51A"],
//       correctAnswer: "Article 21A",
//     },
//     {
//       question: "The National Council for Teacher Education Act was passed in which year?",
//       options: ["1993", "1995", "1990", "1986"],
//       correctAnswer: "1993",
//     },
//     {
//       question: "Which commission recommended the three-language formula in education?",
//       options: ["Kothari Commission", "Mudaliar Commission", "Radhakrishnan Commission", "Yashpal Committee"],
//       correctAnswer: "Kothari Commission",
//     },
//     {
//       question: "The University Grants Commission (UGC) was established in which year?",
//       options: ["1956", "1947", "1962", "1973"],
//       correctAnswer: "1956",
//     },
//     {
//       question: "Which of the following is NOT a provision of the Right to Education Act?",
//       options: [
//         "Mandatory board examinations for all classes",
//         "25% reservation for economically disadvantaged communities in private schools",
//         "No detention policy till Class 8",
//         "Prohibition of physical punishment and mental harassment",
//       ],
//       correctAnswer: "Mandatory board examinations for all classes",
//     },
//     {
//       question: "The National Policy on Education was first formulated in which year?",
//       options: ["1968", "1986", "1992", "2002"],
//       correctAnswer: "1968",
//     },
//     {
//       question: "Which act established the National Council for Teacher Education as a statutory body?",
//       options: ["NCTE Act, 1993", "RTE Act, 2009", "Education Act, 1996", "Teacher Education Act, 1995"],
//       correctAnswer: "NCTE Act, 1993",
//     },
//     {
//       question: "Under the RTE Act, what is the age group for which education is free and compulsory?",
//       options: ["6-14 years", "5-15 years", "3-18 years", "6-16 years"],
//       correctAnswer: "6-14 years",
//     },
//   ],

//   // Civil Engineering Questions
//   civil: [
//     {
//       question: "Which of the following is NOT a type of cement?",
//       options: ["Silicon Cement", "Portland Cement", "Rapid Hardening Cement", "Sulphate Resisting Cement"],
//       correctAnswer: "Silicon Cement",
//     },
//     {
//       question: "What is the standard size of a brick in India?",
//       options: [
//         "190 mm × 90 mm × 90 mm",
//         "200 mm × 100 mm × 100 mm",
//         "210 mm × 110 mm × 70 mm",
//         "180 mm × 90 mm × 80 mm",
//       ],
//       correctAnswer: "190 mm × 90 mm × 90 mm",
//     },
//     {
//       question: "Which test is used to determine the workability of concrete?",
//       options: ["Slump Test", "Compression Test", "Tensile Test", "Flexural Test"],
//       correctAnswer: "Slump Test",
//     },
//     {
//       question: "What is the minimum grade of concrete recommended for RCC work as per IS 456?",
//       options: ["M20", "M15", "M25", "M30"],
//       correctAnswer: "M20",
//     },
//     {
//       question: "Which of the following is NOT a type of foundation?",
//       options: ["Cantilever Foundation", "Raft Foundation", "Pile Foundation", "Isolated Footing"],
//       correctAnswer: "Cantilever Foundation",
//     },
//     {
//       question: "What is the main constituent of cement?",
//       options: ["Limestone", "Clay", "Gypsum", "Silica"],
//       correctAnswer: "Limestone",
//     },
//     {
//       question: "Which of the following is NOT a type of dam?",
//       options: ["Inflatable Dam", "Gravity Dam", "Arch Dam", "Buttress Dam"],
//       correctAnswer: "Inflatable Dam",
//     },
//     {
//       question: "What is the ratio of cement:sand:aggregate in nominal mix M20 grade concrete?",
//       options: ["1:1.5:3", "1:2:4", "1:3:6", "1:1:2"],
//       correctAnswer: "1:1.5:3",
//     },
//     {
//       question: "Which of the following is NOT a type of steel reinforcement used in RCC?",
//       options: ["Mild Steel", "HYSD Bars", "TMT Bars", "Cast Iron Bars"],
//       correctAnswer: "Cast Iron Bars",
//     },
//     {
//       question: "What is the purpose of providing cover in RCC structures?",
//       options: [
//         "To protect reinforcement from corrosion",
//         "To increase the strength of concrete",
//         "To reduce the weight of the structure",
//         "To improve the appearance of the structure",
//       ],
//       correctAnswer: "To protect reinforcement from corrosion",
//     },
//   ],

//   // Electrical Engineering Questions
//   electrical: [
//     {
//       question: "What is Ohm's Law?",
//       options: ["V = IR", "P = VI", "I = P/V", "R = P/I²"],
//       correctAnswer: "V = IR",
//     },
//     {
//       question: "Which of the following is NOT a passive component?",
//       options: ["Transistor", "Resistor", "Capacitor", "Inductor"],
//       correctAnswer: "Transistor",
//     },
//     {
//       question: "What is the SI unit of electrical resistance?",
//       options: ["Ohm", "Ampere", "Volt", "Watt"],
//       correctAnswer: "Ohm",
//     },
//     {
//       question: "Which law states that the algebraic sum of all currents entering and leaving a node must equal zero?",
//       options: ["Kirchhoff's Current Law", "Kirchhoff's Voltage Law", "Ohm's Law", "Faraday's Law"],
//       correctAnswer: "Kirchhoff's Current Law",
//     },
//     {
//       question: "What is the purpose of a transformer?",
//       options: [
//         "To change voltage levels",
//         "To generate electricity",
//         "To store electrical energy",
//         "To convert AC to DC",
//       ],
//       correctAnswer: "To change voltage levels",
//     },
//     {
//       question: "Which of the following is NOT a type of electric motor?",
//       options: ["Thermal Motor", "Induction Motor", "Synchronous Motor", "DC Motor"],
//       correctAnswer: "Thermal Motor",
//     },
//     {
//       question: "What is the SI unit of electrical power?",
//       options: ["Watt", "Joule", "Volt", "Ampere"],
//       correctAnswer: "Watt",
//     },
//     {
//       question: "Which of the following is used to protect electrical circuits from overcurrent?",
//       options: ["Fuse", "Capacitor", "Inductor", "Transformer"],
//       correctAnswer: "Fuse",
//     },
//     {
//       question: "What is the frequency of AC supply in India?",
//       options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
//       correctAnswer: "50 Hz",
//     },
//     {
//       question: "Which of the following is NOT a type of electrical insulator?",
//       options: ["Copper", "Porcelain", "Glass", "Rubber"],
//       correctAnswer: "Copper",
//     },
//   ],

//   // Mechanical Engineering Questions
//   mechanical: [
//     {
//       question: "What is the First Law of Thermodynamics?",
//       options: [
//         "Energy can neither be created nor destroyed, only transformed",
//         "Heat flows from hot to cold",
//         "Every action has an equal and opposite reaction",
//         "Entropy of an isolated system always increases",
//       ],
//       correctAnswer: "Energy can neither be created nor destroyed, only transformed",
//     },
//     {
//       question: "Which of the following is NOT a type of gear?",
//       options: ["Cylindrical Gear", "Spur Gear", "Helical Gear", "Bevel Gear"],
//       correctAnswer: "Cylindrical Gear",
//     },
//     {
//       question: "What is the SI unit of pressure?",
//       options: ["Pascal", "Newton", "Joule", "Watt"],
//       correctAnswer: "Pascal",
//     },
//     {
//       question: "Which cycle is used in diesel engines?",
//       options: ["Diesel Cycle", "Otto Cycle", "Carnot Cycle", "Rankine Cycle"],
//       correctAnswer: "Diesel Cycle",
//     },
//     {
//       question: "What is the purpose of a governor in an engine?",
//       options: [
//         "To regulate engine speed",
//         "To increase power output",
//         "To reduce fuel consumption",
//         "To control ignition timing",
//       ],
//       correctAnswer: "To regulate engine speed",
//     },
//     {
//       question: "Which of the following is NOT a type of mechanical joint?",
//       options: ["Electrical Joint", "Riveted Joint", "Welded Joint", "Bolted Joint"],
//       correctAnswer: "Electrical Joint",
//     },
//     {
//       question: "What is the SI unit of torque?",
//       options: ["Newton-meter", "Joule", "Watt", "Pascal"],
//       correctAnswer: "Newton-meter",
//     },
//     {
//       question: "Which of the following is NOT a type of bearing?",
//       options: ["Magnetic Bearing", "Ball Bearing", "Roller Bearing", "Bush Bearing"],
//       correctAnswer: "Magnetic Bearing",
//     },
//     {
//       question: "What is the purpose of a flywheel in an engine?",
//       options: [
//         "To store energy and reduce fluctuations in speed",
//         "To increase the power output",
//         "To reduce fuel consumption",
//         "To control ignition timing",
//       ],
//       correctAnswer: "To store energy and reduce fluctuations in speed",
//     },
//     {
//       question: "Which of the following is NOT a type of pump?",
//       options: ["Thermal Pump", "Centrifugal Pump", "Reciprocating Pump", "Rotary Pump"],
//       correctAnswer: "Thermal Pump",
//     },
//   ],

//   // Computer Science Questions
//   "computer-science": [
//     {
//       question: "Which of the following is NOT a programming language?",
//       options: ["BIOS", "Python", "Java", "C++"],
//       correctAnswer: "BIOS",
//     },
//     {
//       question: "What does CPU stand for?",
//       options: [
//         "Central Processing Unit",
//         "Central Program Unit",
//         "Computer Processing Unit",
//         "Control Processing Unit",
//       ],
//       correctAnswer: "Central Processing Unit",
//     },
//     {
//       question: "Which data structure follows the Last In First Out (LIFO) principle?",
//       options: ["Stack", "Queue", "Linked List", "Array"],
//       correctAnswer: "Stack",
//     },
//     {
//       question: "What is the time complexity of binary search algorithm?",
//       options: ["O(log n)", "O(n)", "O(n²)", "O(n log n)"],
//       correctAnswer: "O(log n)",
//     },
//     {
//       question: "Which of the following is NOT a type of database?",
//       options: ["Vector Database", "Relational Database", "NoSQL Database", "Object-Oriented Database"],
//       correctAnswer: "Vector Database",
//     },
//     {
//       question: "Which of the following is NOT an operating system?",
//       options: ["Oracle", "Windows", "Linux", "macOS"],
//       correctAnswer: "Oracle",
//     },
//     {
//       question: "What does HTML stand for?",
//       options: [
//         "Hypertext Markup Language",
//         "Hypertext Machine Language",
//         "Hypertext Marking Language",
//         "Hightext Markup Language",
//       ],
//       correctAnswer: "Hypertext Markup Language",
//     },
//     {
//       question: "Which of the following is NOT a type of computer network?",
//       options: [
//         "PAN (Personal Area Network)",
//         "LAN (Local Area Network)",
//         "MAN (Metropolitan Area Network)",
//         "FAN (Functional Area Network)",
//       ],
//       correctAnswer: "FAN (Functional Area Network)",
//     },
//     {
//       question: "What is the full form of DBMS?",
//       options: [
//         "Database Management System",
//         "Database Manipulation System",
//         "Data Management System",
//         "Data Manipulation System",
//       ],
//       correctAnswer: "Database Management System",
//     },
//     {
//       question: "Which of the following is NOT a type of software?",
//       options: ["Shareware", "Freeware", "Hardware", "Open-source software"],
//       correctAnswer: "Hardware",
//     },
//   ],
// }
const questionTemplates: Record<string, any[]> = {
  // History Questions
  history: [
    {
      question: "The Battle of Plassey was fought in which year?",
      options: ["1757", "1764", "1775", "1748"],
      correctAnswer: "1757",
    },
    {
      question: "Who founded the Maurya Empire?",
      options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Chanakya"],
      correctAnswer: "Chandragupta Maurya",
    },
    {
      question: "The Quit India Movement was launched in which year?",
      options: ["1942", "1930", "1947", "1940"],
      correctAnswer: "1942",
    },
    {
      question: "Who was the first woman President of the Indian National Congress?",
      options: ["Annie Besant", "Sarojini Naidu", "Indira Gandhi", "Sucheta Kriplani"],
      correctAnswer: "Annie Besant",
    },
    {
      question: "The Jallianwala Bagh Massacre took place in which city?",
      options: ["Amritsar", "Lahore", "Delhi", "Lucknow"],
      correctAnswer: "Amritsar",
    },
    {
      question: "Who was the first Prime Minister of India?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Rajendra Prasad"],
      correctAnswer: "Jawaharlal Nehru",
    },
    {
      question: "The Indus Valley Civilization flourished during which period?",
      options: ["2500-1500 BCE", "1500-500 BCE", "3500-2500 BCE", "500 BCE-500 CE"],
      correctAnswer: "2500-1500 BCE",
    },
    {
      question: "Who was the last Mughal Emperor of India?",
      options: ["Bahadur Shah Zafar", "Aurangzeb", "Shah Alam II", "Akbar II"],
      correctAnswer: "Bahadur Shah Zafar",
    },
    {
      question: "The Revolt of 1857 started from which place?",
      options: ["Meerut", "Delhi", "Kanpur", "Lucknow"],
      correctAnswer: "Meerut",
    },
    {
      question: "Who was known as the 'Iron Man of India'?",
      options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
      correctAnswer: "Sardar Vallabhbhai Patel",
    },
    // New Questions
    {
      question: "Which dynasty built the Khajuraho temples?",
      options: ["Chandela", "Pala", "Gupta", "Chola"],
      correctAnswer: "Chandela",
    },
    {
      question: "The Dandi Salt March was led by whom in 1930?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Lala Lajpat Rai"],
      correctAnswer: "Mahatma Gandhi",
    },
    {
      question: "In which year was the Indian National Congress founded?",
      options: ["1885", "1890", "1875", "1905"],
      correctAnswer: "1885",
    },
    {
      question: "Who was the first Governor-General of independent India?",
      options: ["Lord Mountbatten", "C. Rajagopalachari", "Lord Canning", "Lord Dalhousie"],
      correctAnswer: "Lord Mountbatten",
    },
    {
      question: "The Battle of Panipat in 1526 was fought between Babur and whom?",
      options: ["Ibrahim Lodi", "Rana Sanga", "Sher Shah Suri", "Hemu"],
      correctAnswer: "Ibrahim Lodi",
    },
    {
      question: "Which movement was launched by Gandhi in 1919 against the Rowlatt Act?",
      options: ["Non-Cooperation Movement", "Satyagraha Movement", "Civil Disobedience Movement", "Quit India Movement"],
      correctAnswer: "Satyagraha Movement",
    },
    {
      question: "Who authored the book 'Discovery of India'?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Rabindranath Tagore", "Subhas Chandra Bose"],
      correctAnswer: "Jawaharlal Nehru",
    },
    {
      question: "The Vijayanagara Empire was founded by whom?",
      options: ["Harihara and Bukka", "Krishnadevaraya", "Devaraya II", "Sadasiva Raya"],
      correctAnswer: "Harihara and Bukka",
    },
    {
      question: "Which British act partitioned Bengal in 1905?",
      options: ["Partition of Bengal Act", "Indian Councils Act", "Government of India Act", "Regulating Act"],
      correctAnswer: "Partition of Bengal Act",
    },
    {
      question: "Who was the leader of the Bardoli Satyagraha in 1928?",
      options: ["Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "C. Rajagopalachari"],
      correctAnswer: "Sardar Vallabhbhai Patel",
    },
  ],

  // Geography Questions
  geography: [
    {
      question: "Which is the largest state in India by area?",
      options: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"],
      correctAnswer: "Rajasthan",
    },
    {
      question: "The Tropic of Cancer passes through how many states in India?",
      options: ["8", "7", "9", "6"],
      correctAnswer: "8",
    },
    {
      question: "Which river is known as the 'Sorrow of Bihar'?",
      options: ["Kosi", "Ganga", "Son", "Gandak"],
      correctAnswer: "Kosi",
    },
    {
      question: "Which state has the highest literacy rate in India?",
      options: ["Kerala", "Mizoram", "Goa", "Tripura"],
      correctAnswer: "Kerala",
    },
    {
      question: "The Siachen Glacier is located in which mountain range?",
      options: ["Karakoram", "Himalayas", "Pir Panjal", "Ladakh"],
      correctAnswer: "Karakoram",
    },
    {
      question: "Which is the southernmost point of India?",
      options: ["Indira Point", "Kanyakumari", "Rameshwaram", "Dhanushkodi"],
      correctAnswer: "Indira Point",
    },
    {
      question: "Which state shares borders with the maximum number of states in India?",
      options: ["Uttar Pradesh", "Madhya Pradesh", "Assam", "Bihar"],
      correctAnswer: "Uttar Pradesh",
    },
    {
      question: "Which is the largest freshwater lake in India?",
      options: ["Wular Lake", "Dal Lake", "Chilika Lake", "Pulicat Lake"],
      correctAnswer: "Wular Lake",
    },
    {
      question: "Which state in India has the longest coastline?",
      options: ["Gujarat", "Tamil Nadu", "Andhra Pradesh", "Maharashtra"],
      correctAnswer: "Gujarat",
    },
    {
      question: "Which is the highest waterfall in India?",
      options: ["Jog Falls", "Dudhsagar Falls", "Nohkalikai Falls", "Kunchikal Falls"],
      correctAnswer: "Kunchikal Falls",
    },
    // New Questions
    {
      question: "Which is the largest desert in India?",
      options: ["Thar Desert", "Rann of Kutch", "Ladakh Desert", "Deccan Desert"],
      correctAnswer: "Thar Desert",
    },
    {
      question: "The Sundarbans Delta is located in which state?",
      options: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
      correctAnswer: "West Bengal",
    },
    {
      question: "Which Indian river is known as the 'Tsangpo' in Tibet?",
      options: ["Brahmaputra", "Ganga", "Indus", "Yamuna"],
      correctAnswer: "Brahmaputra",
    },
    {
      question: "Which national park in [STATE] is famous for the one-horned rhinoceros?",
      options: ["Kaziranga", "Jim Corbett", "Sundarbans", "Ranthambore"],
      correctAnswer: "Kaziranga",
    },
    {
      question: "Which is the highest dam in India?",
      options: ["Tehri Dam", "Bhakra Dam", "Sardar Sarovar Dam", "Hirakud Dam"],
      correctAnswer: "Tehri Dam",
    },
    {
      question: "The Andaman and Nicobar Islands are separated by which channel?",
      options: ["Ten Degree Channel", "Palk Strait", "Gulf of Mannar", "Duncan Passage"],
      correctAnswer: "Ten Degree Channel",
    },
    {
      question: "Which Indian state is known as the 'Land of Five Rivers'?",
      options: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar"],
      correctAnswer: "Punjab",
    },
    {
      question: "Which is the largest mangrove forest in India?",
      options: ["Sundarbans", "Bhitarkanika", "Pichavaram", "Coringa"],
      correctAnswer: "Sundarbans",
    },
    {
      question: "The Western Ghats are located along the western border of which state?",
      options: ["Kerala", "Rajasthan", "Uttar Pradesh", "Assam"],
      correctAnswer: "Kerala",
    },
    {
      question: "Which Indian city is located at the confluence of the Ganga and Yamuna rivers?",
      options: ["Prayagraj", "Varanasi", "Haridwar", "Rishikesh"],
      correctAnswer: "Prayagraj",
    },
  ],

  // Current Affairs Questions
  "current-affairs": [
    {
      question: "Who is the current Chief Minister of [STATE]?",
      options: ["[NAME1]", "[NAME2]", "[NAME3]", "[NAME4]"],
      correctAnswer: "[NAME1]",
    },
    {
      question: "Which scheme was launched by the Government of India to provide financial assistance to farmers?",
      options: ["[SCHEME1]", "[SCHEME2]", "[SCHEME3]", "[SCHEME4]"],
      correctAnswer: "[SCHEME1]",
    },
    {
      question: "When was [EVENT] implemented in India?",
      options: ["[YEAR1]", "[YEAR2]", "[YEAR3]", "[YEAR4]"],
      correctAnswer: "[YEAR1]",
    },
    {
      question: "Which state has recently implemented the new education policy first in India?",
      options: ["Madhya Pradesh", "Gujarat", "Karnataka", "Uttar Pradesh"],
      correctAnswer: "Gujarat",
    },
    {
      question: "Who is the current Chief Justice of India?",
      options: ["D.Y. Chandrachud", "N.V. Ramana", "S.A. Bobde", "Ranjan Gogoi"],
      correctAnswer: "D.Y. Chandrachud",
    },
    {
      question: "Which country hosted the G20 Summit in 2023?",
      options: ["India", "Indonesia", "Italy", "Japan"],
      correctAnswer: "India",
    },
    {
      question: "Which Indian state was divided into two Union Territories in 2019?",
      options: ["Jammu and Kashmir", "Andhra Pradesh", "Bihar", "Uttar Pradesh"],
      correctAnswer: "Jammu and Kashmir",
    },
    {
      question: "Who is the current President of India?",
      options: ["Droupadi Murmu", "Ram Nath Kovind", "Pratibha Patil", "Pranab Mukherjee"],
      correctAnswer: "Droupadi Murmu",
    },
    {
      question: "Which Indian became the CEO of Twitter (now X) in 2023?",
      options: ["Linda Yaccarino", "Parag Agrawal", "Sundar Pichai", "Satya Nadella"],
      correctAnswer: "Linda Yaccarino",
    },
    {
      question: "Which Indian state hosted the 2023 Cricket World Cup final?",
      options: ["Gujarat", "Maharashtra", "Tamil Nadu", "Karnataka"],
      correctAnswer: "Gujarat",
    },
    // New Questions
    {
      question: "Which Indian mission successfully landed on the moon’s south pole in 2023?",
      options: ["Chandrayaan-3", "Mangalyaan-2", "Gaganyaan", "Aditya-L1"],
      correctAnswer: "Chandrayaan-3",
    },
    {
      question: "Who won the Nobel Peace Prize in 2024 for nuclear disarmament efforts?",
      options: ["Nihon Hidankyo", "Elon Musk", "Greta Thunberg", "Malala Yousafzai"],
      correctAnswer: "Nihon Hidankyo",
    },
    {
      question: "Which Indian city hosted the Commonwealth Games in [YEAR1]?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      correctAnswer: "Delhi",
    },
    {
      question: "Which country will chair the G20 Summit in 2025?",
      options: ["South Africa", "Brazil", "India", "Australia"],
      correctAnswer: "South Africa",
    },
    {
      question: "What is the name of India’s first solar mission launched in 2023?",
      options: ["Aditya-L1", "Surya-1", "Chandrayaan-4", "Solar Orbiter"],
      correctAnswer: "Aditya-L1",
    },
    {
      question: "Which [SCHEME1] was extended to provide free healthcare to senior citizens in 2024?",
      options: ["Ayushman Bharat", "PM Kisan", "Ujjwala Yojana", "Swachh Bharat"],
      correctAnswer: "Ayushman Bharat",
    },
    {
      question: "Who became the first Indian to win an Oscar for Best Original Song in 2023?",
      options: ["M.M. Keeravani", "A.R. Rahman", "Anirudh Ravichander", "Ilaiyaraaja"],
      correctAnswer: "M.M. Keeravani",
    },
    {
      question: "Which Indian state banned single-use plastics in 2024?",
      options: ["Maharashtra", "Tamil Nadu", "Kerala", "Uttar Pradesh"],
      correctAnswer: "Maharashtra",
    },
    {
      question: "Which Indian athlete won gold in javelin throw at the 2024 Paris Olympics?",
      options: ["Neeraj Chopra", "Abhinav Bindra", "P.V. Sindhu", "Manu Bhaker"],
      correctAnswer: "Neeraj Chopra",
    },
    {
      question: "Which new metro line was inaugurated in [STATE] in 2024?",
      options: ["Delhi Metro", "Mumbai Metro", "Kolkata Metro", "Chennai Metro"],
      correctAnswer: "Mumbai Metro",
    },
  ],

  // Policing Questions
  policing: [
    {
      question: "Under which section of CrPC is a police officer authorized to arrest without warrant?",
      options: ["Section 41", "Section 50", "Section 60", "Section 70"],
      correctAnswer: "Section 41",
    },
    {
      question: "What is the full form of FIR in the context of police procedures?",
      options: [
        "First Information Report",
        "Final Investigation Report",
        "Formal Inquiry Record",
        "Field Incident Report",
      ],
      correctAnswer: "First Information Report",
    },
    {
      question: "Which of the following is NOT a duty of a police constable?",
      options: [
        "Passing judgment in court cases",
        "Maintaining law and order",
        "Crime prevention",
        "Evidence collection",
      ],
      correctAnswer: "Passing judgment in court cases",
    },
    {
      question: "Under which section of IPC is the offense of 'Giving false evidence' defined?",
      options: ["Section 191", "Section 201", "Section 211", "Section 221"],
      correctAnswer: "Section 191",
    },
    {
      question:
        "What is the minimum educational qualification required for the post of Police Constable in most states?",
      options: ["10+2 (Higher Secondary)", "Graduation", "10th Pass", "Post Graduation"],
      correctAnswer: "10+2 (Higher Secondary)",
    },
    {
      question: "Which of the following is NOT a type of police custody?",
      options: ["Judicial custody", "Preventive custody", "Executive custody", "Investigative custody"],
      correctAnswer: "Executive custody",
    },
    {
      question: "What is the maximum period for which a person can be detained in police custody?",
      options: ["15 days", "90 days", "180 days", "60 days"],
      correctAnswer: "15 days",
    },
    {
      question: "Which of the following is NOT a power of a police officer?",
      options: ["Pronouncing judgment", "Arresting without warrant", "Search and seizure", "Investigation"],
      correctAnswer: "Pronouncing judgment",
    },
    {
      question: "Under which section of CrPC can a police officer conduct a search without a warrant?",
      options: ["Section 165", "Section 100", "Section 102", "Section 41"],
      correctAnswer: "Section 165",
    },
    {
      question: "What is the full form of NCRB?",
      options: [
        "National Crime Records Bureau",
        "National Criminal Registration Board",
        "National Crime Reporting Body",
        "National Center for Records and Biometrics",
      ],
      correctAnswer: "National Crime Records Bureau",
    },
    // New Questions
    {
      question: "Which technology is used for facial recognition in modern policing?",
      options: ["AI", "IoT", "Blockchain", "GIS"],
      correctAnswer: "AI",
    },
    {
      question: "Under which section of IPC is 'Theft' defined?",
      options: ["Section 378", "Section 420", "Section 302", "Section 406"],
      correctAnswer: "Section 378",
    },
    {
      question: "What is the primary role of the Central Industrial Security Force (CISF)?",
      options: ["Border protection", "Industrial security", "Counter-terrorism", "Traffic control"],
      correctAnswer: "Industrial security",
    },
    {
      question: "Which document is mandatory for registering an FIR in [STATE]?",
      options: ["Complainant’s ID", "Court order", "Witness statement", "Police permission"],
      correctAnswer: "Complainant’s ID",
    },
    {
      question: "What is the minimum age to join the Indian Police Service (IPS)?",
      options: ["21", "18", "25", "30"],
      correctAnswer: "21",
    },
    {
      question: "Which of the following is a non-cognizable offense?",
      options: ["Defamation", "Murder", "Robbery", "Kidnapping"],
      correctAnswer: "Defamation",
    },
    {
      question: "What is the role of a Station House Officer (SHO) in a police station?",
      options: ["Investigating officer", "Station in-charge", "Traffic controller", "Record keeper"],
      correctAnswer: "Station in-charge",
    },
    {
      question: "Which act regulates the use of force by police in India?",
      options: ["Police Act, 1861", "CrPC, 1973", "IPC, 1860", "Evidence Act, 1872"],
      correctAnswer: "CrPC, 1973",
    },
    {
      question: "What is the full form of SP in the police hierarchy?",
      options: ["Superintendent of Police", "Senior Police", "Special Police", "State Police"],
      correctAnswer: "Superintendent of Police",
    },
    {
      question: "Which system is used for crime data analysis in India?",
      options: ["CCTNS", "FIRMS", "CRIS", "NPRS"],
      correctAnswer: "CCTNS",
    },
  ],

  // Law Questions
  law: [
    {
      question: "Which Article of the Indian Constitution abolishes untouchability?",
      options: ["Article 17", "Article 14", "Article 21", "Article 25"],
      correctAnswer: "Article 17",
    },
    {
      question: "Under which section of IPC is the offense of 'Murder' defined?",
      options: ["Section 302", "Section 307", "Section 299", "Section 304"],
      correctAnswer: "Section 302",
    },
    {
      question: "Which of the following is a cognizable offense?",
      options: ["Murder", "Defamation", "Assault", "Cheating"],
      correctAnswer: "Murder",
    },
    {
      question: "The Right to Information Act was enacted in which year?",
      options: ["2005", "2000", "2010", "2002"],
      correctAnswer: "2005",
    },
    {
      question: "Which of the following is NOT a Fundamental Right under the Indian Constitution?",
      options: ["Right to Property", "Right to Equality", "Right to Freedom", "Right to Constitutional Remedies"],
      correctAnswer: "Right to Property",
    },
    {
      question: "Which Article of the Indian Constitution deals with the Right to Education?",
      options: ["Article 21A", "Article 19", "Article 14", "Article 32"],
      correctAnswer: "Article 21A",
    },
    {
      question: "Under which section of IPC is the offense of 'Sedition' defined?",
      options: ["Section 124A", "Section 153A", "Section 295A", "Section 499"],
      correctAnswer: "Section 124A",
    },
    {
      question: "Which of the following is NOT a type of writ under the Indian Constitution?",
      options: ["Writ of Prohibition", "Writ of Certiorari", "Writ of Mandamus", "Writ of Injunction"],
      correctAnswer: "Writ of Injunction",
    },
    {
      question: "The Consumer Protection Act was enacted in which year?",
      options: ["1986", "1991", "2000", "2019"],
      correctAnswer: "1986",
    },
    {
      question: "Which of the following is NOT a source of law in India?",
      options: ["Executive Orders", "Customs", "Precedents", "Legislation"],
      correctAnswer: "Executive Orders",
    },
    // New Questions
    {
      question: "Under which section of IPC is 'Robbery' defined?",
      options: ["Section 390", "Section 378", "Section 420", "Section 441"],
      correctAnswer: "Section 390",
    },
    {
      question: "Which court is known as the 'Guardian of the Constitution' in India?",
      options: ["Supreme Court", "High Court", "District Court", "Tribunal"],
      correctAnswer: "Supreme Court",
    },
    {
      question: "The Indian Penal Code was enacted in which year?",
      options: ["1860", "1857", "1872", "1882"],
      correctAnswer: "1860",
    },
    {
      question: "Which Article of the Indian Constitution prohibits child labor?",
      options: ["Article 24", "Article 21", "Article 23", "Article 19"],
      correctAnswer: "Article 24",
    },
    {
      question: "What is the minimum age for criminal responsibility in India?",
      options: ["7 years", "12 years", "14 years", "18 years"],
      correctAnswer: "7 years",
    },
    {
      question: "Which law governs marriage laws for Hindus in India?",
      options: ["Hindu Marriage Act, 1955", "Special Marriage Act, 1954", "Indian Divorce Act, 1869", "Family Courts Act, 1984"],
      correctAnswer: "Hindu Marriage Act, 1955",
    },
    {
      question: "Under which section of CrPC is bail defined?",
      options: ["Section 437", "Section 439", "Section 436", "Section 438"],
      correctAnswer: "Section 436",
    },
    {
      question: "Which act protects women from domestic violence in India?",
      options: ["Domestic Violence Act, 2005", "Dowry Prohibition Act, 1961", "IPC, 1860", "CrPC, 1973"],
      correctAnswer: "Domestic Violence Act, 2005",
    },
    {
      question: "Which of the following is a bailable offense?",
      options: ["Simple hurt", "Murder", "Rape", "Dacoity"],
      correctAnswer: "Simple hurt",
    },
    {
      question: "The Indian Evidence Act was enacted in which year?",
      options: ["1872", "1860", "1882", "1891"],
      correctAnswer: "1872",
    },
  ],

  // Constitution Questions
  constitution: [
    {
      question: "Who is known as the 'Father of the Indian Constitution'?",
      options: ["Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel"],
      correctAnswer: "Dr. B.R. Ambedkar",
    },
    {
      question: "How many Fundamental Rights are guaranteed by the Indian Constitution?",
      options: ["6", "7", "5", "8"],
      correctAnswer: "6",
    },
    {
      question: "Which part of the Indian Constitution deals with Fundamental Rights?",
      options: ["Part III", "Part IV", "Part II", "Part V"],
      correctAnswer: "Part III",
    },
    {
      question: "The Preamble to the Indian Constitution was amended by which Constitutional Amendment?",
      options: ["42nd Amendment", "44th Amendment", "73rd Amendment", "86th Amendment"],
      correctAnswer: "42nd Amendment",
    },
    {
      question: "Which Article of the Indian Constitution provides for the appointment of the Prime Minister?",
      options: ["Article 75", "Article 74", "Article 76", "Article 78"],
      correctAnswer: "Article 75",
    },
    {
      question: "Which Schedule of the Indian Constitution deals with the official languages?",
      options: ["Eighth Schedule", "Seventh Schedule", "Ninth Schedule", "Tenth Schedule"],
      correctAnswer: "Eighth Schedule",
    },
    {
      question: "How many Articles were there in the original Constitution of India?",
      options: ["395", "448", "350", "400"],
      correctAnswer: "395",
    },
    {
      question: "Which Article of the Indian Constitution abolishes the practice of untouchability?",
      options: ["Article 17", "Article 15", "Article 14", "Article 16"],
      correctAnswer: "Article 17",
    },
    {
      question: "The Constitution of India came into force on:",
      options: ["26th January 1950", "15th August 1947", "26th November 1949", "30th January 1948"],
      correctAnswer: "26th January 1950",
    },
    {
      question: "Which part of the Indian Constitution deals with the Directive Principles of State Policy?",
      options: ["Part IV", "Part III", "Part V", "Part VI"],
      correctAnswer: "Part IV",
    },
    // New Questions
    {
      question: "Which Article of the Indian Constitution defines the Right to Equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correctAnswer: "Article 14",
    },
    {
      question: "Who is the head of the Council of Ministers in India?",
      options: ["Prime Minister", "President", "Vice President", "Chief Justice"],
      correctAnswer: "Prime Minister",
    },
    {
      question: "Which Schedule of the Indian Constitution lists the states and union territories?",
      options: ["First Schedule", "Second Schedule", "Third Schedule", "Fourth Schedule"],
      correctAnswer: "First Schedule",
    },
    {
      question: "Which Article of the Indian Constitution provides for the formation of new states?",
      options: ["Article 3", "Article 4", "Article 2", "Article 5"],
      correctAnswer: "Article 3",
    },
    {
      question: "The Indian Constitution was drafted by a committee chaired by whom?",
      options: ["Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel", "Rajendra Prasad"],
      correctAnswer: "Dr. B.R. Ambedkar",
    },
    {
      question: "Which part of the Indian Constitution deals with the Union Executive?",
      options: ["Part V", "Part III", "Part IV", "Part VI"],
      correctAnswer: "Part V",
    },
    {
      question: "Which Article of the Indian Constitution allows for the suspension of Fundamental Rights during an emergency?",
      options: ["Article 359", "Article 356", "Article 352", "Article 360"],
      correctAnswer: "Article 359",
    },
    {
      question: "How many schedules are there in the Indian Constitution?",
      options: ["12", "10", "8", "14"],
      correctAnswer: "12",
    },
    {
      question: "Which Article of the Indian Constitution deals with the Right to Constitutional Remedies?",
      options: ["Article 32", "Article 21", "Article 19", "Article 14"],
      correctAnswer: "Article 32",
    },
    {
      question: "The term 'Secular' was added to the Preamble by which amendment?",
      options: ["42nd Amendment", "44th Amendment", "86th Amendment", "73rd Amendment"],
      correctAnswer: "42nd Amendment",
    },
  ],

  // Mathematics Questions
  arithmetic: [
    {
      question:
        "If [NUM1] men can complete a work in [NUM2] days, how many men are required to complete the same work in [NUM3] days?",
      options: ["[ANS1]", "[ANS2]", "[ANS3]", "[ANS4]"],
      correctAnswer: "[ANS1]",
    },
    {
      question:
        "A train running at [SPEED] km/hr crosses a platform of length [LENGTH] meters in [TIME] seconds. What is the length of the train?",
      options: ["[ANS1] meters", "[ANS2] meters", "[ANS3] meters", "[ANS4] meters"],
      correctAnswer: "[ANS1] meters",
    },
    {
      question:
        "If the simple interest on a sum of money at [RATE]% per annum for [YEARS] years is Rs. [INTEREST], what is the principal amount?",
      options: ["Rs. [ANS1]", "Rs. [ANS2]", "Rs. [ANS3]", "Rs. [ANS4]"],
      correctAnswer: "Rs. [ANS1]",
    },
    {
      question: "The average of 5 consecutive numbers is 27. What is the largest of these numbers?",
      options: ["29", "30", "31", "28"],
      correctAnswer: "29",
    },
    {
      question:
        "A shopkeeper gives a discount of 10% on the marked price and still makes a profit of 20%. If the cost price is Rs. 600, what is the marked price?",
      options: ["Rs. 800", "Rs. 900", "Rs. 750", "Rs. 720"],
      correctAnswer: "Rs. 800",
    },
    {
      question:
        "If [NUM1] workers can complete a task in [NUM2] days, how many workers are needed to complete it in [NUM3] days?",
      options: ["[ANS1]", "[ANS2]", "[ANS3]", "[ANS4]"],
      correctAnswer: "[ANS1]",
    },
    {
      question: "What is the compound interest on Rs. 10,000 at 10% per annum for 2 years?",
      options: ["Rs. 2,100", "Rs. 2,000", "Rs. 2,200", "Rs. 2,500"],
      correctAnswer: "Rs. 100",
    },
    {
      question:
        "If the cost price of 15 articles is equal to the selling price of 12 articles, what is the profit percentage?",
      options: ["25%", "20%", "30%", "15%"],
      correctAnswer: "25%",
    },
    {
      question: "A car travels 150 km in 3 hours. What is its speed in meters per second?",
      options: ["13.89 m/s", "15 m/s", "12.5 m/s", "41.67 m/s"],
      correctAnswer: "13.89 m/s",
    },
    {
      question: "If a : b = 2 : 3 and b : c = 4 : 5, then a : c = ?",
      options: ["8 : 15", "2 : 5", "4 : 5", "3 : 5"],
      correctAnswer: "8 : 15",
    },
    // New Questions
    {
      question: "What is 25% of 400?",
      options: ["100", "75", "125", "150"],
      correctAnswer: "100",
    },
    {
      question: "If a boat travels 60 km in 4 hours, what is its speed in km/h?",
      options: ["15 km/h", "12 km/h", "20 km/h", "18 km/h"],
      correctAnswer: "15 km/h",
    },
    {
      question: "The LCM of 12 and 15 is:",
      options: ["60", "45", "30", "75"],
      correctAnswer: "60",
    },
    {
      question: "If [NUM1] pens cost Rs. [NUM2], how much will [NUM3] pens cost?",
      options: ["Rs. [ANS1]", "Rs. [ANS2]", "Rs. [ANS3]", "Rs. [ANS4]"],
      correctAnswer: "Rs. [ANS1]",
    },
    {
      question: "What is the simple interest on Rs. 8000 at 5% per annum for 3 years?",
      options: ["Rs. 1200", "Rs. 1500", "Rs. 1000", "Rs. 1800"],
      correctAnswer: "Rs. 1200",
    },
    {
      question: "If the ratio of ages of A and B is 3:5 and B’s age is 25 years, what is A’s age?",
      options: ["15 years", "18 years", "20 years", "12 years"],
      correctAnswer: "15 years",
    },
    {
      question: "A shopkeeper sells an item for Rs. 720 and incurs a loss of 10%. What is the cost price?",
      options: ["Rs. 800", "Rs. 750", "Rs. 900", "Rs. 850"],
      correctAnswer: "Rs. 800",
    },
    {
      question: "What is the HCF of 24 and 36?",
      options: ["12", "6", "8", "18"],
      correctAnswer: "12",
    },
    {
      question: "A man completes a journey in 10 hours at 60 km/h. What is the distance?",
      options: ["600 km", "500 km", "700 km", "550 km"],
      correctAnswer: "600 km",
    },
    {
      question: "If 4 kg of rice costs Rs. 120, what is the cost of 7 kg?",
      options: ["Rs. 210", "Rs. 200", "Rs. 180", "Rs. 240"],
      correctAnswer: "Rs. 210",
    },
  ],

  // Algebra Questions
  algebra: [
    {
      question: "Solve for x: 3x - 7 = 14",
      options: ["x = 7", "x = 8", "x = 6", "x = 9"],
      correctAnswer: "x = 7",
    },
    {
      question: "If a² - b² = 9 and a + b = 3, then what is the value of a - b?",
      options: ["3", "6", "9", "1"],
      correctAnswer: "3",
    },
    {
      question: "Factorize: x² - 5x + 6",
      options: ["(x - 2)(x - 3)", "(x - 1)(x - 6)", "(x - 3)(x - 2)", "(x + 2)(x + 3)"],
      correctAnswer: "(x - 2)(x - 3)",
    },
    {
      question: "If x + y = 10 and xy = 21, what is the value of x² + y²?",
      options: ["58", "100", "42", "79"],
      correctAnswer: "58",
    },
    {
      question: "Solve the quadratic equation: x² - 7x + 12 = 0",
      options: ["x = 3, x = 4", "x = 2, x = 5", "x = 1, x = 6", "x = -3, x = -4"],
      correctAnswer: "x = 3, x = 4",
    },
    {
      question: "If 2x + 3y = 12 and 3x - 2y = 8, what is the value of x?",
      options: ["4", "3", "2", "5"],
      correctAnswer: "4",
    },
    {
      question: "What is the value of x in the equation: log₂(x) = 3?",
      options: ["8", "6", "4", "16"],
      correctAnswer: "8",
    },
    {
      question: "If a + b + c = 10 and ab + bc + ca = 27, what is the value of a² + b² + c²?",
      options: ["46", "54", "100", "73"],
      correctAnswer: "46",
    },
    {
      question: "Simplify: (2x³y²)² ÷ (4x²y)",
      options: ["x⁴y³", "x⁶y⁴", "x⁴y⁴", "x²y³"],
      correctAnswer: "x⁴y³",
    },
    {
      question: "If f(x) = x² - 3x + 2, what is the value of f(2)?",
      options: ["0", "1", "2", "4"],
      correctAnswer: "0",
    },
    // New Questions
    {
      question: "Solve for x: 5x + 3 = 28",
      options: ["x = 5", "x = 6", "x = 4", "x = 7"],
      correctAnswer: "x = 5",
    },
    {
      question: "If x² + 5x + 6 = 0, what are the roots?",
      options: ["x = -2, x = -3", "x = 2, x = 3", "x = -1, x = -6", "x = 1, x = 6"],
      correctAnswer: "x = -2, x = -3",
    },
    {
      question: "Simplify: (3a²b)³ ÷ (9a⁴b²)",
      options: ["a²b", "ab", "a²b²", "ab²"],
      correctAnswer: "ab",
    },
    {
      question: "If x + 1/x = 4, what is x² + 1/x²?",
      options: ["14", "12", "16", "10"],
      correctAnswer: "14",
    },
    {
      question: "What is the value of k if (x - 2) is a factor of x² - kx + 8?",
      options: ["6", "4", "8", "2"],
      correctAnswer: "6",
    },
    {
      question: "Solve for x and y: x + y = 7, x - y = 3",
      options: ["x = 5, y = 2", "x = 4, y = 3", "x = 6, y = 1", "x = 3, y = 4"],
      correctAnswer: "x = 5, y = 2",
    },
    {
      question: "What is the value of log₁₀(1000)?",
      options: ["3", "2", "4", "1"],
      correctAnswer: "3",
    },
    {
      question: "If (x - 1)(x + 2) = x² + kx - 2, what is k?",
      options: ["1", "-1", "2", "-2"],
      correctAnswer: "1",
    },
    {
      question: "What is the sum of the roots of x² - 8x + 15 = 0?",
      options: ["8", "6", "10", "4"],
      correctAnswer: "8",
    },
    {
      question: "Simplify: (4x²y) ÷ (2xy²)",
      options: ["2x/y", "2y/x", "x/y", "y/x"],
      correctAnswer: "2x/y",
    },
  ],

  // English Questions
  grammar: [
    {
      question: "Choose the correct form of the verb: She [BLANK] to the market yesterday.",
      options: ["go", "goes", "went", "gone"],
      correctAnswer: "went",
    },
    {
      question: "Identify the part of speech of the underlined word: The [WORD] dog barked loudly.",
      options: ["Noun", "Pronoun", "Adjective", "Adverb"],
      correctAnswer: "Adjective",
    },
    {
      question: "Choose the correct synonym of '[WORD]':",
      options: ["[SYN1]", "[SYN2]", "[SYN3]", "[SYN4]"],
      correctAnswer: "[SYN1]",
    },
    {
      question: "Choose the correct article: I saw ____ one-eyed man at the park.",
      options: ["a", "an", "the", "no article needed"],
      correctAnswer: "a",
    },
    {
      question: "Identify the tense: She has been working here since 2010.",
      options: ["Present Perfect Continuous", "Present Perfect", "Past Perfect", "Simple Present"],
      correctAnswer: "Present Perfect Continuous",
    },
    {
      question: "Choose the correct preposition: The book is ____ the table.",
      options: ["on", "in", "at", "by"],
      correctAnswer: "on",
    },
    {
      question: "Identify the type of sentence: How beautiful the sunset is!",
      options: ["Exclamatory", "Interrogative", "Imperative", "Declarative"],
      correctAnswer: "Exclamatory",
    },
    {
      question: "Choose the correct plural form of 'child':",
      options: ["children", "childs", "childrens", "child"],
      correctAnswer: "children",
    },
    {
      question: "Identify the passive voice: The cake was baked by Mary.",
      options: ["Passive Voice", "Active Voice", "Present Participle", "Past Participle"],
      correctAnswer: "Passive Voice",
    },
    {
      question: "Choose the correct conjunction: I wanted to go out, ____ it was raining.",
      options: ["but", "and", "or", "so"],
      correctAnswer: "but",
    },
    // New Questions
    {
      question: "Choose the correct form of the verb: They ___ playing football now.",
      options: ["is", "are", "was", "were"],
      correctAnswer: "are",
    },
    {
      question: "Identify the error: He don’t like to read books.",
      options: ["don’t", "like", "read", "books"],
      correctAnswer: "don’t",
    },
    {
      question: "Choose the correct article: She is ___ honest person.",
      options: ["a", "an", "the", "no article needed"],
      correctAnswer: "an",
    },
    {
      question: "What is the past participle of 'sing'?",
      options: ["sang", "sung", "singing", "sing"],
      correctAnswer: "sung",
    },
    {
      question: "Choose the correct preposition: We will meet ___ 5 PM.",
      options: ["at", "on", "in", "by"],
      correctAnswer: "at",
    },
    {
      question: "Identify the type of sentence: Please close the door.",
      options: ["Imperative", "Declarative", "Exclamatory", "Interrogative"],
      correctAnswer: "Imperative",
    },
    {
      question: "Choose the correct form: The book ___ by the students.",
      options: ["is read", "are read", "read", "reading"],
      correctAnswer: "is read",
    },
    {
      question: "What is the plural of 'mouse'?",
      options: ["mice", "mouses", "mouse", "mices"],
      correctAnswer: "mice",
    },
    {
      question: "Identify the pronoun: She gave him a gift.",
      options: ["gave", "gift", "him", "a"],
      correctAnswer: "him",
    },
    {
      question: "Choose the correct conjunction: I can stay, ___ I must leave soon.",
      options: ["but", "and", "or", "so"],
      correctAnswer: "but",
    },
  ],

  // Vocabulary Questions
  vocabulary: [
    {
      question: "Choose the correct meaning of the word 'Ambiguous':",
      options: ["Unclear or having multiple meanings", "Clear and precise", "Ambitious", "Careful"],
      correctAnswer: "Unclear or having multiple meanings",
    },
    {
      question: "Choose the correct antonym of 'Benevolent':",
      options: ["Malevolent", "Generous", "Kind", "Charitable"],
      correctAnswer: "Malevolent",
    },
    {
      question: "Choose the word that is spelled correctly:",
      options: ["Accommodate", "Acommodate", "Accomodate", "Acomodate"],
      correctAnswer: "Accommodate",
    },
    {
      question: "Choose the correct meaning of the idiom 'To bite the dust':",
      options: ["To be defeated", "To die", "To eat dirt", "To be humiliated"],
      correctAnswer: "To be defeated",
    },
    {
      question: "Choose the word that is closest in meaning to 'Frugal':",
      options: ["Economical", "Wasteful", "Generous", "Extravagant"],
      correctAnswer: "Economical",
    },
    {
      question: "Choose the correct antonym of 'Verbose':",
      options: ["Concise", "Lengthy", "Wordy", "Detailed"],
      correctAnswer: "Concise",
    },
    {
      question: "Choose the word that is spelled correctly:",
      options: ["Necessary", "Neccessary", "Necesary", "Neccesary"],
      correctAnswer: "Necessary",
    },
    {
      question: "Choose the correct meaning of the idiom 'To hit the nail on the head':",
      options: ["To do or say exactly the right thing", "To hurt oneself", "To build something", "To be angry"],
      correctAnswer: "To do or say exactly the right thing",
    },
    {
      question: "Choose the word that is closest in meaning to 'Diligent':",
      options: ["Hardworking", "Lazy", "Careless", "Intelligent"],
      correctAnswer: "Hardworking",
    },
    {
      question: "Choose the correct antonym of 'Ephemeral':",
      options: ["Permanent", "Temporary", "Fleeting", "Transient"],
      correctAnswer: "Permanent",
    },
    // New Questions
    {
      question: "Choose the correct meaning of 'Candid':",
      options: ["Honest and straightforward", "Deceptive", "Secretive", "Confusing"],
      correctAnswer: "Honest and straightforward",
    },
    {
      question: "Choose the correct antonym of 'Vivid':",
      options: ["Dull", "Bright", "Colorful", "Clear"],
      correctAnswer: "Dull",
    },
    {
      question: "Choose the word that is spelled correctly:",
      options: ["Privilege", "Privilage", "Priviledge", "Privelege"],
      correctAnswer: "Privilege",
    },
    {
      question: "Choose the correct meaning of the idiom 'To spill the beans':",
      options: ["To reveal a secret", "To make a mess", "To cook food", "To waste money"],
      correctAnswer: "To reveal a secret",
    },
    {
      question: "Choose the word closest in meaning to 'Resilient':",
      options: ["Adaptable", "Fragile", "Weak", "Rigid"],
      correctAnswer: "Adaptable",
    },
    {
      question: "Choose the correct antonym of 'Obscure':",
      options: ["Clear", "Hidden", "Vague", "Unknown"],
      correctAnswer: "Clear",
    },
    {
      question: "Choose the word that is spelled correctly:",
      options: ["Separate", "Seperate", "Seperete", "Separete"],
      correctAnswer: "Separate",
    },
    {
      question: "Choose the correct meaning of the idiom 'A piece of cake':",
      options: ["Something very easy", "A delicious dessert", "A difficult task", "A rare opportunity"],
      correctAnswer: "Something very easy",
    },
    {
      question: "Choose the word closest in meaning to 'Pragmatic':",
      options: ["Practical", "Idealistic", "Emotional", "Theoretical"],
      correctAnswer: "Practical",
    },
    {
      question: "Choose the correct antonym of 'Zealous':",
      options: ["Indifferent", "Enthusiastic", "Passionate", "Dedicated"],
      correctAnswer: "Indifferent",
    },
  ],

  // Reasoning Questions
  "logical-reasoning": [
    {
      question: "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
      options: ["Uncle", "Father", "Grandfather", "Brother"],
      correctAnswer: "Uncle",
    },
    {
      question: "Complete the series: 2, 6, 12, 20, [BLANK]",
      options: ["30", "32", "36", "42"],
      correctAnswer: "30",
    },
    {
      question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
      options: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBQH"],
      correctAnswer: "EDRIRL",
    },
    {
      question:
        "In a row of children, Rahul is 7th from the left and Mohan is 5th from the right. If they interchange their positions, Rahul becomes 11th from the left. How many children are there in the row?",
      options: ["15", "16", "17", "18"],
      correctAnswer: "17",
    },
    {
      question: "If 'MOUSE' is written as 'PRUQC', then how is 'KEYBOARD' written in that code?",
      options: ["ICZBPYSE", "ICZAPYRD", "JDZCPZSE", "JDZAPYRD"],
      correctAnswer: "ICZBPYSE",
    },
    {
      question: "If 'CAT' is coded as '312', how would 'DOG' be coded?",
      options: ["415", "514", "451", "541"],
      correctAnswer: "415",
    },
    {
      question: "Complete the analogy: Hand : Glove :: Foot : ?",
      options: ["Sock", "Shoe", "Leg", "Toe"],
      correctAnswer: "Shoe",
    },
    {
      question: "If all Roses are Flowers and all Flowers are Plants, which of the following is definitely true?",
      options: ["All Roses are Plants", "All Plants are Flowers", "All Plants are Roses", "None of these"],
      correctAnswer: "All Roses are Plants",
    },
    {
      question: "Find the odd one out: 16, 25, 36, 49, 64, 81, 100",
      options: ["49", "64", "81", "100"],
      completeAnswer: "49",
    },
    {
      question: "If 'DELHI' is coded as '73541', how would 'MUMBAI' be coded?",
      options: ["13129185", "13129815", "13192815", "13192185"],
      correctAnswer: "13129185",
    },
    // New Questions
    {
      question: "Complete the series: 3, 8, 15, 24, ?",
      options: ["35", "36", "37", "38"],
      correctAnswer: "35",
    },
    {
      question: "If 'BOOK' is coded as 'CPPL', how is 'PAGE' coded?",
      options: ["QBIJ", "RCKJ", "SDLI", "TEOJ"],
      correctAnswer: "QBIJ",
    },
    {
      question: "If P is the sister of Q, R is the brother of Q, and S is the father of P, how is S related to R?",
      options: ["Father", "Brother", "Son", "Husband"],
      correctAnswer: "Father",
    },
    {
      question: "Find the odd one out: 4, 9, 16, 25, 35",
      options: ["4", "9", "16", "35"],
      correctAnswer: "35",
    },
    {
      question: "If 'SUN' is coded as 'TVO', how is 'MOON' coded?",
      options: ["NPPQ", "OQQR", "PRRS", "QSSP"],
      correctAnswer: "NPPQ",
    },
    {
      question: "Complete the analogy: Pen : Paper :: Knife : ?",
      options: ["Kitchen", "Blade", "Vegetable", "Table"],
      correctAnswer: "Vegetable",
    },
    {
      question: "If the day after tomorrow is Wednesday, what day is today?",
      options: ["Monday", "Tuesday", "Sunday", "Friday"],
      correctAnswer: "Monday",
    },
    {
      question: "How many letters are there between F and K in the alphabet?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "5",
    },
    {
      question: "If 'APPLE' is coded as '23116', how is 'GRAPE' coded?",
      options: ["718165", "78165", "718156", "78156"],
      correctAnswer: "78165",
    },
    {
      question: "Complete the series: A, D, I, I, ?",
      options: ["I", "J", "K", "M"],
      correctAnswer: "I",
    },
  ],

  // Teaching Methods Questions
  "teaching-methods": [
    {
      question: "Which of the following is NOT a characteristic of the project method of teaching?",
      options: ["Teacher-centered approach", "Learning by doing", "Problem-solving", "Real-life application"],
      correctAnswer: "Teacher-centered approach",
    },
    {
      question: "The concept of 'Zone of Proximal Development' was proposed by:",
      options: ["Lev Vygotsky", "Jean Piaget", "B.F. Skinner", "John Dewey"],
      correctAnswer: "Lev Vygotsky",
    },
    {
      question: "Which teaching method is most suitable for developing critical thinking skills?",
      options: ["Discussion method", "Lecture method", "Demonstration method", "Drill method"],
      correctAnswer: "Discussion method",
    },
    {
      question: "Bloom's Taxonomy categorizes cognitive learning objectives into how many levels?",
      options: ["6", "5", "7", "4"],
      correctAnswer: "6",
    },
    {
      question: "Which of the following is an example of formative assessment?",
      options: ["Class quiz", "Final examination", "End-of-year test", "Board examination"],
      correctAnswer: "Class quiz",
    },
    {
      question: "Which of the following is NOT a principle of constructivist teaching?",
      options: ["Rote memorization", "Active learning", "Collaborative learning", "Reflective learning"],
      correctAnswer: "Rote memorization",
    },
    {
      question: "The 'Flipped Classroom' approach involves:",
      options: [
        "Students learning content at home and practicing in class",
        "Teachers lecturing in class and students practicing at home",
        "Students teaching other students",
        "Teachers flipping between different subjects",
      ],
      correctAnswer: "Students learning content at home and practicing in class",
    },
    {
      question: "Which of the following is NOT a characteristic of the inquiry-based learning method?",
      options: [
        "Teacher provides all the answers",
        "Students ask questions",
        "Students investigate to find answers",
        "Students construct their own understanding",
      ],
      correctAnswer: "Teacher provides all the answers",
    },
    {
      question: "The concept of 'Multiple Intelligences' was proposed by:",
      options: ["Howard Gardner", "B.F. Skinner", "Jean Piaget", "Lev Vygotsky"],
      correctAnswer: "Howard Gardner",
    },
    {
      question: "Which of the following is NOT a type of cooperative learning strategy?",
      options: ["Individual competition", "Think-Pair-Share", "Jigsaw", "Numbered Heads Together"],
      correctAnswer: "Individual competition",
    },
    // New Questions
    {
      question: "Which teaching method emphasizes learning through hands-on activities?",
      options: ["Experiential learning", "Lecture method", "Drill method", "Direct instruction"],
      correctAnswer: "Experiential learning",
    },
    {
      question: "Who proposed the 'Taxonomy of Educational Objectives'?",
      options: ["Benjamin Bloom", "John Dewey", "Lev Vygotsky", "Jean Piaget"],
      correctAnswer: "Benjamin Bloom",
    },
    {
      question: "Which method involves students working in small groups to achieve a common goal?",
      options: ["Cooperative learning", "Lecture method", "Demonstration method", "Individual study"],
      correctAnswer: "Cooperative learning",
    },
    {
      question: "What is the primary focus of the Montessori method?",
      options: ["Child-centered learning", "Teacher-centered instruction", "Standardized testing", "Rote memorization"],
      correctAnswer: "Child-centered learning",
    },
    {
      question: "Which assessment evaluates a student’s performance at the end of a course?",
      options: ["Summative assessment", "Formative assessment", "Diagnostic assessment", "Continuous assessment"],
      correctAnswer: "Summative assessment",
    },
    {
      question: "Which teaching strategy involves posing open-ended questions to stimulate thinking?",
      options: ["Socratic method", "Lecture method", "Drill method", "Direct instruction"],
      correctAnswer: "Socratic method",
    },
    {
      question: "Which of the following is NOT a feature of problem-based learning?",
      options: ["Teacher-led lectures", "Real-world problems", "Collaborative learning", "Student inquiry"],
      correctAnswer: "Teacher-led lectures",
    },
    {
      question: "The concept of ‘Discovery Learning’ was proposed by whom?",
      options: ["Jerome Bruner", "B.F. Skinner", "Howard Gardner", "Lev Vygotsky"],
      correctAnswer: "Jerome Bruner",
    },
    {
      question: "Which teaching method uses technology to enhance learning?",
      options: ["Blended learning", "Lecture method", "Drill method", "Recitation method"],
      correctAnswer: "Blended learning",
    },
    {
      question: "Which of the following is a key feature of differentiated instruction?",
      options: ["Tailoring content to student needs", "Uniform teaching for all", "Standardized tests", "Teacher-centered approach"],
      correctAnswer: "Tailoring content to student needs",
    },
  ],

  // Child Development Questions
  "child-development": [
    {
      question: "According to Piaget, the 'Concrete Operational Stage' occurs between which ages?",
      options: ["7-11 years", "2-7 years", "11-15 years", "0-2 years"],
      correctAnswer: "7-11 years",
    },
    {
      question: "Which of the following is NOT a characteristic of the pre-operational stage of cognitive development?",
      options: ["Conservation", "Egocentrism", "Animism", "Symbolic thinking"],
      correctAnswer: "Conservation",
    },
    {
      question: "The concept of 'Attachment Theory' was developed by:",
      options: ["John Bowlby", "Erik Erikson", "B.F. Skinner", "Jean Piaget"],
      correctAnswer: "John Bowlby",
    },
    {
      question: "Which of the following is a fine motor skill?",
      options: ["Using scissors", "Running", "Jumping", "Climbing stairs"],
      correctAnswer: "Using scissors",
    },
    {
      question: "According to Erikson, the psychosocial crisis of adolescence is:",
      options: [
        "Identity vs. Role Confusion",
        "Industry vs. Inferiority",
        "Initiative vs. Guilt",
        "Trust vs. Mistrust",
      ],
      correctAnswer: "Identity vs. Role Confusion",
    },
    {
      question: "Which of the following is NOT a stage in Kohlberg's theory of moral development?",
      options: ["Sensorimotor stage", "Pre-conventional stage", "Conventional stage", "Post-conventional stage"],
      correctAnswer: "Sensorimotor stage",
    },
    {
      question: "The concept of 'Scaffolding' in child development is associated with:",
      options: ["Lev Vygotsky", "Jean Piaget", "B.F. Skinner", "Sigmund Freud"],
      correctAnswer: "Lev Vygotsky",
    },
    {
      question: "Which of the following is NOT a characteristic of secure attachment in infants?",
      options: [
        "Avoidance of the caregiver",
        "Using the caregiver as a secure base",
        "Seeking comfort from the caregiver when distressed",
        "Exploring the environment when the caregiver is present",
      ],
      correctAnswer: "Avoidance of the caregiver",
    },
    {
      question:
        "According to Piaget, the process of adjusting existing schemas to incorporate new information is called:",
      options: ["Accommodation", "Assimilation", "Adaptation", "Organization"],
      correctAnswer: "Accommodation",
    },
    {
      question: "Which of the following is NOT a characteristic of authoritative parenting?",
      options: [
        "Strict rules with no explanation",
        "High expectations",
        "Warmth and responsiveness",
        "Clear boundaries",
      ],
      correctAnswer: "Strict rules with no explanation",
    },
    // New Questions
    {
      question: "According to Piaget, the 'Formal Operational Stage' begins at what age?",
      options: ["11 years", "7 years", "2 years", "15 years"],
      correctAnswer: "11 years",
    },
    {
      question: "Which of the following is a gross motor skill?",
      options: ["Running", "Writing", "Drawing", "Buttoning a shirt"],
      correctAnswer: "Running",
    },
    {
      question: "Who developed the theory of psychosocial development with eight stages?",
      options: ["Erik Erikson", "Jean Piaget", "Sigmund Freud", "John Bowlby"],
      correctAnswer: "Erik Erikson",
    },
    {
      question: "Which of the following is a characteristic of the sensorimotor stage?",
      options: ["Object permanence", "Conservation", "Abstract thinking", "Egocentrism"],
      correctAnswer: "Object permanence",
    },
    {
      question: "According to Kohlberg, the highest level of moral development is:",
      options: ["Post-conventional", "Conventional", "Pre-conventional", "Operational"],
      correctAnswer: "Post-conventional",
    },
    {
      question: "Which parenting style is characterized by high demands and low responsiveness?",
      options: ["Authoritarian", "Authoritative", "Permissive", "Neglectful"],
      correctAnswer: "Authoritarian",
    },
    {
      question: "The process of incorporating new information into existing schemas is called:",
      options: ["Assimilation", "Accommodation", "Adaptation", "Equilibration"],
      correctAnswer: "Assimilation",
    },
    {
      question: "Which of the following is NOT a stage in Erikson’s psychosocial theory?",
      options: ["Concrete operations", "Trust vs. Mistrust", "Autonomy vs. Shame", "Generativity vs. Stagnation"],
      correctAnswer: "Concrete operations",
    },
    {
      question: "Who proposed the concept of ‘Moral Development’ with three levels?",
      options: ["Lawrence Kohlberg", "Jean Piaget", "Erik Erikson", "Sigmund Freud"],
      correctAnswer: "Lawrence Kohlberg",
    },
    {
      question: "Which attachment style involves distress when the caregiver leaves?",
      options: ["Secure", "Avoidant", "Ambivalent", "Disorganized"],
      correctAnswer: "Ambivalent",
    },
  ],

  // Computer Knowledge Questions
  "ms-office": [
    {
      question: "Which of the following is NOT a component of Microsoft Office?",
      options: ["Photoshop", "Excel", "PowerPoint", "Word"],
      correctAnswer: "Photoshop",
    },
    {
      question: "In Microsoft Excel, what does the function VLOOKUP do?",
      options: [
        "Searches for a value in the first column and returns a value in the same row",
        "Searches for a value in any column",
        "Sorts data in ascending order",
        "Counts the number of cells with values",
      ],
      correctAnswer: "Searches for a value in the first column and returns a value in the same row",
    },
    {
      question: "Which shortcut key is used to save a document in Microsoft Word?",
      options: ["Ctrl+S", "Ctrl+P", "Ctrl+C", "Ctrl+V"],
      correctAnswer: "Ctrl+S",
    },
    {
      question: "Which view in PowerPoint displays each slide as a thumbnail?",
      options: ["Slide Sorter View", "Normal View", "Reading View", "Slide Show View"],
      correctAnswer: "Slide Sorter View",
    },
    {
      question: "In Microsoft Excel, which function is used to count the number of cells that contain numbers?",
      options: ["COUNT", "SUM", "AVERAGE", "MAX"],
      correctAnswer: "COUNT",
    },
    {
      question: "Which of the following is NOT a chart type in Microsoft Excel?",
      options: ["Holographic Chart", "Pie Chart", "Bar Chart", "Line Chart"],
      correctAnswer: "Holographic Chart",
    },
    {
      question: "In Microsoft Word, what is the default file extension for documents?",
      options: [".docx", ".doc", ".txt", ".rtf"],
      correctAnswer: ".docx",
    },
    {
      question: "Which function in Excel returns the largest value in a range of cells?",
      options: ["MAX", "LARGE", "TOP", "HIGHEST"],
      correctAnswer: "MAX",
    },
    {
      question: "In Microsoft PowerPoint, what is the keyboard shortcut to start a slide show from the beginning?",
      options: ["F5", "F1", "Ctrl+F5", "Alt+F5"],
      completeAnswer: "F5",
    },
    {
      question: "Which of the following is NOT a type of page orientation in Microsoft Word?",
      options: ["Diagonal", "Portrait", "Landscape", "Custom"],
      correctAnswer: "Diagonal",
    },
    // New Questions
    {
      question: "Which Microsoft Word feature is used to create a table of contents?",
      options: ["References", "Insert", "Home", "View"],
      correctAnswer: "References",
    },
    {
      question: "In Excel, which function calculates the average of a range of cells?",
      options: ["AVERAGE", "MEAN", "SUM", "MEDIAN"],
      correctAnswer: "AVERAGE",
    },
    {
      question: "Which shortcut key is used to undo an action in Microsoft Word?",
      options: ["Ctrl+Z", "Ctrl+Y", "Ctrl+X", "Ctrl+V"],
      correctAnswer: "Ctrl+Z",
    },
    {
      question: "In PowerPoint, which tab is used to add animations to slides?",
      options: ["Animations", "Transitions", "Insert", "Design"],
      correctAnswer: "Animations",
    },
    {
      question: "In Excel, what does the SUMIF function do?",
      options: [
        "Sums values based on a condition",
        "Sums all values in a range",
        "Counts cells with values",
        "Finds the maximum value",
      ],
      correctAnswer: "Sums values based on a condition",
    },
    {
      question: "Which Microsoft Word feature checks spelling and grammar?",
      options: ["Review", "Home", "Insert", "Layout"],
      correctAnswer: "Review",
    },
    {
      question: "In Excel, what is the default file extension for workbooks?",
      options: [".xlsx", ".xls", ".csv", ".txt"],
      correctAnswer: ".xlsx",
    },
    {
      question: "Which PowerPoint feature allows you to rehearse timings for a presentation?",
      options: ["Slide Show", "Review", "Insert", "View"],
      correctAnswer: "Slide Show",
    },
    {
      question: "In Word, which shortcut key is used to bold text?",
      options: ["Ctrl+B", "Ctrl+I", "Ctrl+U", "Ctrl+T"],
      correctAnswer: "Ctrl+B",
    },
    {
      question: "In Excel, which function rounds a number to a specified number of digits?",
      options: ["ROUND", "TRUNC", "FLOOR", "CEILING"],
      correctAnswer: "ROUND",
    },
  ],

  // Internet Questions
  internet: [
    {
      question: "What does URL stand for?",
      options: [
        "Uniform Resource Locator",
        "Universal Resource Locator",
        "Uniform Resource Link",
        "Universal Resource Link",
      ],
      correctAnswer: "Uniform Resource Locator",
    },



























``` history: [
    // Original 10 questions (as provided)
    {
      question: "The Battle of Plassey was fought in which year?",
      options: ["1757", "1764", "1775", "1748"],
      correctAnswer: "1757",
    },
    {
      question: "Who founded the Maurya Empire?",
      options: ["Chandragupta Maurya", "Ashoka", "Bindusara", "Chanakya"],
      correctAnswer: "Chandragupta Maurya",
    },
    {
      question: "The Quit India Movement was launched in which year?",
      options: ["1942", "1930", "1947", "1940"],
      correctAnswer: "1942",
    },
    {
      question: "Who was the first woman President of the Indian National Congress?",
      options: ["Annie Besant", "Sarojini Naidu", "Indira Gandhi", "Sucheta Kriplani"],
      correctAnswer: "Annie Besant",
    },
    {
      question: "The Jallianwala Bagh Massacre took place in which city?",
      options: ["Amritsar", "Lahore", "Delhi", "Lucknow"],
      correctAnswer: "Amritsar",
    },
    {
      question: "Who was the first Prime Minister of India?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Rajendra Prasad"],
      correctAnswer: "Jawaharlal Nehru",
    },
    {
      question: "The Indus Valley Civilization flourished during which period?",
      options: ["2500-1500 BCE", "1500-500 BCE", "3500-2500 BCE", "500 BCE-500 CE"],
      correctAnswer: "2500-1500 BCE",
    },
    {
      question: "Who was the last Mughal Emperor of India?",
      options: ["Bahadur Shah Zafar", "Aurangzeb", "Shah Alam II", "Akbar II"],
      correctAnswer: "Bahadur Shah Zafar",
    },
    {
      question: "The Revolt of 1857 started from which place?",
      options: ["Meerut", "Delhi", "Kanpur", "Lucknow"],
      correctAnswer: "Meerut",
    },
    {
      question: "Who was known as the 'Iron Man of India'?",
      options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
      correctAnswer: "Sardar Vallabhbhai Patel",
    },
    // 10 New Questions (from previous response)
    {
      question: "Which dynasty built the Khajuraho temples?",
      options: ["Chandela", "Pala", "Gupta", "Chola"],
      correctAnswer: "Chandela",
    },
    {
      question: "The Dandi Salt March was led by whom in 1930?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Lala Lajpat Rai"],
      correctAnswer: "Mahatma Gandhi",
    },
    {
      question: "In which year was the Indian National Congress founded?",
      options: ["1885", "1890", "1875", "1905"],
      correctAnswer: "1885",
    },
    {
      question: "Who was the first Governor-General of independent India?",
      options: ["Lord Mountbatten", "C. Rajagopalachari", "Lord Canning", "Lord Dalhousie"],
      correctAnswer: "Lord Mountbatten",
    },
    {
      question: "The Battle of Panipat in 1526 was fought between Babur and whom?",
      options: ["Ibrahim Lodi", "Rana Sanga", "Sher Shah Suri", "Hemu"],
      correctAnswer: "Ibrahim Lodi",
    },
    {
      question: "Which movement was launched by Gandhi in 1919 against the Rowlatt Act?",
      options: ["Non-Cooperation Movement", "Satyagraha Movement", "Civil Disobedience Movement", "Quit India Movement"],
      correctAnswer: "Satyagraha Movement",
    },
    {
      question: "Who authored the book 'Discovery of India'?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Rabindranath Tagore", "Subhas Chandra Bose"],
      correctAnswer: "Jawaharlal Nehru",
    },
    {
      question: "The Vijayanagara Empire was founded by whom?",
      options: ["Harihara and Bukka", "Krishnadevaraya", "Devaraya II", "Sadasiva Raya"],
      correctAnswer: "Harihara and Bukka",
    },
    {
      question: "Which British act partitioned Bengal in 1905?",
      options: ["Partition of Bengal Act", "Indian Councils Act", "Government of India Act", "Regulating Act"],
      correctAnswer: "Partition of Bengal Act",
    },
    {
      question: "Who was the leader of the Bardoli Satyagraha in 1928?",
      options: ["Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "C. Rajagopalachari"],
      correctAnswer: "Sardar Vallabhbhai Patel",
    },
  ],

  // Geography Questions (Already completed)
  geography: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity, as already provided)
  ],

  // Current Affairs Questions (Already completed)
  "current-affairs": [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Policing Questions (Already completed)
  policing: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Law Questions (Already completed)
  law: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Constitution Questions (Already completed)
  constitution: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Arithmetic Questions (Already completed)
  arithmetic: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Algebra Questions (Already completed)
  algebra: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Grammar Questions (Already completed)
  grammar: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Vocabulary Questions (Already completed)
  vocabulary: [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Logical Reasoning Questions (Already completed)
  "logical-reasoning": [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Teaching Methods Questions (Already completed)
  "teaching-methods": [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Child Development Questions (Already completed)
  "child-development": [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // MS Office Questions (Already completed)
  "ms-office": [
    // Original 10 questions + 10 new questions (from previous response)
    // ... (omitted for brevity)
  ],

  // Internet Questions (Completing the original + adding 10 new questions)
  internet: [
    // Original Questions (continuing from where previous response was cut off)
    {
      question: "What does URL stand for?",
      options: [
        "Uniform Resource Locator",
        "Universal Resource Locator",
        "Uniform Resource Link",
        "Universal Resource Link",
      ],
      correctAnswer: "Uniform Resource Locator",
    },
    {
      question: "Which of the following is NOT a web browser?",
      options: ["Microsoft Word", "Google Chrome", "Mozilla Firefox", "Safari"],
      correctAnswer: "Microsoft Word",
    },
    {
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "HyperText Transmission Protocol",
        "HighText Transfer Protocol",
        "HyperTransfer Text Protocol",
      ],
      correctAnswer: "HyperText Transfer Protocol",
    },
    {
      question: "Which protocol is used for sending emails?",
      options: ["SMTP", "FTP", "HTTP", "DNS"],
      correctAnswer: "SMTP",
    },
    {
      question: "What is the full form of HTML?",
      options: [
        "HyperText Markup Language",
        "HyperText Machine Language",
        "HighText Markup Language",
        "HyperTransfer Markup Language",
      ],
      correctAnswer: "HyperText Markup Language",
    },
    {
      question: "Which of the following is a search engine?",
      options: ["Google", "Facebook", "Twitter", "Instagram"],
      correctAnswer: "Google",
    },
    {
      question: "What does IP in IP address stand for?",
      options: ["Internet Protocol", "Internal Protocol", "International Protocol", "Integrated Protocol"],
      correctAnswer: "Internet Protocol",
    },
    {
      question: "Which of the following is used to secure websites?",
      options: ["HTTPS", "FTP", "SMTP", "DNS"],
      correctAnswer: "HTTPS",
    },
    {
      question: "What is the purpose of a firewall in internet security?",
      options: [
        "To monitor and control incoming and outgoing network traffic",
        "To store data",
        "To create websites",
        "To send emails",
      ],
      correctAnswer: "To monitor and control incoming and outgoing network traffic",
    },
    {
      question: "Which of the following is NOT an internet service provider in India?",
      options: ["Microsoft", "Jio", "Airtel", "BSNL"],
      correctAnswer: "Microsoft",
    },
    // 10 New Questions
    {
      question: "What does DNS stand for in the context of the internet?",
      options: ["Domain Name System", "Dynamic Network Service", "Digital Naming System", "Distributed Network System"],
      correctAnswer: "Domain Name System",
    },
    {
      question: "Which file format is commonly used for web images?",
      options: ["JPEG", "DOCX", "XLSX", "TXT"],
      correctAnswer: "JPEG",
    },
    {
      question: "What is the primary function of a router in a network?",
      options: ["Directs data packets between networks", "Stores web pages", "Sends emails", "Encrypts data"],
      correctAnswer: "Directs data packets between networks",
    },
    {
      question: "Which of the following is a cloud storage service?",
      options: ["Google Drive", "Mozilla Firefox", "VLC Media Player", "Notepad"],
      correctAnswer: "Google Drive",
    },
    {
      question: "What does the term 'phishing' refer to on the internet?",
      options: [
        "Fraudulent attempt to obtain sensitive information",
        "Searching for websites",
        "Downloading files",
        "Creating web pages",
      ],
      correctAnswer: "Fraudulent attempt to obtain sensitive information",
    },
    {
      question: "Which protocol is used for secure file transfers?",
      options: ["SFTP", "HTTP", "SMTP", "DNS"],
      correctAnswer: "SFTP",
    },
    {
      question: "What is the full form of WWW?",
      options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
      correctAnswer: "World Wide Web",
    },
    {
      question: "Which of the following is a social networking platform?",
      options: ["LinkedIn", "Google Docs", "Microsoft Excel", "Adobe Photoshop"],
      correctAnswer: "LinkedIn",
    },
    {
      question: "What does the term 'bandwidth' refer to in internet connectivity?",
      options: [
        "Amount of data transferred per unit time",
        "Physical length of cables",
        "Number of websites visited",
        "Storage capacity of a server",
      ],
      correctAnswer: "Amount of data transferred per unit time",
    },
    {
      question: "Which Indian government initiative promotes internet access in rural areas?",
      options: ["Digital India", "Make in India", "Swachh Bharat", "Skill India"],
      correctAnswer: "Digital India",
    },
  ],

  // Networking Questions
  networking: [
    {
      question: "What does LAN stand for?",
      options: ["Local Area Network", "Large Area Network", "Linked Area Network", "Logical Area Network"],
      completeAnswer: "Local Area Network",
    },
    {
      question: "Which device connects multiple networks together?",
      options: ["Router", "Switch", "Hub", "Modem"],
      correctAnswer: "Router",
    },
    {
      question: "What is the full form of TCP/IP?",
      options: [
        "Transmission Control Protocol/Internet Protocol",
        "Transfer Control Protocol/Internet Protocol",
        "Transmission Control Program/Internet Program",
        "Transfer Communication Protocol/Internet Protocol",
      ],
      correctAnswer: "Transmission Control Protocol/Internet Protocol",
    },
    {
      question: "Which layer of the OSI model is responsible for routing?",
      options: ["Network Layer", "Data Link Layer", "Transport Layer", "Application Layer"],
      correctAnswer: "Network Layer",
    },
    {
      question: "What is the standard port number for HTTP?",
      options: ["80", "443", "21", "25"],
      correctAnswer: "80",
    },
    {
      question: "Which of the following is a private IP address?",
      options: ["192.168.1.1", "8.8.8.8", "172.217.167.78", "208.67.222.222"],
      correctAnswer: "192.168.1.1",
    },
    {
      question: "What does DHCP stand for?",
      options: [
        "Dynamic Host Configuration Protocol",
        "Direct Host Configuration Protocol",
        "Dynamic Hyperlink Control Protocol",
        "Distributed Host Control Protocol",
      ],
      correctAnswer: "Dynamic Host Configuration Protocol",
    },
    {
      question: "Which protocol is used for network time synchronization?",
      options: ["NTP", "FTP", "SMTP", "HTTP"],
      correctAnswer: "NTP",
    },
    {
      question: "What is the maximum speed of a Cat6 Ethernet cable?",
      options: ["10 Gbps", "1 Gbps", "100 Mbps", "40 Gbps"],
      correctAnswer: "10 Gbps",
    },
    {
      question: "Which of the following is NOT a type of network topology?",
      options: ["Cloud", "Star", "Bus", "Ring"],
      correctAnswer: "Cloud",
    },
    // 10 New Questions
    {
      question: "What does MAC stand for in networking?",
      options: ["Media Access Control", "Memory Access Control", "Main Access Controller", "Multi-Area Connector"],
      correctAnswer: "Media Access Control",
    },
    {
      question: "Which device forwards data packets within a single network?",
      options: ["Switch", "Router", "Modem", "Firewall"],
      correctAnswer: "Switch",
    },
    {
      question: "What is the standard port number for HTTPS?",
      options: ["443", "80", "21", "25"],
      correctAnswer: "443",
    },
    {
      question: "Which layer of the OSI model handles data encryption?",
      options: ["Presentation Layer", "Network Layer", "Data Link Layer", "Physical Layer"],
      correctAnswer: "Presentation Layer",
    },
    {
      question: "What is the purpose of a subnet mask?",
      options: [
        "Divides an IP address into network and host portions",
        "Encrypts data packets",
        "Assigns IP addresses",
        "Routes data between networks",
      ],
      correctAnswer: "Divides an IP address into network and host portions",
    },
    {
      question: "Which protocol is used for file transfers over a network?",
      options: ["FTP", "SMTP", "DNS", "HTTP"],
      correctAnswer: "FTP",
    },
    {
      question: "What is the full form of WAN?",
      options: ["Wide Area Network", "Wireless Area Network", "World Area Network", "Web Access Network"],
      correctAnswer: "Wide Area Network",
    },
    {
      question: "Which of the following is a loopback IP address?",
      options: ["127.0.0.1", "192.168.1.1", "10.0.0.1", "172.16.0.1"],
      correctAnswer: "127.0.0.1",
    },
    {
      question: "What is the purpose of a gateway in a network?",
      options: [
        "Connects different network protocols",
        "Stores data packets",
        "Encrypts network traffic",
        "Assigns MAC addresses",
      ],
      correctAnswer: "Connects different network protocols",
    },
    {
      question: "Which Indian organization regulates telecommunication networks?",
      options: ["TRAI", "ISRO", "DRDO", "BHEL"],
      correctAnswer: "TRAI",
    },
  ],

  // Database Questions
  database: [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Sequential Query Language",
        "Standard Query Language",
        "Structured Question Language",
      ],
      correctAnswer: "Structured Query Language",
    },
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
      correctAnswer: "MongoDB",
    },
    {
      question: "What is the primary key in a database table?",
      options: [
        "A unique identifier for each record",
        "A field that can be null",
        "A duplicate field",
        "A temporary key",
      ],
      correctAnswer: "A unique identifier for each record",
    },
    {
      question: "Which SQL command is used to retrieve data from a database?",
      options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      correctAnswer: "SELECT",
    },
    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management System",
        "Database Maintenance System",
        "Data Business Management System",
      ],
      correctAnswer: "Database Management System",
    },
    {
      question: "Which of the following is NOT a type of database model?",
      options: ["Circular", "Relational", "Hierarchical", "Network"],
      correctAnswer: "Circular",
    },
    {
      question: "What is normalization in a database?",
      options: [
        "Organizing data to eliminate redundancy",
        "Adding duplicate data",
        "Deleting data",
        "Encrypting data",
      ],
      correctAnswer: "Organizing data to eliminate redundancy",
    },
    {
      question: "Which SQL command is used to add a new record to a table?",
      options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
      correctAnswer: "INSERT",
    },
    {
      question: "What is a foreign key in a database?",
      options: [
        "A field that links two tables",
        "A unique identifier",
        "A temporary key",
        "A duplicate field",
      ],
      correctAnswer: "A field that links two tables",
    },
    {
      question: "Which of the following is a relational database management system?",
      options: ["MySQL", "MongoDB", "Cassandra", "Redis"],
      correctAnswer: "MySQL",
    },
    // 10 New Questions
    {
      question: "What does ACID stand for in database transactions?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Accuracy, Completeness, Integrity, Durability",
        "Atomicity, Consistency, Integration, Durability",
        "Accuracy, Consistency, Isolation, Dependability",
      ],
      correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    },
    {
      question: "Which SQL clause is used to filter records?",
      options: ["WHERE", "SELECT", "FROM", "ORDER BY"],
      correctAnswer: "WHERE",
    },
    {
      question: "What is a view in a database?",
      options: [
        "A virtual table based on a query",
        "A physical table",
        "A backup table",
        "A temporary table",
      ],
      correctAnswer: "A virtual table based on a query",
    },
    {
      question: "Which command is used to modify an existing record in a table?",
      options: ["UPDATE", "INSERT", "DELETE", "SELECT"],
      correctAnswer: "UPDATE",
    },
    {
      question: "What is the purpose of an index in a database?",
      options: [
        "Improves query performance",
        "Stores duplicate data",
        "Encrypts data",
        "Deletes records",
      ],
      correctAnswer: "Improves query performance",
    },
    {
      question: "Which type of join returns all records from both tables?",
      options: ["FULL JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"],
      correctAnswer: "FULL JOIN",
    },
    {
      question: "What is the full form of RDBMS?",
      options: [
        "Relational Database Management System",
        "Remote Database Management System",
        "Relational Data Backup System",
        "Rapid Database Management System",
      ],
      correctAnswer: "Relational Database Management System",
    },
    {
      question: "Which SQL function calculates the total of a numeric column?",
      options: ["SUM", "COUNT", "AVG", "MAX"],
      correctAnswer: "SUM",
    },
    {
      question: "What is a trigger in a database?",
      options: [
        "An action executed automatically on an event",
        "A backup mechanism",
        "A user query",
        "A data type",
      ],
      correctAnswer: "An action executed automatically on an event",
    },
    {
      question: "Which Indian company uses SAP HANA for database management?",
      options: ["Reliance Industries", "Tata Motors", "Infosys", "Wipro"],
      correctAnswer: "Reliance Industries",
    },
  ],

  // General Computer Questions
  "general-computer": [
    {
      question: "What is the full form of CPU?",
      options: [
        "Central Processing Unit",
        "Central Programming Unit",
        "Control Processing Unit",
        "Computer Processing Unit",
      ],
      correctAnswer: "Central Processing Unit",
    },
    {
      question: "Which of the following is an input device?",
      options: ["Keyboard", "Monitor", "Printer", "Speaker"],
      correctAnswer: "Keyboard",
    },
    {
      question: "What does RAM stand for?",
      options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Run Access Memory"],
      correctAnswer: "Random Access Memory",
    },
    {
      question: "Which of the following is a storage device?",
      options: ["Hard Disk", "Mouse", "Scanner", "Joystick"],
      correctAnswer: "Hard Disk",
    },
    {
      question: "What is the full form of GUI?",
      options: [
        "Graphical User Interface",
        "General User Interface",
        "Global User Interface",
        "Guided User Interface",
      ],
      correctAnswer: "Graphical User Interface",
    },
    {
      question: "Which of the following is an operating system?",
      options: ["Windows", "Microsoft Word", "Google Chrome", "Adobe Photoshop"],
      correctAnswer: "Windows",
    },
    {
      question: "What is the binary equivalent of the decimal number 10?",
      options: ["1010", "1000", "1100", "1110"],
      correctAnswer: "1010",
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["HTML", "Python", "Java", "C++"],
      correctAnswer: "HTML",
    },
    {
      question: "What does USB stand for?",
      options: [
        "Universal Serial Bus",
        "United Serial Bus",
        "Universal Storage Bus",
        "Ultra Serial Bus",
      ],
      correctAnswer: "Universal Serial Bus",
    },
    {
      question: "Which component is known as the 'brain' of the computer?",
      options: ["CPU", "RAM", "Hard Disk", "Motherboard"],
      correctAnswer: "CPU",
    },
    // 10 New Questions
    {
      question: "What is the full form of ROM?",
      options: ["Read-Only Memory", "Random-Only Memory", "Rapid-Only Memory", "Run-Only Memory"],
      correctAnswer: "Read-Only Memory",
    },
    {
      question: "Which of the following is an output device?",
      options: ["Monitor", "Keyboard", "Mouse", "Scanner"],
      correctAnswer: "Monitor",
    },
    {
      question: "What does BIOS stand for?",
      options: [
        "Basic Input/Output System",
        "Binary Input/Output System",
        "Basic Integrated Operating System",
        "Built-In Operating System",
      ],
      correctAnswer: "Basic Input/Output System",
    },
    {
      question: "Which unit measures the speed of a processor?",
      options: ["GHz", "GB", "MB", "RPM"],
      correctAnswer: "GHz",
    },
    {
      question: "What is the full form of HDD?",
      options: [
        "Hard Disk Drive",
        "High Definition Drive",
        "Hybrid Data Drive",
        "Hardware Disk Drive",
      ],
      correctAnswer: "Hard Disk Drive",
    },
    {
      question: "Which of the following is a high-level programming language?",
      options: ["Python", "Assembly", "Machine Code", "Binary"],
      correctAnswer: "Python",
    },
    {
      question: "What is the purpose of a motherboard?",
      options: [
        "Connects all computer components",
        "Stores data",
        "Processes data",
        "Cools the system",
      ],
      correctAnswer: "Connects all computer components",
    },
    {
      question: "Which key is used to boot a computer?",
      options: ["F2", "Ctrl", "Shift", "Enter"],
      correctAnswer: "F2",
    },
    {
      question: "What is the full form of SSD?",
      options: [
        "Solid State Drive",
        "Serial Storage Drive",
        "System Storage Device",
        "Solid System Drive",
      ],
      correctAnswer: "Solid State Drive",
    },
    {
      question: "Which Indian company manufactures computer hardware?",
      options: ["HCL", "TCS", "Infosys", "Wipro"],
      correctAnswer: "HCL",
    },
  ],

  // Science Questions
  science: [
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
      correctAnswer: "Nitrogen",
    },
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: "Newton",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Mercury"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "H2SO4"],
      correctAnswer: "H2O",
    },
    {
      question: "Which part of the cell contains DNA?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
      correctAnswer: "Nucleus",
    },
    {
      question: "What is the speed of light in a vacuum?",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^10 m/s", "3 x 10^4 m/s"],
      correctAnswer: "3 x 10^8 m/s",
    },
    {
      question: "Which of the following is a renewable source of energy?",
      options: ["Solar Energy", "Coal", "Petroleum", "Natural Gas"],
      correctAnswer: "Solar Energy",
    },
    {
      question: "What is the main source of energy for Earth's climate system?",
      options: ["Sun", "Moon", "Earth's Core", "Wind"],
      correctAnswer: "Sun",
    },
    {
      question: "Which acid is found in the stomach?",
      options: ["Hydrochloric Acid", "Sulfuric Acid", "Nitric Acid", "Acetic Acid"],
      correctAnswer: "Hydrochloric Acid",
    },
    {
      question: "What is the boiling point of water at standard pressure?",
      options: ["100°C", "0°C", "50°C", "200°C"],
      correctAnswer: "100°C",
    },
    // 10 New Questions
    {
      question: "Which instrument measures atmospheric pressure?",
      options: ["Barometer", "Thermometer", "Hygrometer", "Anemometer"],
      correctAnswer: "Barometer",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
    },
    {
      question: "Which type of energy is stored in a stretched spring?",
      options: ["Potential Energy", "Kinetic Energy", "Thermal Energy", "Chemical Energy"],
      correctAnswer: "Potential Energy",
    },
    {
      question: "Which gas is essential for photosynthesis?",
      options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "What is the SI unit of electric current?",
      options: ["Ampere", "Volt", "Ohm", "Watt"],
      correctAnswer: "Ampere",
    },
    {
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctAnswer: "Jupiter",
    },
    {
      question: "What is the primary source of energy for a food chain?",
      options: ["Sunlight", "Water", "Soil", "Air"],
      correctAnswer: "Sunlight",
    },
    {
      question: "Which organelle is known as the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
      correctAnswer: "Mitochondria",
    },
    {
      question: "What is the pH value of pure water?",
      options: ["7", "0", "14", "10"],
      correctAnswer: "7",
    },
    {
      question: "Which Indian scientist discovered the Raman Effect?",
      options: ["C.V. Raman", "Homi Bhabha", "Vikram Sarabhai", "A.P.J. Abdul Kalam"],
      correctAnswer: "C.V. Raman",
    },
  ],

  // Physics Questions
  physics: [
    {
      question: "What is the SI unit of work?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: "Joule",
    },
    {
      question: "Which law states that an object at rest stays at rest unless acted upon by an external force?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
      correctAnswer: "Newton's First Law",
    },
    {
      question: "What is the formula for kinetic energy?",
      options: ["1/2 mv²", "mv²", "mgh", "F = ma"],
      correctAnswer: "1/2 mv²",
    },
    {
      question: "Which type of lens is used in a magnifying glass?",
      options: ["Convex Lens", "Concave Lens", "Plano-Convex Lens", "Biconcave Lens"],
      correctAnswer: "Convex Lens",
    },
    {
      question: "What is the speed of sound in air at sea level?",
      options: ["343 m/s", "300 m/s", "400 m/s", "500 m/s"],
      correctAnswer: "343 m/s",
    },
    {
      question: "Which of the following is a scalar quantity?",
      options: ["Speed", "Velocity", "Acceleration", "Force"],
      correctAnswer: "Speed",
    },
    {
      question: "What is the SI unit of electric charge?",
      options: ["Coulomb", "Ampere", "Volt", "Ohm"],
      correctAnswer: "Coulomb",
    },
    {
      question: "Which law explains the relationship between voltage, current, and resistance?",
      options: ["Ohm's Law", "Faraday's Law", "Coulomb's Law", "Newton's Law"],
      correctAnswer: "Ohm's Law",
    },
    {
      question: "What is the unit of power?",
      options: ["Watt", "Joule", "Newton", "Pascal"],
      correctAnswer: "Watt",
    },
    {
      question: "Which phenomenon causes the bending of light around corners?",
      options: ["Diffraction", "Reflection", "Refraction", "Polarization"],
      correctAnswer: "Diffraction",
    },
    // 10 New Questions
    {
      question: "What is the formula for gravitational potential energy?",
      options: ["mgh", "1/2 mv²", "F = ma", "V = IR"],
      correctAnswer: "mgh",
    },
    {
      question: "Which particle carries a negative charge?",
      options: ["Electron", "Proton", "Neutron", "Photon"],
      correctAnswer: "Electron",
    },
    {
      question: "What is the SI unit of frequency?",
      options: ["Hertz", "Joule", "Watt", "Newton"],
      correctAnswer: "Hertz",
    },
    {
      question: "Which law states that for every action, there is an equal and opposite reaction?",
      options: ["Newton's Third Law", "Newton's First Law", "Newton's Second Law", "Law of Gravitation"],
      correctAnswer: "Newton's Third Law",
    },
    {
      question: "What is the primary source of energy for a solar panel?",
      options: ["Sunlight", "Wind", "Water", "Geothermal Heat"],
      correctAnswer: "Sunlight",
    },
    {
      question: "Which type of mirror forms a virtual and erect image?",
      options: ["Plane Mirror", "Concave Mirror", "Convex Mirror", "Spherical Mirror"],
      correctAnswer: "Plane Mirror",
    },
    {
      question: "What is the SI unit of magnetic flux?",
      options: ["Weber", "Tesla", "Henry", "Farad"],
      correctAnswer: "Weber",
    },
    {
      question: "Which phenomenon explains the splitting of light into colors?",
      options: ["Dispersion", "Reflection", "Refraction", "Diffraction"],
      correctAnswer: "Dispersion",
    },
    {
      question: "What is the value of acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "8.9 m/s²", "10 m/s²", "7.8 m/s²"],
      correctAnswer: "9.8 m/s²",
    },
    {
      question: "Which Indian physicist contributed to quantum mechanics?",
      options: ["Satyendra Nath Bose", "C.V. Raman", "Homi Bhabha", "Meghnad Saha"],
      correctAnswer: "Satyendra Nath Bose",
    },
  ],

  // Chemistry Questions
  chemistry: [
    {
      question: "What is the atomic number of carbon?",
      options: ["6", "8", "12", "14"],
      correctAnswer: "6",
    },
    {
      question: "Which gas is known as laughing gas?",
      options: ["Nitrous Oxide", "Carbon Dioxide", "Nitrogen", "Oxygen"],
      correctAnswer: "Nitrous Oxide",
    },
    {
      question: "What is the chemical formula for table salt?",
      options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
      correctAnswer: "NaCl",
    },
    {
      question: "Which of the following is a noble gas?",
      options: ["Helium", "Hydrogen", "Oxygen", "Nitrogen"],
      correctAnswer: "Helium",
    },
    {
      question: "What is the pH of a neutral solution?",
      options: ["7", "0", "14", "10"],
      correctAnswer: "7",
    },
    {
      question: "Which element is the most electronegative?",
      options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"],
      correctAnswer: "Fluorine",
    },
    {
      question: "What type of bond is formed by the sharing of electrons?",
      options: ["Covalent Bond", "Ionic Bond", "Metallic Bond", "Hydrogen Bond"],
      correctAnswer: "Covalent Bond",
    },
    {
      question: "Which of the following is an organic compound?",
      options: ["Methane", "Sodium Chloride", "Calcium Carbonate", "Sulfuric Acid"],
      correctAnswer: "Methane",
    },
    {
      question: "What is the chemical symbol for iron?",
      options: ["Fe", "Ir", "In", "I"],
      correctAnswer: "Fe",
    },
    {
      question: "Which gas is used in balloons to make them float?",
      options: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"],
      correctAnswer: "Helium",
    },
    // 10 New Questions
    {
      question: "What is the chemical formula for sulfuric acid?",
      options: ["H2SO4", "HCl", "HNO3", "H2CO3"],
      correctAnswer: "H2SO4",
    },
    {
      question: "Which element has the symbol Ag?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correctAnswer: "Silver",
    },
    {
      question: "What type of reaction releases heat?",
      options: ["Exothermic", "Endothermic", "Neutralization", "Decomposition"],
      correctAnswer: "Exothermic",
    },
    {
      question: "Which gas is produced during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What is the atomic mass of oxygen (approximately)?",
      options: ["16", "12", "14", "18"],
      correctAnswer: "16",
    },
    {
      question: "Which compound is known as baking soda?",
      options: ["Sodium Bicarbonate", "Sodium Chloride", "Calcium Carbonate", "Potassium Nitrate"],
      correctAnswer: "Sodium Bicarbonate",
    },
    {
      question: "What is the valency of sodium?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
    },
    {
      question: "Which of the following is a greenhouse gas?",
      options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "What is the chemical name for rust?",
      options: ["Iron Oxide", "Iron Sulfate", "Iron Chloride", "Iron Carbonate"],
      correctAnswer: "Iron Oxide",
    },
    {
      question: "Which Indian chemist won the Nobel Prize for Chemistry?",
      options: ["Venkatraman Ramakrishnan", "C.V. Raman", "Homi Bhabha", "None"],
      correctAnswer: "Venkatraman Ramakrishnan",
    },
  ],

  // Biology Questions
  biology: [
    {
      question: "Which organ is responsible for pumping blood in the human body?",
      options: ["Heart", "Lungs", "Liver", "Kidneys"],
      correctAnswer: "Heart",
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
      correctAnswer: "Mitochondria",
    },
    {
      question: "Which gas is essential for human respiration?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What is the process by which plants make their food?",
      options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"],
      correctAnswer: "Photosynthesis",
    },
    {
      question: "Which part of the brain controls balance and coordination?",
      options: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"],
      correctAnswer: "Cerebellum",
    },
    {
      question: "What is the basic unit of life?",
      options: ["Cell", "Tissue", "Organ", "Organism"],
      correctAnswer: "Cell",
    },
    {
      question: "Which blood cells are responsible for fighting infections?",
      options: ["White Blood Cells", "Red Blood Cells", "Platelets", "Plasma"],
      correctAnswer: "White Blood Cells",
    },
    {
      question: "What is the genetic material in humans?",
      options: ["DNA", "RNA", "Protein", "Lipid"],
      correctAnswer: "DNA",
    },
    {
      question: "Which organ filters waste from the blood?",
      options: ["Kidneys", "Liver", "Lungs", "Heart"],
      correctAnswer: "Kidneys",
    },
    {
      question: "Which vitamin is produced by the skin in sunlight?",
      options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B"],
      correctAnswer: "Vitamin D",
    },
    // 10 New Questions
    {
      question: "Which pigment gives plants their green color?",
      options: ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"],
      correctAnswer: "Chlorophyll",
    },
    {
      question: "What is the largest organ in the human body?",
      options: ["Skin", "Liver", "Heart", "Brain"],
      correctAnswer: "Skin",
    },
    {
      question: "Which process involves the division of a cell into two identical cells?",
      options: ["Mitosis", "Meiosis", "Photosynthesis", "Respiration"],
      correctAnswer: "Mitosis",
    },
    {
      question: "Which gland regulates metabolism in the human body?",
      options: ["Thyroid", "Pituitary", "Adrenal", "Pancreas"],
      correctAnswer: "Thyroid",
    },
    {
      question: "What is the main function of red blood cells?",
      options: [
        "Transport oxygen",
        "Fight infections",
        "Clot blood",
        "Digest food",
      ],
      correctAnswer: "Transport oxygen",
    },
    {
      question: "Which part of a plant absorbs water and nutrients?",
      options: ["Roots", "Leaves", "Stem", "Flowers"],
      correctAnswer: "Roots",
    },
    {
      question: "What is the scientific name for humans?",
      options: ["Homo sapiens", "Homo erectus", "Homo habilis", "Homo neanderthalensis"],
      correctAnswer: "Homo sapiens",
    },
    {
      question: "Which vitamin deficiency causes scurvy?",
      options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin K"],
      correctAnswer: "Vitamin C",
    },
    {
      question: "Which organ produces insulin?",
      options: ["Pancreas", "Liver", "Kidneys", "Stomach"],
      correctAnswer: "Pancreas",
    },
    {
      question: "Which Indian biologist contributed to plant genetics?",
      options: ["M.S. Swaminathan", "Venkatraman Ramakrishnan", "Homi Bhabha", "C.V. Raman"],
      correctAnswer: "M.S. Swaminathan",
    },
  ],

  // Economics Questions
  economics: [
    {
      question: "What is the full form of GDP?",
      options: [
        "Gross Domestic Product",
        "General Domestic Product",
        "Gross Development Product",
        "Global Domestic Product",
      ],
      correctAnswer: "Gross Domestic Product",
    },
    {
      question: "Which of the following is a measure of inflation?",
      options: ["Consumer Price Index", "Gross National Product", "Fiscal Deficit", "Trade Balance"],
      correctAnswer: "Consumer Price Index",
    },
    {
      question: "What is the main function of the Reserve Bank of India?",
      options: [
        "Monetary Policy Regulation",
        "Agricultural Development",
        "Industrial Policy",
        "Tax Collection",
      ],
      correctAnswer: "Monetary Policy Regulation",
    },
    {
      question: "Which type of economy is India classified as?",
      options: ["Mixed Economy", "Capitalist Economy", "Socialist Economy", "Traditional Economy"],
      correctAnswer: "Mixed Economy",
    },
    {
      question: "What does FDI stand for?",
      options: [
        "Foreign Direct Investment",
        "Fiscal Development Investment",
        "Foreign Domestic Investment",
        "Financial Direct Investment",
      ],
      correctAnswer: "Foreign Direct Investment",
    },
    {
      question: "Which of the following is a direct tax?",
      options: ["Income Tax", "Sales Tax", "Service Tax", "Excise Duty"],
      correctAnswer: "Income Tax",
    },
    {
      question: "What is the term for a sustained increase in the general price level?",
      options: ["Inflation", "Deflation", "Stagflation", "Recession"],
      correctAnswer: "Inflation",
    },
    {
      question: "Which organization regulates the stock market in India?",
      options: ["SEBI", "RBI", "IRDA", "TRAI"],
      correctAnswer: "SEBI",
    },
    {
      question: "What is the full form of GST?",
      options: [
        "Goods and Services Tax",
        "General Sales Tax",
        "Government Service Tax",
        "Gross Sales Tax",
      ],
      correctAnswer: "Goods and Services Tax",
    },
    {
      question: "Which Five-Year Plan is currently in progress in India?",
      options: ["None", "12th", "13th", "14th"],
      correctAnswer: "None",
    },
    // 10 New Questions
    {
      question: "What is the term for a decrease in the general price level?",
      options: ["Deflation", "Inflation", "Recession", "Depression"],
      correctAnswer: "Deflation",
    },
    {
      question: "Which economic indicator measures the total value of goods and services produced?",
      options: ["GDP", "GNP", "CPI", "FDI"],
      correctAnswer: "GDP",
    },
    {
      question: "What is the full form of NABARD?",
      options: [
        "National Bank for Agriculture and Rural Development",
        "National Bank for Agricultural Research and Development",
        "National Bureau for Agricultural Development",
        "National Board for Agriculture and Rural Development",
      ],
      correctAnswer: "National Bank for Agriculture and Rural Development",
    },
    {
      question: "Which tax is levied on the sale of goods and services?",
      options: ["GST", "Income Tax", "Corporate Tax", "Property Tax"],
      correctAnswer: "GST",
    },
    {
      question: "What is the term for government spending exceeding revenue?",
      options: ["Fiscal Deficit", "Trade Deficit", "Budget Surplus", "Revenue Deficit"],
      correctAnswer: "Fiscal Deficit",
    },
    {
      question: "Which Indian economist won the Nobel Prize in Economics?",
      options: ["Amartya Sen", "Raghuram Rajan", "Manmohan Singh", "Kaushik Basu"],
      correctAnswer: "Amartya Sen",
    },
    {
      question: "What is the main objective of the Make in India initiative?",
      options: [
        "Promote manufacturing",
        "Increase agricultural output",
        "Enhance digital literacy",
        "Improve healthcare",
      ],
      correctAnswer: "Promote manufacturing",
    },
    {
      question: "Which of the following is an indirect tax?",
      options: ["Excise Duty", "Income Tax", "Wealth Tax", "Gift Tax"],
      correctAnswer: "Excise Duty",
    },
    {
      question: "What is the term for the total value of goods and services produced by nationals?",
      options: ["GNP", "GDP", "CPI", "NDP"],
      correctAnswer: "GNP",
    },
    {
      question: "Which Indian ministry formulates the Union Budget?",
      options: ["Ministry of Finance", "Ministry of Commerce", "Ministry of Planning", "Ministry of Home Affairs"],
      correctAnswer: "Ministry of Finance",
    },
  ],

  // General Knowledge Questions
  "general-knowledge": [
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "New Delhi",
    },
    {
      question: "Who is known as the 'Father of the Nation' in India?",
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Sardar Patel"],
      correctAnswer: "Mahatma Gandhi",
    },
    {
      question: "Which is the national animal of India?",
      options: ["Tiger", "Lion", "Elephant", "Leopard"],
      correctAnswer: "Tiger",
    },
    {
      question: "What is the national flower of India?",
      options: ["Lotus", "Rose", "Sunflower", "Marigold"],
      correctAnswer: "Lotus",
    },
    {
      question: "Which river is considered the holiest in India?",
      options: ["Ganga", "Yamuna", "Godavari", "Krishna"],
      correctAnswer: "Ganga",
    },
    {
      question: "What is the currency of India?",
      options: ["Rupee", "Dollar", "Euro", "Yen"],
      correctAnswer: "Rupee",
    },
    {
      question: "Which monument is known as the symbol of love in India?",
      options: ["Taj Mahal", "Red Fort", "Qutub Minar", "India Gate"],
      correctAnswer: "Taj Mahal",
    },
    {
      question: "Which is the largest state in India by area?",
      options: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"],
      correctAnswer: "Rajasthan",
    },
    {
      question: "Who was the first President of India?",
      options: ["Rajendra Prasad", "Jawaharlal Nehru", "Sardar Patel", "C. Rajagopalachari"],
      correctAnswer: "Rajendra Prasad",
    },
    {
      question: "Which festival is known as the festival of lights in India?",
      options: ["Diwali", "Holi", "Raksha Bandhan", "Dussehra"],
      correctAnswer: "Diwali",
    },
    // 10 New Questions
    {
      question: "What is the national bird of India?",
      options: ["Peacock", "Parrot", "Eagle", "Sparrow"],
      correctAnswer: "Peacock",
    },
    {
      question: "Which Indian state is known as the 'Land of Spices'?",
      options: ["Kerala", "Gujarat", "Punjab", "Assam"],
      correctAnswer: "Kerala",
    },
    {
      question: "Who wrote the Indian national anthem?",
      options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Mahatma Gandhi", "Jawaharlal Nehru"],
      correctAnswer: "Rabindranath Tagore",
    },
    {
      question: "Which is the smallest state in India by area?",
      options: ["Goa", "Sikkim", "Tripura", "Nagaland"],
      correctAnswer: "Goa",
    },
    {
      question: "What is the national sport of India?",
      options: ["Hockey", "Cricket", "Kabaddi", "Football"],
      correctAnswer: "Hockey",
    },
    {
      question: "Which Indian city is known as the 'Pink City'?",
      options: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
      correctAnswer: "Jaipur",
    },
    {
      question: "What is the name of India’s space agency?",
      options: ["ISRO", "DRDO", "BARC", "HAL"],
      correctAnswer: "ISRO",
    },
    {
      question: "Which mountain range separates India from China?",
      options: ["Himalayas", "Vindhyas", "Western Ghats", "Aravallis"],
      correctAnswer: "Himalayas",
    },
    {
      question: "Which Indian state has the highest literacy rate?",
      options: ["Kerala", "Mizoram", "Goa", "Tamil Nadu"],
      correctAnswer: "Kerala",
    },
    {
      question: "Which Indian freedom fighter is known as 'Netaji'?",
      options: ["Subhas Chandra Bose", "Bhagat Singh", "Chandra Shekhar Azad", "Lala Lajpat Rai"],
      correctAnswer: "Subhas Chandra Bose",
    },
  ],

  // Hindi Questions
  hindi: [
    {
      question: "हिन्दी भाषा की लिपि क्या है?",
      options: ["देवनागरी", "गुरुमुखी", "ब्राह्मी", "खरोष्ठी"],
      correctAnswer: "देवनागरी",
    },
    {
      question: "'रामचरितमानस' के रचयिता कौन हैं?",
      options: ["तुलसीदास", "सूरदास", "कबीर", "मीराबाई"],
      correctAnswer: "तुलसीदास",
    },
    {
      question: "हिन्दी में 'पुस्तक' का पर्यायवाची शब्द क्या है?",
      options: ["किताब", "कलम", "कागज", "स्याही"],
      correctAnswer: "किताब",
    },
    {
      question: "हिन्दी व्याकरण में 'सर्वनाम' का अर्थ क्या है?",
      options: ["नाम के स्थान पर प्रयुक्त शब्द", "विशेषण", "क्रिया", "संज्ञा"],
      correctAnswer: "नाम के स्थान पर प्रयुक्त शब्द",
    },
    {
      question: "'कामायनी' के रचयिता कौन हैं?",
      options: ["जयशंकर प्रसाद", "महादेवी वर्मा", "सुमित्रानंदन पंत", "निराला"],
      correctAnswer: "जयशंकर प्रसाद",
    },
    {
      question: "हिन्दी में 'विराम चिह्न' का उदाहरण क्या है?",
      options: ["पूर्ण विराम", "संज्ञा", "विशेषण", "क्रिया"],
      correctAnswer: "पूर्ण विराम",
    },
    {
      question: "हिन्दी में 'मुहावरा' का अर्थ क्या है?",
      options: [
        "विशेष अर्थ देने वाला वाक्यांश",
        "सामान्य वाक्य",
        "कविता की पंक्ति",
        "विलोम शब्द",
      ],
      correctAnswer: "विशेष अर्थ देने वाला वाक्यांश",
    },
    {
      question: "'प्रेमचंद' का वास्तविक नाम क्या था?",
      options: ["धनपत राय", "मुंशी राय", "गोपाल राय", "हरि राय"],
      correctAnswer: "धनपत राय",
    },
    {
      question: "हिन्दी में 'वचन' कितने प्रकार के होते हैं?",
      options: ["दो", "तीन", "चार", "पाँच"],
      correctAnswer: "दो",
    },
    {
      question: "'गोदान' उपन्यास के लेखक कौन हैं?",
      options: ["प्रेमचंद", "जयशंकर प्रसाद", "महादेवी वर्मा", "सूरदास"],
      correctAnswer: "प्रेमचंद",
    },
    // 10 New Questions
    {
      question: "हिन्दी में 'संधि' का अर्थ क्या है?",
      options: [
        "दो स्वरों का मेल",
        "दो व्यंजनों का मेल",
        "शब्दों का वियोग",
        "वाक्य का निर्माण",
      ],
      correctAnswer: "दो स्वरों का मेल",
    },
    {
      question: "'पंचतंत्र' की रचनाएँ किसके द्वारा की गई हैं?",
      options: ["विष्णु शर्मा", "कालिदास", "भवभूति", "बाणभट्ट"],
      correctAnswer: "विष्णु शर्मा",
    },
    {
      question: "हिन्दी में 'विलोम' शब्द का उदाहरण क्या है?",
      options: ["बड़ा-छोटा", "पुस्तक-किताब", "लाल-रंग", "खाना-पीना"],
      correctAnswer: "बड़ा-छोटा",
    },
    {
      question: "'मेघदूत' के रचयिता कौन हैं?",
      options: ["कालिदास", "तुलसीदास", "सूरदास", "कबीर"],
      correctAnswer: "कालिदास",
    },
    {
      question: "हिन्दी में 'क्रिया' का उदाहरण क्या है?",
      options: ["खाना", "पुस्तक", "लाल", "बड़ा"],
      correctAnswer: "खाना",
    },
    {
      question: "हिन्दी में 'उपसर्ग' का कार्य क्या है?",
      options: [
        "शब्द के पहले लगकर अर्थ बदलना",
        "शब्द के अंत में लगना",
        "वाक्य को जोड़ना",
        "विराम चिह्न लगाना",
      ],
      correctAnswer: "शब्द के पहले लगकर अर्थ बदलना",
    },
    {
      question: "'सूरदास' किस भक्ति धारा से संबंधित थे?",
      options: ["कृष्ण भक्ति", "राम भक्ति", "निर्गुण भक्ति", "सूफी भक्ति"],
      correctAnswer: "कृष्ण भक्ति",
    },
    {
      question: "हिन्दी में 'अलंकार' का अर्थ क्या है?",
      options: [
        "काव्य की शोभा बढ़ाने वाला तत्व",
        "वाक्य का निर्माण",
        "शब्दों का संग्रह",
        "विराम चिह्न",
      ],
      correctAnswer: "काव्य की शोभा बढ़ाने वाला तत्व",
    },
    {
      question: "'कबीर' किस भाषा में अपनी रचनाएँ लिखते थे?",
      options: ["सधुक्कड़ी", "संस्कृत", "पाली", "प्राकृत"],
      correctAnswer: "सधुक्कड़ी",
    },
    {
      question: "हिन्दी में राष्ट्रीय भाषा के रूप में मान्यता कब मिली?",
      options: ["1949", "1950", "1947", "1965"],
      correctAnswer: "1949",
    },
  ],

  // Accounts Questions
  accounts: [
    {
      question: "What is the full form of GAAP?",
      options: [
        "Generally Accepted Accounting Principles",
        "General Accounting and Auditing Principles",
        "Global Accepted Accounting Practices",
        "Generally Applied Accounting Procedures",
      ],
      correctAnswer: "Generally Accepted Accounting Principles",
    },
    {
      question: "Which of the following is a current asset?",
      options: ["Cash", "Building", "Machinery", "Furniture"],
      correctAnswer: "Cash",
    },
    {
      question: "What is the accounting equation?",
      options: [
        "Assets = Liabilities + Equity",
        "Assets = Liabilities - Equity",
        "Assets = Equity - Liabilities",
        "Liabilities = Assets + Equity",
      ],
      correctAnswer: "Assets = Liabilities + Equity",
    },
    {
      question: "Which financial statement shows a company's revenues and expenses?",
      options: [
        "Income Statement",
        "Balance Sheet",
        "Cash Flow Statement",
        "Statement of Equity",
      ],
      correctAnswer: "Income Statement",
    },
    {
      question: "What is depreciation?",
      options: [
        "Reduction in value of an asset over time",
        "Increase in asset value",
        "Loss of revenue",
        "Gain in equity",
      ],
      correctAnswer: "Reduction in value of an asset over time",
    },
    {
      question: "Which of the following is a liability?",
      options: ["Loan", "Cash", "Inventory", "Accounts Receivable"],
      correctAnswer: "Loan",
    },
    {
      question: "What is the double-entry system in accounting?",
      options: [
        "Every transaction affects two accounts",
        "Every transaction is recorded once",
        "Every transaction is audited",
        "Every transaction is reversed",
      ],
      correctAnswer: "Every transaction affects two accounts",
    },
    {
      question: "Which of the following is NOT a type of financial statement?",
      options: [
        "Performance Report",
        "Balance Sheet",
        "Income Statement",
        "Cash Flow Statement",
      ],
      correctAnswer: "Performance Report",
    },
    {
      question: "What is the purpose of a trial balance?",
      options: [
        "To check the accuracy of accounts",
        "To calculate profit",
        "To record transactions",
        "To prepare budgets",
      ],
      correctAnswer: "To check the accuracy of accounts",
    },
    {
      question: "Which of the following is an example of a fixed asset?",
      options: ["Building", "Cash", "Accounts Receivable", "Inventory"],
      correctAnswer: "Building",
    },
    // 10 New Questions
    {
      question: "What is the full form of ledger in accounting?",
      options: [
        "Book of final entry",
        "Book of initial entry",
        "Book of transactions",
        "Book of summaries",
      ],
      correctAnswer: "Book of final entry",
    },
    {
      question: "Which account is debited when goods are sold on credit?",
      options: ["Accounts Receivable", "Cash", "Sales", "Inventory"],
      correctAnswer: "Accounts Receivable",
    },
    {
      question: "What is the purpose of a balance sheet?",
      options: [
        "Shows financial position at a point in time",
        "Shows revenue and expenses",
        "Shows cash inflows and outflows",
        "Shows equity changes",
      ],
      correctAnswer: "Shows financial position at a point in time",
    },
    {
      question: "Which method calculates depreciation based on usage?",
      options: [
        "Units of Production",
        "Straight-Line",
        "Double Declining",
        "Sum of Years Digits",
      ],
      correctAnswer: "Units of Production",
    },
    {
      question: "What is the full form of SAP in accounting software?",
      options: [
        "Systems, Applications, and Products",
        "Software for Accounting Processes",
        "Systematic Accounting Program",
        "Standard Accounting Platform",
      ],
      correctAnswer: "Systems, Applications, and Products",
    },
    {
      question: "Which financial statement tracks cash inflows and outflows?",
      options: [
        "Cash Flow Statement",
        "Income Statement",
        "Balance Sheet",
        "Statement of Equity",
      ],
      correctAnswer: "Cash Flow Statement",
    },
    {
      question: "What is the term for money owed by customers?",
      options: ["Accounts Receivable", "Accounts Payable", "Equity", "Revenue"],
      correctAnswer: "Accounts Receivable",
    },
    {
      question: "Which principle assumes a business will continue to operate indefinitely?",
      options: [
        "Going Concern",
        "Consistency",
        "Matching",
        "Conservatism",
      ],
      correctAnswer: "Going Concern",
    },
    {
      question: "What is the journal entry for paying salaries?",
      options: [
        "Debit Salaries Expense, Credit Cash",
        "Debit Cash, Credit Salaries Expense",
        "Debit Salaries Payable, Credit Cash",
        "Debit Cash, Credit Equity",
      ],
      correctAnswer: "Debit Salaries Expense, Credit Cash",
    },
    {
      question: "Which Indian company uses SAP for financial accounting?",
      options: ["Tata Consultancy Services", "HCL Technologies", "Infosys", "Reliance Industries"],
      correctAnswer: "Reliance Industries",
    },
  ],

  // Finance Questions
  finance: [
    {
      question: "What is the full form of SEBI?",
      options: [
        "Securities and Exchange Board of India",
        "Stock Exchange Board of India",
        "Securities and Equity Board of India",
        "Standard Exchange Board of India",
      ],
      correctAnswer: "Securities and Exchange Board of India",
    },
    {
      question: "Which of the following is a financial market?",
      options: ["Stock Market", "Commodity Market", "Real Estate Market", "Labor Market"],
      correctAnswer: "Stock Market",
    },
    {
      question: "What is a mutual fund?",
      options: [
        "A pool of money invested in securities",
        "A government bond",
        "A fixed deposit",
        "A savings account",
      ],
      correctAnswer: "A pool of money invested in securities",
    },
    {
      question: "Which of the following is a credit rating agency in India?",
      options: ["CRISIL", "RBI", "SEBI", "IRDA"],
      correctAnswer: "CRISIL",
    },
    {
      question: "What is the full form of IPO?",
      options: [
        "Initial Public Offering",
        "International Public Offering",
        "Indian Public Offering",
        "Integrated Public Offering",
      ],
      correctAnswer: "Initial Public Offering",
    },
    {
      question: "Which of the following is a type of bond?",
      options: ["Government Bond", "Mutual Fund", "Equity Share", "Fixed Deposit"],
      correctAnswer: "Government Bond",
    },
    {
      question: "What is the purpose of diversification in investment?",
      options: [
        "Reduce risk",
        "Increase returns",
        "Simplify portfolio",
        "Avoid taxes",
      ],
      correctAnswer: "Reduce risk",
    },
    {
      question: "Which of the following is a stock exchange in India?",
      options: ["BSE", "RBI", "IRDA", "TRAI"],
      correctAnswer: "BSE",
    },
    {
      question: "What is the full form of NAV in mutual funds?",
      options: [
        "Net Asset Value",
        "Nominal Asset Value",
        "Net Annual Value",
        "National Asset Value",
      ],
      correctAnswer: "Net Asset Value",
    },
    {
      question: "Which of the following is a type of derivative?",
      options: ["Futures", "Shares", "Bonds", "Fixed Deposits"],
      correctAnswer: "Futures",
    },
    // 10 New Questions
    {
      question: "What is the full form of NSE?",
      options: [
        "National Stock Exchange",
        "New Stock Exchange",
        "National Securities Exchange",
        "Nominal Stock Exchange",
      ],
      correctAnswer: "National Stock Exchange",
    },
    {
      question: "Which term refers to the cost of borrowing money?",
      options: ["Interest Rate", "Dividend", "Capital Gain", "Brokerage"],
      correctAnswer: "Interest Rate",
    },
    {
      question: "What is a demat account used for?",
      options: [
        "Holding securities electronically",
        "Saving money",
        "Paying taxes",
        "Trading commodities",
      ],
      correctAnswer: "Holding securities electronically",
    },
    {
      question: "Which financial instrument represents ownership in a company?",
      options: ["Equity Share", "Bond", "Mutual Fund", "Fixed Deposit"],
      correctAnswer: "Equity Share",
    },
    {
      question: "What is the full form of RBI?",
      options: [
        "Reserve Bank of India",
        "Regional Bank of India",
        "Republic Bank of India",
        "Regulatory Bank of India",
      ],
      correctAnswer: "Reserve Bank of India",
    },
    {
      question: "Which term refers to the profit earned from selling an asset?",
      options: ["Capital Gain", "Dividend", "Interest", "Brokerage"],
      correctAnswer: "Capital Gain",
    },
    {
      question: "Which Indian bank is the largest by assets?",
      options: ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank"],
      correctAnswer: "SBI",
    },
    {
      question: "What is the purpose of a financial portfolio?",
      options: [
        "Manage investments",
        "Pay taxes",
        "Track expenses",
        "Calculate salaries",
      ],
      correctAnswer: "Manage investments",
    },
    {
      question: "Which type of fund invests in both equity and debt?",
      options: ["Hybrid Fund", "Equity Fund", "Debt Fund", "Index Fund"],
      correctAnswer: "Hybrid Fund",
    },
    {
      question: "Which Indian scheme promotes financial inclusion?",
      options: ["PMJDY", "Make in India", "Digital India", "Swachh Bharat"],
      correctAnswer: "PMJDY",
    },
  ],

  // Railway History Questions
  "railway-history": [
    {
      question: "In which year was the first railway line opened in India?",
      options: ["1853", "1845", "1860", "1870"],
      correctAnswer: "1853",
    },
    {
      question: "Which city was connected to Thane by the first railway line in India?",
      options: ["Bombay", "Calcutta", "Madras", "Delhi"],
      correctAnswer: "Bombay",
    },
    {
      question: "What was the name of the first passenger train in India?",
      options: ["Great Indian Peninsula", "East Indian Railway", "Fairy Queen", "Royal Mail"],
      correctAnswer: "Great Indian Peninsula",
    },
  
















    {
      question: "Which of the following is NOT a web browser?",
// Data for filling in templates
const templateData = {
  states: ["Haryana", "Rajasthan", "Uttar Pradesh", "Delhi", "Maharashtra", "Gujarat", "Madhya Pradesh", "Punjab"],
  names: [
    "Nayab Singh Saini",
    "Bhajan Lal Sharma",
    "Yogi Adityanath",
    "Arvind Kejriwal",
    "Eknath Shinde",
    "Bhupendra Patel",
    "Mohan Yadav",
    "Himanta Biswa Sarma",
    "Bhagwant Mann",
    "Revanth Reddy",
    "Pinarayi Vijayan",
    "Mamata Banerjee",
    "Naveen Patnaik",
    "Nitish Kumar",
    "Hemant Soren",
  ],
  schemes: [
    "Pradhan Mantri Kisan Samman Nidhi",
    "Ayushman Bharat",
    "Swachh Bharat Mission",
    "PM Garib Kalyan Yojana",
    "Skill India Mission",
    "Digital India",
    "Make in India",
    "Startup India",
    "Beti Bachao Beti Padhao",
    "Jal Jeevan Mission",
    "PM Awas Yojana",
    "MGNREGA",
    "Atal Pension Yojana",
    "Sukanya Samriddhi Yojana",
  ],
  events: [
    "Demonetization",
    "Implementation of GST",
    "COVID-19 Lockdown",
    "Commonwealth Games in Delhi",
    "2019 General Elections",
    "Chandrayaan-3 Moon Landing",
    "Abrogation of Article 370",
    "2020 Tokyo Olympics",
    "2023 G20 Summit",
    "2022 FIFA World Cup",
    "2023 Cricket World Cup",
  ],
  years: ["2014", "2016", "2017", "2019", "2020", "2021", "2022", "2023", "2024", "2018", "2015"],
  words: [
    "Diligent",
    "Eloquent",
    "Pragmatic",
    "Benevolent",
    "Meticulous",
    "Resilient",
    "Tenacious",
    "Versatile",
    "Astute",
    "Candid",
    "Ambiguous",
    "Ephemeral",
    "Gregarious",
    "Incessant",
    "Nefarious",
  ],
  synonyms: {
    Diligent: ["Hardworking", "Lazy", "Careless", "Inattentive"],
    Eloquent: ["Articulate", "Inarticulate", "Silent", "Reserved"],
    Pragmatic: ["Practical", "Idealistic", "Unrealistic", "Theoretical"],
    Benevolent: ["Kind", "Cruel", "Harsh", "Indifferent"],
    Meticulous: ["Careful", "Sloppy", "Negligent", "Careless"],
    Resilient: ["Tough", "Fragile", "Weak", "Vulnerable"],
    Tenacious: ["Persistent", "Yielding", "Irresolute", "Wavering"],
    Versatile: ["Adaptable", "Inflexible", "Limited", "Restricted"],
    Astute: ["Shrewd", "Foolish", "Naive", "Gullible"],
    Candid: ["Frank", "Deceptive", "Dishonest", "Evasive"],
    Ambiguous: ["Unclear", "Definite", "Precise", "Explicit"],
    Ephemeral: ["Temporary", "Permanent", "Enduring", "Lasting"],
    Gregarious: ["Sociable", "Solitary", "Reserved", "Reclusive"],
    Incessant: ["Constant", "Intermittent", "Occasional", "Sporadic"],
    Nefarious: ["Wicked", "Virtuous", "Honorable", "Noble"],
  },
}

// Function to fill a template with data
function fillTemplate(template: any, subcategory: string): any {
  const question = { ...template }

  // Replace placeholders in the question
  if (question.question.includes("[STATE]")) {
    const state = templateData.states[Math.floor(Math.random() * templateData.states.length)]
    question.question = question.question.replace("[STATE]", state)
  }

  if (question.question.includes("[NAME")) {
    const shuffledNames = shuffleArray(templateData.names)
    for (let i = 1; i <= 4; i++) {
      question.question = question.question.replace(`[NAME${i}]`, shuffledNames[i - 1])
      if (question.options.includes(`[NAME${i}]`)) {
        question.options = question.options.map((opt: string) => (opt === `[NAME${i}]` ? shuffledNames[i - 1] : opt))
      }
    }
    if (question.correctAnswer.includes("[NAME")) {
      const index = Number.parseInt(question.correctAnswer.replace("[NAME", "").replace("]", "")) - 1
      question.correctAnswer = shuffledNames[index]
    }
  }

  if (question.question.includes("[SCHEME")) {
    const shuffledSchemes = shuffleArray(templateData.schemes)
    for (let i = 1; i <= 4; i++) {
      question.question = question.question.replace(`[SCHEME${i}]`, shuffledSchemes[i - 1])
      if (question.options.includes(`[SCHEME${i}]`)) {
        question.options = question.options.map((opt: string) =>
          opt === `[SCHEME${i}]` ? shuffledSchemes[i - 1] : opt,
        )
      }
    }
    if (question.correctAnswer.includes("[SCHEME")) {
      const index = Number.parseInt(question.correctAnswer.replace("[SCHEME", "").replace("]", "")) - 1
      question.correctAnswer = shuffledSchemes[index]
    }
  }

  if (question.question.includes("[EVENT]")) {
    const event = templateData.events[Math.floor(Math.random() * templateData.events.length)]
    question.question = question.question.replace("[EVENT]", event)
  }

  if (question.question.includes("[YEAR")) {
    const shuffledYears = shuffleArray(templateData.years)
    for (let i = 1; i <= 4; i++) {
      question.question = question.question.replace(`[YEAR${i}]`, shuffledYears[i - 1])
      if (question.options.includes(`[YEAR${i}]`)) {
        question.options = question.options.map((opt: string) => (opt === `[YEAR${i}]` ? shuffledYears[i - 1] : opt))
      }
    }
    if (question.correctAnswer.includes("[YEAR")) {
      const index = Number.parseInt(question.correctAnswer.replace("[YEAR", "").replace("]", "")) - 1
      question.correctAnswer = shuffledYears[index]
    }
  }

  if (question.question.includes("[NUM")) {
    for (let i = 1; i <= 3; i++) {
      const num = Math.floor(Math.random() * 20) + 5
      question.question = question.question.replace(`[NUM${i}]`, num.toString())
    }
  }

  if (question.question.includes("[SPEED]")) {
    const speed = Math.floor(Math.random() * 50) + 30
    question.question = question.question.replace("[SPEED]", speed.toString())
  }

  if (question.question.includes("[LENGTH]")) {
    const length = Math.floor(Math.random() * 200) + 100
    question.question = question.question.replace("[LENGTH]", length.toString())
  }

  if (question.question.includes("[TIME]")) {
    const time = Math.floor(Math.random() * 20) + 10
    question.question = question.question.replace("[TIME]", time.toString())
  }

  if (question.question.includes("[RATE]")) {
    const rate = Math.floor(Math.random() * 10) + 5
    question.question = question.question.replace("[RATE]", rate.toString())
  }

  if (question.question.includes("[YEARS]")) {
    const years = Math.floor(Math.random() * 5) + 2
    question.question = question.question.replace("[YEARS]", years.toString())
  }

  if (question.question.includes("[INTEREST]")) {
    const interest = Math.floor(Math.random() * 5000) + 1000
    question.question = question.question.replace("[INTEREST]", interest.toString())
  }

  if (question.options.includes("[ANS1]")) {
    const ans1 = Math.floor(Math.random() * 100) + 50
    const ans2 = ans1 + Math.floor(Math.random() * 20) + 5
    const ans3 = ans1 - Math.floor(Math.random() * 20) + 5
    const ans4 = ans2 + Math.floor(Math.random() * 20) + 5

    question.options = question.options.map((opt: string) => {
      if (opt.includes("[ANS1]")) return opt.replace("[ANS1]", ans1.toString())
      if (opt.includes("[ANS2]")) return opt.replace("[ANS2]", ans2.toString())
      if (opt.includes("[ANS3]")) return opt.replace("[ANS3]", ans3.toString())
      if (opt.includes("[ANS4]")) return opt.replace("[ANS4]", ans4.toString())
      return opt
    })

    question.correctAnswer = question.correctAnswer.replace("[ANS1]", ans1.toString())
  }

  if (question.question.includes("[WORD]")) {
    const word = templateData.words[Math.floor(Math.random() * templateData.words.length)]
    question.question = question.question.replace("[WORD]", word)

    if (question.options.includes("[SYN1]")) {
      const synonyms = templateData.synonyms[word as keyof typeof templateData.synonyms] || [
        "Good",
        "Bad",
        "Average",
        "Excellent",
      ]

      question.options = question.options.map((opt: string, index: number) => {
        if (opt.includes(`[SYN${index + 1}]`)) return synonyms[index]
        return opt
      })

      question.correctAnswer = synonyms[0]
    }
  }

  if (question.question.includes("[BLANK]")) {
    // This is already handled in the templates
  }

  return question
}

// Update the generateQuestionsForSubcategory function to always return 100 questions
export function generateQuestionsForSubcategory(subcategory: string, testId: number, count = 100): any[] {
  const questions: any[] = []
  const subcategoryType = subcategory.toLowerCase()

  // Get question types for this subcategory
  const questionTypesForSubcategory = questionTypes[subcategoryType as keyof typeof questionTypes] || questionTypes.ssc // Default to SSC if subcategory not found

  // Generate questions for each type
  const questionsPerType = Math.ceil(count / questionTypesForSubcategory.length)

  questionTypesForSubcategory.forEach((typeInfo, typeIndex) => {
    const { type, topics } = typeInfo

    // Generate questions for each topic
    const questionsPerTopic = Math.ceil(questionsPerType / topics.length)

    topics.forEach((topic, topicIndex) => {
      // Get templates for this topic
      const templates = questionTemplates[topic] ||
        questionTemplates["current-affairs"] || [
          {
            question: "Default question for topic: " + topic,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A",
          },
        ]

      // Generate questions from templates
      for (let i = 0; i < questionsPerTopic && questions.length < count; i++) {
        const templateIndex = i % templates.length
        const template = templates[templateIndex]

        // Fill the template with data
        const filledQuestion = fillTemplate(template, subcategoryType)

        // Add question ID and metadata
        questions.push({
          id: generateQuestionId(testId, questions.length + 1),
          ...filledQuestion,
          type,
          topic,
          difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        })
      }
    })
  })

  // If we don't have enough questions, duplicate some to reach the desired count
  while (questions.length < count) {
    const index = Math.floor(Math.random() * questions.length)
    const question = { ...questions[index] }
    question.id = generateQuestionId(testId, questions.length + 1)
    questions.push(question)
  }

  // Shuffle and return the requested number of questions
  return shuffleArray(questions).slice(0, count)
}
