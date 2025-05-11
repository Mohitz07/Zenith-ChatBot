async function askQuestion() {
  const questionInput = document.getElementById('question');
  const answerDiv = document.getElementById('answer');
  const question = questionInput.value.trim();

  if (!question) {
    answerDiv.textContent = "Please type a question before asking.";
    return;
  }

  answerDiv.textContent = "Thinking...";

  try {
    const response = await fetch('http://localhost:8080/api/qna/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const answerText = await response.text();
    answerDiv.textContent = answerText;
  } catch (error) {
    answerDiv.textContent = "Error: " + error.message;
  }

  questionInput.value = '';
}
