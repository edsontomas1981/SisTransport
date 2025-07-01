  const api = new ApiService();
  const chatBox = document.getElementById('chat-box');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const phoneNumber = "5581991"; // telefone fixo ou dinâmico

  function addMessage(message, sender = 'user') {
    const messageEl = document.createElement('div');
    messageEl.classList.add('mb-2', 'p-2', 'rounded');

    if (sender === 'user') {
      messageEl.classList.add('bg-primary', 'text-white', 'text-end');
      messageEl.innerHTML = `<strong>Você:</strong> ${message}`;
    } else {
      messageEl.classList.add('bg-secondary', 'text-white');
      messageEl.innerHTML = `<strong>Bot:</strong> ${message}`;
    }

    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const mensagem = userInput.value.trim();
    if (!mensagem) return;

    addMessage(mensagem, 'user');
    userInput.value = '';

    const payload = {
      client: {
        phoneNumber: phoneNumber,
        message: mensagem
      }
    };

    try {
      const response = await api.postData('/chatbot/', payload);
      const respostaBot = response.resposta || "Desculpe, não entendi.";
      addMessage(respostaBot, 'bot');
    } catch (err) {
      addMessage("Erro na comunicação com o servidor.", 'bot');
    }
  });
