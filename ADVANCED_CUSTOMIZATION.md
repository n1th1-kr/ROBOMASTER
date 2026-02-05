# Advanced Customization Guide

## 🎨 Complete Customization Examples

### 1. Change Theme Colors

**Dark Purple Theme** - Edit both `popup.css` and `content.css`:

```css
/* Replace */
#60a5fa → #a855f7 (primary purple)
#3b82f6 → #7c3aed (dark purple)
#0f172a → #1e1b4b (darker purple background)
#1e293b → #312e81 (purple background)
```

**Light Mode Theme** - `popup.css`:

```css
body {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    color: #1e293b;
}

.checkbox-item {
    background: rgba(226, 232, 240, 0.5);
    border: 1px solid rgba(15, 23, 42, 0.1);
}

.checkbox-item:hover {
    background: rgba(226, 232, 240, 0.8);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 0 15px rgba(96, 165, 250, 0.2);
}
```

### 2. Expand Question Database

**Add 10+ Questions** to `content.js`:

```javascript
const QUESTIONS = [
    // ... existing questions ...
    {
        id: 9,
        question: "What is the chemical symbol for Gold?",
        answers: ["Gd", "Go", "Au", "Ag"],
        correct: 2
    },
    {
        id: 10,
        question: "In what year did the Titanic sink?",
        answers: ["1912", "1913", "1911", "1915"],
        correct: 0
    },
    {
        id: 11,
        question: "What is 15% of 200?",
        answers: ["25", "30", "35", "40"],
        correct: 1
    },
    {
        id: 12,
        question: "What is the largest country by area?",
        answers: ["Canada", "China", "Russia", "USA"],
        correct: 2
    },
    {
        id: 13,
        question: "How many strings does a violin have?",
        answers: ["4", "6", "8", "5"],
        correct: 0
    },
    {
        id: 14,
        question: "What is the square root of 144?",
        answers: ["10", "12", "14", "16"],
        correct: 1
    },
    {
        id: 15,
        question: "What year did the Internet start?",
        answers: ["1969", "1991", "1980", "1985"],
        correct: 1
    },
    {
        id: 16,
        question: "What is the speed of light?",
        answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correct: 0
    }
];
```

### 3. Customize Animations

**Faster Animations** - Edit `content.css`:

```css
/* Speed up fade-in */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
#earn-your-scroll-overlay {
    animation: fadeIn 0.2s ease-in-out; /* Changed from 0.4s */
}

/* Slower shake for dramatic effect */
@keyframes shake {
    0%, 100% { transform: translate(-50%, -50%) translateX(0); }
    10% { transform: translate(-50%, -50%) translateX(-10px); } /* Was -5px */
    20% { transform: translate(-50%, -50%) translateX(10px); }
    /* ... rest remains same ... */
}
#earn-your-scroll-overlay.shake .overlay-container {
    animation: shake 0.8s ease-in-out; /* Changed from 0.5s */
}
```

### 4. Add Difficulty Levels

**Modify content.js** to include difficulty:

```javascript
const QUESTIONS = [
    {
        id: 1,
        difficulty: 'easy',
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        id: 2,
        difficulty: 'medium',
        question: "What is the chemical symbol for Hydrogen?",
        answers: ["He", "H", "Hy", "Ho"],
        correct: 1
    },
    {
        id: 3,
        difficulty: 'hard',
        question: "What is the Avogadro's number?",
        answers: ["6.02 × 10²²", "6.02 × 10²³", "6.02 × 10²⁴", "6.02 × 10²¹"],
        correct: 1
    }
];

// Shuffle questions by difficulty
function selectByDifficulty(difficulty) {
    const filtered = QUESTIONS.filter(q => q.difficulty === difficulty);
    return filtered[Math.floor(Math.random() * filtered.length)];
}
```

### 5. Customize Overlay Layout

**Vertical Layout** - Edit `content.css`:

```css
.overlay-container {
    flex-direction: column;
    align-items: stretch;
}

.question-container {
    order: 1;
}

.answers-container {
    order: 2;
}

.overlay-header {
    order: 0;
}
```

### 6. Change Reward System

**Variable Rewards Based on Speed** - Edit `content.js`:

```javascript
function handleCorrectAnswer() {
    clearInterval(timerInterval);

    // Calculate reward based on speed
    const secondsRemaining = timeRemaining;
    const rewardSeconds = Math.min(60 + (secondsRemaining * 2), 180); // Max 3 minutes

    // Update question count
    chrome.storage.local.get(['questionsAnswered'], (result) => {
        const count = (result.questionsAnswered || 0) + 1;
        chrome.storage.local.set({ questionsAnswered: count });
    });

    // Set variable bypass
    const bypassUntil = Date.now() + (rewardSeconds * 1000);
    chrome.storage.local.set({ bypassUntil: bypassUntil }, () => {
        // Show reward message
        const overlay = document.getElementById('earn-your-scroll-overlay');
        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(34, 197, 94, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 1000000;
            animation: slideUp 0.5s ease-out;
        `;
        message.textContent = `🎉 +${rewardSeconds}s Earned!`;
        overlay.appendChild(message);

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = 'auto';
                overlayActive = false;
            }, 500);
        }, 1500);
    });
}
```

### 7. Add Sound Effects

**Add Audio Feedback** - Edit `content.js`:

```javascript
function playSound(type) {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'correct') {
        oscillator.frequency.value = 800; // Higher pitch for correct
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'wrong') {
        oscillator.frequency.value = 300; // Lower pitch for wrong
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// In handleAnswer function:
if (selectedIndex === currentQuestion.correct) {
    playSound('correct');
    handleCorrectAnswer();
} else {
    playSound('wrong');
    overlay.classList.add('shake');
}
```

### 8. Custom Site Categories

**Organize Blocked Sites** - Edit `popup.html`:

```html
<div class="section">
    <h2>Social Media</h2>
    <div class="checkbox-list">
        <label class="checkbox-item">
            <input type="checkbox" name="sites" value="instagram.com">
            <span class="checkbox-text">Instagram</span>
        </label>
        <label class="checkbox-item">
            <input type="checkbox" name="sites" value="facebook.com">
            <span class="checkbox-text">Facebook</span>
        </label>
    </div>
</div>

<div class="section">
    <h2>Video Platforms</h2>
    <div class="checkbox-list">
        <label class="checkbox-item">
            <input type="checkbox" name="sites" value="youtube.com">
            <span class="checkbox-text">YouTube</span>
        </label>
        <label class="checkbox-item">
            <input type="checkbox" name="sites" value="tiktok.com">
            <span class="checkbox-text">TikTok</span>
        </label>
    </div>
</div>
```

### 9. Add Statistics Dashboard

**Expand Stats in popup.html**:

```html
<div class="stats-card">
    <div class="stat-item">
        <span class="stat-label">Questions Today</span>
        <span class="stat-value" id="todayCount">0</span>
    </div>
    <div class="stat-item">
        <span class="stat-label">Current Streak</span>
        <span class="stat-value" id="streakCount">0</span>
    </div>
    <div class="stat-item">
        <span class="stat-label">Lifetime Answered</span>
        <span class="stat-value" id="questionsAnswered">0</span>
    </div>
</div>
```

**Track in popup.js**:

```javascript
function loadStatistics() {
    chrome.storage.local.get(['questionsAnswered', 'lastAnswerDate', 'currentStreak'], (result) => {
        const today = new Date().toDateString();
        const lastDate = result.lastAnswerDate;
        let streak = result.currentStreak || 0;

        if (lastDate !== today) {
            // New day, continue or reset streak
            if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
                streak++; // Continue streak
            } else {
                streak = 1; // Reset streak
            }
            chrome.storage.local.set({ lastAnswerDate: today, currentStreak: streak });
        }

        document.getElementById('questionsAnswered').textContent = result.questionsAnswered || 0;
        document.getElementById('streakCount').textContent = streak;
    });
}
```

### 10. Advanced Styling - Neon Theme

**Edit popup.css** for cyberpunk look:

```css
body {
    background: linear-gradient(135deg, #0a0e27 0%, #16213e 100%);
    color: #00ff88;
    text-shadow: 0 0 10px #00ff88;
}

.checkbox-item:hover {
    box-shadow: 0 0 20px #00ff88, inset 0 0 15px rgba(0, 255, 136, 0.1);
    border-color: #00ff88;
}

.btn-primary {
    background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
    color: #0a0e27;
    box-shadow: 0 0 20px #00ff88;
}

.btn-primary:hover {
    box-shadow: 0 0 40px #00ff88, inset 0 0 20px rgba(0, 255, 136, 0.3);
}
```

---

## 📝 Summary

All of these customizations maintain the **HTML-centric** approach while adding powerful features:

- 🎨 Theme customization
- 📚 Expandable question database
- ⚡ Animation tweaking
- 🎯 Difficulty levels
- 🎁 Dynamic rewards
- 🔊 Audio feedback
- 📊 Advanced statistics
- 🌈 Unique visual themes

Pick and mix any combination to create your perfect productivity extension!
