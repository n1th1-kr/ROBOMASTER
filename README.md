# Earn Your Scroll - Microsoft Edge Extension

A productivity-boosting browser extension that helps you manage time spent on distracting websites by requiring you to answer educational questions before accessing restricted sites.

## Features

✨ **Beautiful Dashboard** - Dark theme with glassmorphism UI
📚 **Smart Flashcard System** - Random questions from a curated database
⏱️ **60-Second Rewards** - Earn browsing time by answering correctly
🎨 **Smooth Animations** - Shake effect on wrong answers, fade transitions
🔒 **Site Blocking** - Block YouTube, Instagram, TikTok, Reddit, Facebook + custom sites
📊 **Progress Tracking** - Track lifetime questions answered

## Installation

### For Development/Testing:

1. **Clone or Download** this repository
2. **Open Microsoft Edge** and go to `edge://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"** and select this project folder
5. The extension should now appear in your extension menu

### Files Included:

```
📦 Earn Your Scroll/
├── manifest.json          # Extension configuration
├── popup.html            # Settings dashboard
├── popup.css             # Dashboard styles
├── popup.js              # Dashboard functionality
├── content.js            # Page overlay logic
├── content.css           # Overlay styles
├── background.js         # Service worker
├── icons/                # Extension icons
└── README.md             # This file
```

## How It Works

### 1. **Settings Dashboard** (popup.html)
   - Toggle restriction on pre-set sites
   - Add custom domains to block
   - View lifetime statistics

### 2. **Content Detection** (content.js)
   - Monitors active tab domain
   - Checks against restricted sites list
   - Shows overlay only when conditions are met

### 3. **Flashcard Overlay**
   - Full-screen, non-dismissible prompt
   - Random question from database
   - 4 multiple-choice answers
   - 60-second countdown timer

### 4. **Answer Logic**
   - ✅ **Correct**: Unlocks 60 seconds of browsing + increments counter
   - ❌ **Wrong**: Answers shuffle, try again
   - ⏰ **Timer**: Counts down during session

## Customization

### Adding More Questions

Edit the `QUESTIONS` array in `content.js`:

```javascript
const QUESTIONS = [
    {
        id: 1,
        question: "Your question here?",
        answers: ["Wrong1", "Correct", "Wrong2", "Wrong3"],
        correct: 1  // Index of correct answer (0-3)
    },
    // Add more...
];
```

### Changing Default Restricted Sites

Edit the default sites in `background.js`:

```javascript
restrictedSites: ['youtube.com', 'instagram.com', 'tiktok.com', 'reddit.com', 'facebook.com']
```

### Adjusting Colors & Styling

Modify gradients and colors in:
- `popup.css` - Main color scheme
- `content.css` - Overlay appearance

Current theme:
- Primary: `#60a5fa` (Blue)
- Background: `#0f172a` to `#1e293b` (Dark Navy)
- Accent: `#a78bfa` (Purple)

### Changing Reward Duration

In `content.js`, modify:
```javascript
const bypassUntil = Date.now() + 60000; // 60 seconds
```

Change `60000` to desired milliseconds.

## API & Storage

### Chrome Storage Structure

```javascript
{
    restrictedSites: ['youtube.com', ...],    // Array of blocked domains
    customSites: ['example.com', ...],        // User-added domains
    questionsAnswered: 42,                    // Lifetime count
    bypassUntil: 1707000000000                // Timestamp of bypass expiry
}
```

### Content-Background Communication

- **getStats**: Request current statistics
- **updateBypass**: Update bypass timestamp
- **checkSite**: Check if site is restricted

## Permissions Explained

- `storage` - Save/load settings and statistics
- `scripting` - Inject overlay HTML into pages
- `*://*/*` - Access all websites

## Browser Compatibility

- ✅ Microsoft Edge 90+
- ✅ Chrome 90+ (with minor adjustments)
- ✅ Brave, Opera (Chromium-based)

## Troubleshooting

### Overlay not showing
1. Check if site is in restricted list
2. Verify content.js is injected (check DevTools console)
3. Ensure permissions are granted

### Bypass not working
1. Clear browser cache
2. Check if current time > `bypassUntil`
3. Inspect storage in `edge://extensions/` → Details → Storage

### Custom sites not saving
1. Verify domain format (e.g., `example.com`)
2. Check for typos
3. Reload extension after changes

## Development Tips

### Enable Debug Mode
Add to `background.js`:
```javascript
console.log('Debug:', chrome.storage);
```

### View Storage
1. Go to `edge://extensions/`
2. Click "Details" on extension
3. Look for "Storage" section

### Test Content Script
Open DevTools (F12) on any website and run:
```javascript
chrome.storage.local.get(null, (items) => console.log(items));
```

## Features Roadmap

- [ ] Dark/Light theme toggle
- [ ] Spaced repetition algorithm
- [ ] Difficulty levels
- [ ] Leaderboard
- [ ] Custom question upload
- [ ] Session history
- [ ] Category-based questions
- [ ] Multi-language support

## License

MIT License - Feel free to modify and distribute

## Support

For issues or suggestions, please check the troubleshooting section or review the console for errors.

---

**Made with ❤️ for better productivity**
