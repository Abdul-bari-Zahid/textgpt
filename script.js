const API_KEY = 'AIzaSyBbrdRM_UDRLEkl-5V2b6vVUd8XiZFsZWo'; 
const promptInput = document.getElementById('prompt');
const submitBtn = document.getElementById('submit');
const chatContainer = document.getElementById('chatContainer');
const historyDiv = document.getElementById('history');
const imageInput = document.getElementById('imageInput');
const voiceBtn = document.getElementById('voiceBtn');
const search = document.getElementById('search');

let user = {
  message: '',
  file: null
};

function createChatBox(content, type) {
  const box = document.createElement('div');
  box.className = type === 'user' ? 'user-chat-box' : 'ai-chat-box';
  box.innerHTML = `
    <img src="${type === 'user' ? './user.png' : './ai.png'}" alt="${type}">
    <div class="${type === 'user' ? 'user-chat-area' : 'ai-chat-area'}">${content}</div>
  `;
  return box;
}

async function fetchAIResponse(userPrompt) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBbrdRM_UDRLEkl-5V2b6vVUd8XiZFsZWo"
  const payload = {
    contents: [{
      parts: [{ text: userPrompt }]
    }]
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  try {
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    return "Sorry, no reply. Please try again.";
  }
}

function appendToHistory(prompt) {
  const p = document.createElement('p');
  p.textContent = prompt;
  p.onclick = () => {
    promptInput.value = p.textContent;
  };
  historyDiv.appendChild(p);
}

async function handleUserInput() {
  if (!promptInput.value.trim() && !user.file) return;

  user.message = promptInput.value.trim();
  const userBox = createChatBox(user.message + (user.file ? `<br><img src="${user.file}" width="100"/>` : ""), 'user');
  chatContainer.appendChild(userBox);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  appendToHistory(user.message);

  promptInput.value = '';
  user.file = null;

  
  const aiBox = createChatBox('Typing...', 'ai');
  chatContainer.appendChild(aiBox);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  
  const aiReply = await fetchAIResponse(user.message);

  
  aiBox.querySelector('.ai-chat-area').textContent = aiReply;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

submitBtn.addEventListener('click', handleUserInput);

promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleUserInput();
});

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    user.file = e.target.result;
  };
  reader.readAsDataURL(file);
});

voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    promptInput.value = transcript;
  };
});

function newPrompt() {
  
  chatContainer.innerHTML = '';

  
  const startMsg = createChatBox("Hello! How Can I Help you Today?", "ai");
  chatContainer.appendChild(startMsg);

  promptInput.value = '';
  promptInput.focus();
}

search.addEventListener('input', () => {
  const value = search.value.toLowerCase();
  const prompts = historyDiv.querySelectorAll('p');
  prompts.forEach(p => {
    if (p.textContent.toLowerCase().includes(value)) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
});