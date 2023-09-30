const promptText = document.getElementById('promptText');
const responseInput = document.getElementById('responseInput');
const submitBtn = document.getElementById('submitBtn');
const smileyFace = document.getElementById('smileyFace');

const prompts = [
    "Tell me one thing you're lucky to have.",
    "Name a person who brings joy to your life.",
    "What's a simple pleasure you cherish?",
    "Recall a memory that made you smile.",
    "What's a recent act of kindness you witnessed?",
"Name a place that always brings you peace?",
"What's a talent or skill you're proud of?",
"Recall a time you felt truly content?",
"What's a book or movie that changed your perspective?",
"Name a challenge you overcame that made you stronger?",
"What's a song that instantly lifts your mood?",
"Who is someone you admire and why?",
"Describe a beautiful scene you once witnessed?",
"What's a lesson you learned the hard way but are grateful for?",
"Name a hobby that brings you joy?",
"Recall a compliment you received that made your day?",
"What's a simple thing that always makes you smile?",
"Describe a favorite childhood memory?",
"Who is someone who always supports you?",
"What's a goal you achieved that you're proud of?",
"Name a food that brings back good memories?",
"Recall a time you laughed so hard you cried?",
"What's a favorite piece of art that inspires you?",
"Who taught you something valuable about life?",
"Describe a time you felt truly loved?",
"What's a place you visited that took your breath away?",
"Recall a time you made a positive difference in someone's life?",
"What's a favorite quote that motivates you?",
"Name an animal you feel a special connection with?",
"Describe a dream you had that felt very real?",
"Who is a historical figure you draw inspiration from?",
"Recall a time you felt at one with nature?",
"What's a gift you received that you cherish?",
"Describe a time you took a risk and it paid off?",
"Who is someone you can always rely on?",
"What's a tradition you love?",
"Recall a time you felt truly proud of yourself?",
"Name a scent that brings back memories?",
"What's an act of self-care you indulge in?",
"Describe a time you saw a beautiful act of humanity?",
"Who is a fictional character you resonate with?",
"Recall a moment of serendipity in your life?",
"What's a favorite family memory?",
"Describe a time you felt truly grateful?",
"What's a skill you want to learn?",
"Recall a time you were moved by a piece of music?",
"Who is someone you've never met but are grateful for?",
"Describe a time you experienced a small miracle?",
"What's a favorite holiday memory?",
"Recall a time you felt truly free?",
"Name a teacher or mentor who changed your life?",
"What's a childhood game you loved?",
"Describe a time you were in awe of the universe?",
"Who is someone who changed your life for the better?",
];

// Shuffle the prompts array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(prompts);

const promptElement = document.getElementById('prompt');
const answerElement = document.getElementById('answer');
const smileyElement = document.getElementById('smiley');
const formElement = document.getElementById('promptForm');

let currentPromptIndex = 0;

function showNextPrompt() {
    if (currentPromptIndex < prompts.length) {
        promptElement.textContent = prompts[currentPromptIndex];
        currentPromptIndex++;
    } else {
        // End of prompts, you can reset or show a completion message
        promptElement.textContent = "Thank you for sharing!";
        formElement.style.display = 'none';
    }
}

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    formElement.style.display = 'none';
    smileyElement.style.display = 'block';

    setTimeout(() => {
        smileyElement.style.display = 'none';
        formElement.style.display = 'block';
        answerElement.value = '';
        showNextPrompt();
    }, 1000);
});

showNextPrompt();
