let startTime = 0;
let endTime = 0;
let timerInterval;
let currentText = '';
let currentWordCount = 0;
let currentQuestions = [];
let correctAnswers = [];

// Default text and questions
const defaultText = `
    <h2>The Future of Work: How Technology is Changing Our Jobs</h2>
    
    <p>In the past twenty years, technology has completely changed the way we work. From simple computers to artificial intelligence, these changes affect millions of people around the world. Many experts believe that the next ten years will bring even bigger changes to our working lives.</p>
    
    <p>One of the most important changes is remote work. Before 2020, only a small number of people worked from home. However, during the pandemic, companies discovered that many jobs could be done from anywhere. Today, about 35% of workers in developed countries work from home at least part of the time. This has created new opportunities for people who live far from big cities.</p>
    
    <p>Artificial intelligence is another major change. AI can now do many tasks that humans used to do. For example, AI can write simple reports, answer customer questions, and even create art. Some people worry that AI will take their jobs away. However, most experts believe that AI will create new types of jobs while making other jobs easier.</p>
    
    <p>The skills that workers need are also changing. In the past, people could learn one skill and use it for their entire career. Now, workers need to keep learning new skills throughout their lives. The most important skills for the future include problem-solving, creativity, and the ability to work with technology.</p>
    
    <p>Companies are also changing how they hire people. Many companies now care more about what you can do than about your university degree. They want to see examples of your work and test your skills. Some companies are using AI to help them find the best candidates for jobs.</p>
    
    <p>Education systems are trying to keep up with these changes. Many schools now teach coding and digital skills from a young age. Universities are creating new programs that combine traditional subjects with technology. Online learning has become much more popular, allowing people to study from anywhere in the world.</p>
    
    <p>The workplace itself is also changing. Many offices now have flexible spaces where people can work in different ways. Some companies have no fixed offices at all – their employees work from coffee shops, co-working spaces, or their homes. This flexibility helps people balance their work and personal lives better.</p>
    
    <p>However, these changes also create new challenges. Not everyone has access to good internet or a quiet place to work from home. Some people miss the social aspects of working in an office with colleagues. Companies need to find ways to keep their teams connected and motivated when they work in different locations.</p>
    
    <p>Looking ahead, experts predict that the future of work will be even more flexible and technology-focused. People might work for several different companies at the same time, or change careers multiple times during their lives. The key to success will be staying curious, learning continuously, and adapting to new technologies and ways of working.</p>
    
    <p>In conclusion, while technology is changing the world of work in dramatic ways, it also creates exciting new possibilities. Workers who embrace these changes and keep developing their skills will find many opportunities in the future job market.</p>
`;

const defaultQuestions = [
  {
    question: "According to the text, what percentage of workers in developed countries work from home at least part of the time?",
    options: ["20%", "35%", "50%", "65%"],
    correct: 1
  },
  {
    question: "What do most experts believe about AI and jobs?",
    options: ["AI will take away all jobs", "AI will create new types of jobs while making others easier", "AI will only affect factory workers", "AI will not change anything"],
    correct: 1
  },
  {
    question: "According to the text, what are the most important skills for the future?",
    options: ["Writing and reading", "Problem-solving, creativity, and working with technology", "Mathematics and science", "Leadership and management"],
    correct: 1
  },
  {
    question: "What challenge is mentioned regarding remote work?",
    options: ["People work too fast", "Companies save too much money", "Not everyone has access to good internet or quiet workspace", "Remote work is illegal in some countries"],
    correct: 2
  },
  {
    question: "What does the text suggest about future careers?",
    options: ["People will have one job for their entire life", "People might work for several companies at once or change careers multiple times", "Only young people will be able to work", "Everyone will work from offices"],
    correct: 1
  }
];

async function generateText() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const topic = document.getElementById('topic').value.trim();
  const language = document.getElementById('language').value;
  const level = document.getElementById('level').value;
  const levelDe = document.getElementById('level-de').value;
  const additionalInfo = document.getElementById('additionalInfo').value.trim();

  if (!apiKey) {
    showError('Please enter your OpenAI API key.');
    return;
  }

  if (!topic) {
    showError('Please enter a topic for your text.');
    return;
  }

  // Show loading
  document.getElementById('setupSection').classList.add('hidden');
  document.getElementById('readingText').classList.remove('hidden');
  document.getElementById('loadingText').classList.remove('hidden');
  document.getElementById('textContent').innerHTML = '';

  try {
    // Generate text
    const prompt = createTextPrompt(topic, level, levelDe, additionalInfo, language);
    const textResponse = await callOpenAI(apiKey, prompt);
    const text = textResponse.choices[0].message.content;

    // Generate questions
    const questionsResponse = await callOpenAI(apiKey, createQuestionsPrompt(text, level));
    const questionsData = JSON.parse(questionsResponse.choices[0].message.content);

    // Set current data
    currentText = text;
    currentWordCount = countWords(text);
    currentQuestions = questionsData.questions;
    correctAnswers = questionsData.questions.map(q => q.correct);

    // Display text
    document.getElementById('loadingText').classList.add('hidden');
    document.getElementById('textContent').innerHTML = text;
    document.getElementById('wordCount').textContent = `Word count: ${currentWordCount}`;

    // Show reading controls
    document.getElementById('instructions').classList.remove('hidden');
    document.getElementById('readingControls').classList.remove('hidden');

  } catch (error) {
    console.error('Error generating text:', error);
    showError('Failed to generate text. Please check your API key and try again.');
    document.getElementById('setupSection').classList.remove('hidden');
    document.getElementById('readingText').classList.add('hidden');
  }
}

function useDefaultText() {
  currentText = defaultText;
  currentWordCount = 611; // Hardcoded word count for the default text
  currentQuestions = defaultQuestions;
  correctAnswers = defaultQuestions.map(q => q.correct);

  document.getElementById('setupSection').classList.add('hidden');
  document.getElementById('readingText').classList.remove('hidden');
  document.getElementById('loadingText').classList.add('hidden');
  document.getElementById('textContent').innerHTML = currentText;
  document.getElementById('wordCount').textContent = `Word count: ${currentWordCount}`;

  document.getElementById('instructions').classList.remove('hidden');
  document.getElementById('readingControls').classList.remove('hidden');
}

async function callOpenAI(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return await response.json();
}

function createTextPrompt(topic, level, levelDe, additionalInfo, language) {
  if (language === 'de') {
    return `Erstelle einen Leseverstehenstext auf DEUTSCH über das Thema "${topic}", geeignet für das Niveau ${levelDe} (${getLevelDescriptionDe(levelDe)}).
    Anforderungen:
    - Sprache: Deutsch
    - Länge: 600-700 Wörter
    - Niveau: ${levelDe} (${getLevelDescriptionDe(levelDe)})
    - Thema: ${topic}
    - Füge einen Titel hinzu
    - Schreibe klar und ansprechend
    - Gliedere in mehrere Absätze
    - Mache den Text informativ und interessant
    ${additionalInfo ? `- Zusätzliche Anforderungen: ${additionalInfo}` : ''}
    Formatiere die Antwort als sauberes HTML mit <h2> für den Titel und <p> für Absätze.`;
  } else {
    return `Create a reading comprehension text about "${topic}" suitable for English level ${level} (${getLevelDescription(level)}).
    Requirements:
    - Length: 600-700 words
    - Level: ${level} (${getLevelDescription(level)})
    - Topic: ${topic}
    - Include a title
    - Write in clear, engaging style
    - Structure with multiple paragraphs
    - Make it informative and interesting
    ${additionalInfo ? `- Additional requirements: ${additionalInfo}` : ''}
    Format the response as clean HTML with <h2> for title and <p> for paragraphs.`;
  }
}

function createQuestionsPrompt(text, level) {
  return `Based on the following text, create 5 comprehension questions suitable for English level ${level}.

    Text: ${text}

    Requirements:
    - 5 multiple choice questions
    - Each question has 4 options (A, B, C, D)
    - Questions should test understanding of main ideas and details
    - Appropriate difficulty for ${level} level
    - Clear, unambiguous questions and answers

    Return the response as JSON in this exact format:
    {
        "questions": [
            {
                "question": "Question text here?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct": 0
            }
        ]
    }

    The "correct" field should be the index (0-3) of the correct answer.`;
}

function getLevelDescription(level) {
  const descriptions = {
    'A1': 'Beginner - basic vocabulary and simple sentences',
    'A2': 'Elementary - common vocabulary and simple grammar',
    'B1': 'Intermediate - more complex sentences and varied vocabulary',
    'B2': 'Upper Intermediate - complex grammar and advanced vocabulary',
    'C1': 'Advanced - sophisticated language and abstract concepts',
    'C2': 'Proficiency - native-like fluency and complexity'
  };
  return descriptions[level] || 'Elementary';
}

function getLevelDescriptionDe(level) {
  const descriptions = {
    'A1': 'Anfänger – Grundwortschatz und einfache Sätze',
    'A2': 'Einsteiger – häufiger Wortschatz und einfache Grammatik',
    'B1': 'Mittelstufe – komplexere Sätze und vielfältiger Wortschatz',
    'B2': 'Oberstufe – komplexe Grammatik und fortgeschrittener Wortschatz',
    'C1': 'Fortgeschritten – anspruchsvolle Sprache und abstrakte Konzepte',
    'C2': 'Experten – nahezu muttersprachliche Beherrschung'
  };
  return descriptions[level] || 'Einsteiger';
}

function countWords(text) {
  return text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(word => word.length > 0).length;
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.textContent = message;
  document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.container').firstChild);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

function startReading() {
  startTime = Date.now();
  document.getElementById('startBtn').classList.add('hidden');
  document.getElementById('finishBtn').classList.remove('hidden');
  document.getElementById('finishBtn').disabled = false;

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (startTime > 0) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById('timer').textContent =
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

function finishReading() {
  endTime = Date.now();
  clearInterval(timerInterval);

  document.getElementById('finishBtn').classList.add('hidden');
  document.getElementById('questionSection').classList.remove('hidden');
  document.getElementById('timer').textContent = 'Time recorded!';

  // Generate questions HTML
  generateQuestionsHTML();

  document.getElementById('questionSection').scrollIntoView({ behavior: 'smooth' });
}

function generateQuestionsHTML() {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = '';

  currentQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const questionHTML = `
            <h3>${index + 1}. ${q.question}</h3>
            <div class="options">
                ${q.options.map((option, optionIndex) => `
                    <label>
                        <input type="radio" name="q${index}" value="${optionIndex}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;

    questionDiv.innerHTML = questionHTML;
    container.appendChild(questionDiv);
  });
}

function submitAnswers() {
  // Check if all questions are answered
  let allAnswered = true;
  const answers = [];

  for (let i = 0; i < currentQuestions.length; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (!answer) {
      allAnswered = false;
      break;
    }
    answers.push(parseInt(answer.value));
  }

  if (!allAnswered) {
    alert('Please answer all questions before submitting!');
    return;
  }

  // Calculate results
  const readingTimeMs = endTime - startTime;
  const readingTimeMin = readingTimeMs / 60000;
  const wpm = Math.round(currentWordCount / readingTimeMin);

  // Calculate comprehension score
  let correct = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correct++;
    }
  }
  const comprehensionPercent = (correct / currentQuestions.length) * 100;

  displayResults(readingTimeMin, wpm, comprehensionPercent, correct);
}

function displayResults(timeMin, wpm, comprehension, correctCount) {
  document.getElementById('questionSection').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');

  const minutes = Math.floor(timeMin);
  const seconds = Math.round((timeMin - minutes) * 60);

  document.getElementById('readingTime').textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('wordsPerMinute').textContent = wpm;
  document.getElementById('comprehensionScore').textContent = comprehension + '%';

  // Provide feedback
  let feedback = `<h3>📊 Analysis:</h3><p>You answered ${correctCount} out of ${currentQuestions.length} questions correctly.</p>`;

  if (wpm < 200) {
    feedback += `<p><strong>Reading Speed:</strong> Your reading speed is below average. The average adult reads 200-300 words per minute. Consider practicing speed reading techniques.</p>`;
  } else if (wpm >= 200 && wpm < 300) {
    feedback += `<p><strong>Reading Speed:</strong> Your reading speed is average. Well done!</p>`;
  } else if (wpm >= 300 && wpm < 400) {
    feedback += `<p><strong>Reading Speed:</strong> Your reading speed is above average. Excellent!</p>`;
  } else {
    feedback += `<p><strong>Reading Speed:</strong> Your reading speed is exceptional! You're a very fast reader.</p>`;
  }

  if (comprehension >= 80) {
    feedback += `<p><strong>Comprehension:</strong> Excellent understanding of the text!</p>`;
  } else if (comprehension >= 60) {
    feedback += `<p><strong>Comprehension:</strong> Good understanding, but there's room for improvement.</p>`;
  } else {
    feedback += `<p><strong>Comprehension:</strong> Consider slowing down to improve understanding.</p>`;
  }

  document.getElementById('feedback').innerHTML = feedback;
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function restartTest() {
  // Reset all variables
  startTime = 0;
  endTime = 0;
  clearInterval(timerInterval);
  currentText = '';
  currentWordCount = 0;
  currentQuestions = [];
  correctAnswers = [];

  // Reset UI
  document.getElementById('setupSection').classList.remove('hidden');
  document.getElementById('instructions').classList.add('hidden');
  document.getElementById('readingControls').classList.add('hidden');
  document.getElementById('startBtn').classList.remove('hidden');
  document.getElementById('finishBtn').classList.add('hidden');
  document.getElementById('finishBtn').disabled = true;
  document.getElementById('readingText').classList.add('hidden');
  document.getElementById('questionSection').classList.add('hidden');
  document.getElementById('results').classList.add('hidden');
  document.getElementById('timer').textContent = 'Ready to start';

  // Clear any error messages
  document.querySelectorAll('.error').forEach(el => el.remove());

  window.scrollTo({ top: 0, behavior: 'smooth' });
}