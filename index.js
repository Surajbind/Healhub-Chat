const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY = "";

const predefinedResponses = {
    "1": "I'm sorry to hear that. Can you tell me a bit more about what's going on, or is there a specific issue on your mind?",
    "2": "I'm sorry to hear that. Can you tell me a bit more about what's going on, or is there a specific issue on your mind? ",
    "3": "I'm sorry to hear that. Can you tell me a bit more about what's going on, or is there a specific issue on your mind? ",
    "4": "Thanks for sharing. Is there something specific on your mind or bothering you that you'd like to talk about? ",
    "5": "Thanks for sharing. Is there something specific on your mind or bothering you that you'd like to talk about? ",
    "6": "Thanks for sharing. Is there something specific on your mind or bothering you that you'd like to talk about? ",
    "7": "That's great to hear! What's contributing to your positive mood? ",
    "8": "That's great to hear! What's contributing to your positive mood? ",
    "9": "That's great to hear! What's contributing to your positive mood? ",
    "10": "That's great to hear! What's contributing to your positive mood? ",
    "dealing with family issues.": "I'm here for you. Family issues can be challenging. If you're comfortable, you can share more details, and we can talk about ways to cope or seek support.",
    "struggling with stress from school.": "School-related stress can be tough. Are there specific aspects causing stress, like exams or assignments? Let's explore strategies to manage the stress together.",
    "just going through a rough patch.": "I understand. Everyone goes through rough patches. If you're comfortable, sharing more about what you're going through could help us figure out ways to navigate this together.",
    "feeling lonely and disconnected.": "I'm here to keep you company. Loneliness is a common feeling. Is there something specific contributing to this, or would you like suggestions on connecting with others?",
    "dealing with anxiety about the future.": "The future can be overwhelming. It's okay to feel anxious. Let's talk about your concerns and explore ways to manage anxiety and focus on the present.",
    "feeling overwhelmed by study.": "I'm truly sorry to hear about your loss. It's okay to grieve, and I'm here to offer support. If you'd like, we can discuss coping mechanisms or simply share your thoughts.",
    "feeling unmotivated": "I'm sorry to hear that you're feeling unmotivated. It's a common challenge, and it's okay to feel this way. Let's explore some strategies together to help boost your motivation",
    "recently faced a personal loss": "I'm truly sorry to hear that you've recently faced a personal loss. Dealing with grief can be incredibly challenging. It's important to give yourself the time and space to process your emotions. If you feel comfortable, you may consider the following"
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">🗨️</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    const predefinedResponse = predefinedResponses[userMessage];
    if (predefinedResponse) {
        messageElement.textContent = predefinedResponse;
    } else {
        // Use OpenAI API for responses not in predefined list
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": userMessage }]
            })
        };

        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                messageElement.textContent = data.choices[0].message.content;
            })
            .catch((err) => {
                messageElement.textContent = "I am here for you.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = '';

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatBotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
