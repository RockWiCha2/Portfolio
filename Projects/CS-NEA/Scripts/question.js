let questionsData = [];

// Load questions from the JSON file
async function loadQuestions() {
  try {
    const response = await fetch("Scripts/questions.json")
    questionsData = await response.json()
  } catch (error) {
    console.error("Error loading questions:", error)
  }
}

// Get a random question
function getRandomQuestion() {
  if (questionsData.length === 0) {
    console.error("Questions data is not loaded yet.")
    return null
  }
  var randomIndex = Math.floor(Math.random() * questionsData.length)
  return questionsData[randomIndex];
}

// Get the correct answer for a question
function getCorrectAnswer(question) {
  if (question) {
    return question.correct;  // If `question` exists, return `question.correct`
  } else {
    return null;  // If `question` does not exist, return `null`
  }
}

// Get all the answers for a question (shuffled)
function getAllAnswers(question) {
  if (!question) {
    console.error("No question selected.")
    return null
  }
  return shuffleArray(question.answers)
}

// Shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp
  }
  return array
}