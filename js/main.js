document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  const messages = [
    {
      message:
        "Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів.",
      date: "11:45",
    },
    {
      message:
        "Приєднуйтесь до нашого нового курсу! Інтерактивні заняття, практичні завдання, сертифікат.",
      date: "11:45",
    },
    {
      message:
        "Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів.",
      date: "11:45",
    },
  ];

  const questions = [
    {
      question: "Хочете дізнатися більше?",
      options: ["Так", "Ні"],
    },
    {
      question: "Чи був у вас досвід пов'язаний із Арбітражем трафіку?",
      options: ["Так", "Ні", "Чув про це"],
    },
    {
      question: "Скільки часу ви могли б приділяти на день?",
      options: ["Одна година", "2-3 години", "5 і більше"],
    },
  ];

  let currentQuestionIndex = 0;

  function appendMessage(text, sender = "bot") {
    const messageContainer = document.createElement("div");
    messageContainer.className = `chat-message ${sender}`;

    if (typeof text === "string") {
      const messageText = document.createElement("p");

      messageText.className = `chat-question ${sender}`;
      messageText.textContent = text;

      messageContainer.appendChild(messageText);
    } else if (typeof text === "object" && text.message) {
      const messageText = document.createElement("p");

      messageText.className = `message-text`;
      messageText.textContent = text.message;

      messageContainer.appendChild(messageText);

      const messageDate = document.createElement("span");

      messageDate.className = `message-date`;
      messageDate.textContent = text.date;

      messageContainer.appendChild(messageDate);
    }

    chatMessages.appendChild(messageContainer);
  }

  function renderQuestion() {
    const question = questions[currentQuestionIndex];
    appendMessage(question.question);

    chatInput.innerHTML = "";
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = `btn-answer`;
      button.textContent = option;
      button.addEventListener("click", () => handleAnswer(option));
      chatInput.appendChild(button);
    });
  }

  function handleAnswer(answer) {
    appendMessage(answer, "user");

    if (currentQuestionIndex === 0 && answer === "Ні") {
      appendMessage("Дякую за вашу відповідь, чекаємо на ваше повернення");
      chatInput.innerHTML = "";
      return;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      appendMessage(
        "Дякую! Наша компанія дуже зацікавлена вами, будь ласка, заповніть форму."
      );
      renderForm();
    }
  }

  function renderForm() {
    chatInput.innerHTML = `
        <form id="chat-form>
            <input type="text" name="firstName" class="input-form input-firstName" placeholder="Ім'я" required>
            <input type="text" name="lastName" class="input-form input-lastName" placeholder="Прізвище" required>
            <input type="email" name="email" class="input-form input-email" placeholder="Email" required>
            <input type="tel" name="phone" class="input-form input-number" placeholder="Телефон" required>
            <button class="btn-chat-from" type="submit">Надіслати</button>
        </form>
    `;
    const form = document.getElementById("chat-form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const firstName = formData.get("firstName").trim();
      const lastName = formData.get("lastName").trim();
      const email = formData.get("email").trim();
      const phone = formData.get("phone").trim();

      const errors = errorMessageForm(firstName, lastName, email, phone);

      if (errors.length > 0) {
        alert(errors.join(" "));
        return;
      }

      const data = Object.fromEntries(formData.entries());
      window.localStorage.setItem("form-data", JSON.stringify(data, null, 2));

      window.location.href = "./success.html";
    });

    function errorMessageForm(firstName, lastName, email, phone) {
      const errors = [];

      if (!firstName) errors.push("Поле 'Ім'я' обов'язкове.");
      if (!lastName) errors.push("Поле 'Прізвище' обов'язкове.");
      if (!validateEmail(email)) errors.push("Поле 'Email' має бути дійсним.");
      if (!validatePhone(phone))
        errors.push("Поле 'Телефон' має бути дійсним.");

      return errors;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10,13}$/;
        return phoneRegex.test(phone);
    }
  }
  
  messages.forEach((msg) => appendMessage(msg));
  setTimeout(renderQuestion, 900);
});
