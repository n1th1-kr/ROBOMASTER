// Sample questions database
const QUESTIONS = [
    {
        id: 1,
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        id: 2,
        question: "Which planet is closest to the sun?",
        answers: ["Venus", "Mercury", "Earth", "Mars"],
        correct: 1
    },
    {
        id: 3,
        question: "What is 15 + 27?",
        answers: ["40", "42", "38", "45"],
        correct: 1
    },
    {
        id: 4,
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
        correct: 1
    },
    {
        id: 5,
        question: "What is the largest ocean?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        id: 6,
        question: "In what year did World War II end?",
        answers: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        id: 7,
        question: "What is the smallest prime number?",
        answers: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        id: 8,
        question: "Which element has the symbol 'Au'?",
        answers: ["Silver", "Aluminum", "Gold", "Argon"],
        correct: 2
    }
];

let overlayActive = false;
let currentQuestion = null;
let currentQuestionIndex = 0;
let timeRemaining = 60;
let timerInterval = null;

// Initialize content script
function initializeContentScript() {
    // Check if we're on a restricted site
    checkRestrictedSite();

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'checkSite') {
            checkRestrictedSite();
        }
    });
}

// Check if current site is restricted
function checkRestrictedSite() {
    const currentDomain = window.location.hostname;

    chrome.storage.local.get(['restrictedSites'], (result) => {
        const restrictedSites = result.restrictedSites || [];

        // Check if current domain matches any restricted site
        const isRestricted = restrictedSites.some(site => {
            return currentDomain.includes(site) || site.includes(currentDomain);
        });

        if (isRestricted) {
            // Check if user has active bypass
            chrome.storage.local.get(['bypassUntil'], (bypassResult) => {
                const bypassUntil = bypassResult.bypassUntil || 0;
                const now = Date.now();

                if (now > bypassUntil) {
                    // No active bypass, show overlay
                    if (!overlayActive) {
                        showFlashcardOverlay();
                    }
                }
            });
        }
    });
}

// Show flashcard overlay
function showFlashcardOverlay() {
    overlayActive = true;

    // Select a random question
    currentQuestionIndex = Math.floor(Math.random() * QUESTIONS.length);
    currentQuestion = QUESTIONS[currentQuestionIndex];
    timeRemaining = 60;

    // Create overlay HTML
    const overlayHTML = `
        <div id="earn-your-scroll-overlay">
            <div class="overlay-backdrop"></div>
            <div class="overlay-container">
                <div class="overlay-header">
                    <h2>Answer to Continue</h2>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 100%"></div>
                    </div>
                    <p class="time-left"><span id="timeCounter">60</span>s</p>
                </div>

                <div class="question-container">
                    <p class="question-text">${currentQuestion.question}</p>
                </div>

                <div class="answers-container">
                    ${currentQuestion.answers.map((answer, index) => `
                        <button class="answer-btn" data-index="${index}">
                            ${String.fromCharCode(65 + index)}. ${answer}
                        </button>
                    `).join('')}
                </div>

                <p class="overlay-hint">Select the correct answer to earn 60 seconds of browsing time</p>
            </div>
        </div>
    `;

    // Inject HTML
    const overlayElement = document.createElement('div');
    overlayElement.innerHTML = overlayHTML;
    document.body.appendChild(overlayElement.firstElementChild);

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Setup event listeners
    setupOverlayListeners();

    // Start timer
    startTimer();

    // Prevent interaction with page
    document.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
}

// Setup overlay event listeners
function setupOverlayListeners() {
    const answerButtons = document.querySelectorAll('.answer-btn');

    answerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedIndex = parseInt(e.target.dataset.index);
            handleAnswer(selectedIndex);
        });
    });
}

// Handle answer selection
function handleAnswer(selectedIndex) {
    const overlay = document.getElementById('earn-your-scroll-overlay');
    
    if (selectedIndex === currentQuestion.correct) {
        // Correct answer
        handleCorrectAnswer();
    } else {
        // Wrong answer - shake effect
        overlay.classList.add('shake');
        setTimeout(() => {
            overlay.classList.remove('shake');
        }, 500);

        // Shuffle answers
        shuffleQuestion();
    }
}

// Handle correct answer
function handleCorrectAnswer() {
    clearInterval(timerInterval);

    // Update question count
    chrome.storage.local.get(['questionsAnswered'], (result) => {
        const count = (result.questionsAnswered || 0) + 1;
        chrome.storage.local.set({ questionsAnswered: count });
    });

    // Set 60-second bypass
    const bypassUntil = Date.now() + 60000; // 60 seconds
    chrome.storage.local.set({ bypassUntil: bypassUntil }, () => {
        // Remove overlay
        const overlay = document.getElementById('earn-your-scroll-overlay');
        overlay.classList.add('fade-out');

        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = 'auto';
            overlayActive = false;

            // Remove event listeners
            document.removeEventListener('scroll', preventScroll);
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
        }, 500);
    });
}

// Shuffle question answers
function shuffleQuestion() {
    const answersContainer = document.querySelector('.answers-container');
    const answerButtons = Array.from(answersContainer.querySelectorAll('.answer-btn'));

    // Fisher-Yates shuffle
    for (let i = answerButtons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerButtons[i], answerButtons[j]] = [answerButtons[j], answerButtons[i]];
    }

    // Update button order
    answersContainer.innerHTML = '';
    answerButtons.forEach(btn => {
        answersContainer.appendChild(btn);
    });

    // Re-setup listeners
    setupOverlayListeners();
}

// Start countdown timer
function startTimer() {
    const timeCounter = document.getElementById('timeCounter');
    const progressFill = document.querySelector('.progress-fill');

    timerInterval = setInterval(() => {
        timeRemaining--;
        timeCounter.textContent = timeRemaining;
        const percentage = (timeRemaining / 60) * 100;
        progressFill.style.width = percentage + '%';

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            // Optionally, refresh page or show message
        }
    }, 1000);
}

// Prevent scroll/interaction
function preventScroll(e) {
    if (document.getElementById('earn-your-scroll-overlay')) {
        e.preventDefault();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentScript);
} else {
    initializeContentScript();
}

// Periodically check if user still has active bypass
setInterval(() => {
    if (!overlayActive) {
        checkRestrictedSite();
    }
}, 5000);
