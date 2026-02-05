# Quick Start Guide - Earn Your Scroll

## 🚀 Getting Started in 5 Minutes

### Step 1: Load the Extension
1. Open **Microsoft Edge**
2. Type `edge://extensions/` in the address bar
3. **Enable "Developer mode"** (toggle in top-right)
4. Click **"Load unpacked"**
5. Navigate to this project folder and select it
6. The extension is now loaded!

### Step 2: Access Settings
1. Click the extension icon in the top-right toolbar
2. The **"Earn Your Scroll Settings"** popup will open
3. You'll see your "Lifetime Questions Answered" counter

### Step 3: Configure Restrictions
1. **Check boxes** for sites you want to block:
   - YouTube
   - Instagram
   - TikTok
   - Reddit
   - Facebook

2. **Add custom sites** by typing domain names:
   - Example: `example.com`
   - Click "Add" or press Enter
   - Click "Remove" to delete custom sites

3. Click **"Save Settings"**

### Step 4: Test It Out
1. Visit one of your restricted sites (e.g., YouTube)
2. A **full-screen flashcard overlay** should appear
3. **Read the question** and select an answer
4. ✅ **Correct answer**: You get 60 seconds to browse
5. ❌ **Wrong answer**: Questions shuffle, try again

### Step 5: Customize (Optional)

#### Add More Questions
Edit `content.js` and expand the `QUESTIONS` array:
```javascript
{
    id: 9,
    question: "Your new question?",
    answers: ["Option A", "Correct Answer", "Option C", "Option D"],
    correct: 1  // Index of correct answer
}
```

#### Change Blocked Sites
Edit `background.js`:
```javascript
restrictedSites: ['youtube.com', 'yoursite.com', ...]
```

#### Modify Colors
Edit `popup.css` and `content.css`:
- Change `#60a5fa` for primary color
- Change `#0f172a` for background

---

## 📱 File Structure

```
Earn Your Scroll/
├── manifest.json          ← Extension configuration
├── popup.html             ← Settings UI
├── popup.css              ← Settings styles
├── popup.js               ← Settings logic
├── content.js             ← Overlay logic
├── content.css            ← Overlay styles
├── background.js          ← Service worker
└── icons/                 ← Extension icons
```

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `content.js` | Checks if page is restricted, shows overlay, handles answers |
| `popup.js` | Manages settings, saves preferences, displays stats |
| `background.js` | Stores data, manages bypass timer |
| `content.css` | Glassmorphism, animations, button glows |
| `popup.css` | Dashboard gradient, dark theme |

## ⚙️ Common Customizations

### Make it Easier/Harder
Adjust timer in `content.js`:
```javascript
timeRemaining = 30;  // Change from 60
```

### Add Your Own Questions
Keep adding to the `QUESTIONS` array in `content.js`:
```javascript
const QUESTIONS = [
    // Existing questions...
    {
        id: 10,
        question: "What is 2+2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    }
];
```

### Change Reward Time
In `content.js`, find:
```javascript
const bypassUntil = Date.now() + 60000;
```
Change `60000` to:
- `30000` for 30 seconds
- `120000` for 2 minutes
- `300000` for 5 minutes

### Disable a Site Temporarily
Go to Settings popup and uncheck the site, then "Save Settings"

---

## 🐛 Debugging Tips

### Check if Content Script Loaded
1. Open DevTools (F12) on any website
2. Go to Console tab
3. Type: `chrome.storage.local.get(null, (d) => console.log(d))`
4. Should show your storage data

### View Restricted Sites
In Console:
```javascript
chrome.storage.local.get(['restrictedSites'], (r) => console.log(r.restrictedSites))
```

### Check Bypass Status
```javascript
chrome.storage.local.get(['bypassUntil'], (r) => {
    const now = Date.now();
    console.log('Active:', now < r.bypassUntil);
})
```

### Clear All Data (Reset)
```javascript
chrome.storage.local.clear();
```

---

## 🎨 Visual Customization Examples

### Change Primary Blue to Purple
In both `.css` files, replace:
```css
/* Old */
color: #60a5fa;
box-shadow: 0 0 10px rgba(96, 165, 250, 0.4);

/* New */
color: #a855f7;
box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
```

### Make Overlay More Transparent
In `content.css`:
```css
.overlay-backdrop {
    background: rgba(15, 23, 42, 0.7); /* Was 0.85 */
    backdrop-filter: blur(20px); /* Increase blur */
}
```

### Faster Animations
In `content.css`:
```css
animation: slideUp 0.3s ease-out; /* Was 0.5s */
```

---

## ✅ Checklist Before Using

- [ ] Extension loaded successfully
- [ ] Icon appears in toolbar
- [ ] Settings popup opens
- [ ] Can toggle restrictions
- [ ] Can add custom sites
- [ ] Tested on a restricted site
- [ ] Overlay appears correctly
- [ ] Questions display properly
- [ ] Answer buttons are clickable
- [ ] Correct answer removes overlay
- [ ] Timer counts down
- [ ] Counter increments on correct answer

---

## 📚 Next Steps

1. **Customize questions** to match your learning goals
2. **Add more sites** you want to focus on
3. **Tweak animations** to your preference
4. **Share with friends** and get feedback

Enjoy productive browsing! 🎉
