# ⚡ Quick Reference Card

## 🟢 START HERE (First 5 Minutes)

### Installation
```
1. Open: edge://extensions/
2. Enable: Developer mode (top-right)
3. Click: Load unpacked
4. Select: This project folder
✓ Done! Check toolbar for extension icon
```

### Test It
```
1. Click extension icon
2. Configure which sites to block
3. Visit blocked site
4. Answer question to continue
```

---

## 📋 File Cheat Sheet

| When You Want To... | Edit This File | Find This... |
|-------------------|---|---|
| **Add Questions** | `content.js` | `const QUESTIONS = [` |
| **Change Colors** | `popup.css` + `content.css` | `#60a5fa` |
| **Change Reward Time** | `content.js` | `Date.now() + 60000` |
| **Edit Dashboard** | `popup.html` | `<input>` or `<label>` |
| **Change Animations** | `content.css` | `@keyframes` |
| **Add Site Categories** | `popup.html` | `.checkbox-list` |
| **Modify Button Style** | `popup.css` or `content.css` | `.btn-primary` |
| **Change Storage Logic** | `background.js` | `chrome.storage` |

---

## 🎨 Color Codes

```css
Primary Blue:    #60a5fa  (rgb(96, 165, 250))
Dark Blue:       #3b82f6  (rgb(59, 130, 246))
Dark BG:         #0f172a  (rgb(15, 23, 42))
Light BG:        #1e293b  (rgb(30, 41, 59))
Accent Purple:   #a78bfa  (rgb(167, 139, 250))
Text Primary:    #f1f5f9  (rgb(241, 245, 249))
Text Secondary:  #94a3b8  (rgb(148, 163, 184))
Success Green:   #22c55e  (rgb(34, 197, 94))
```

**To change theme**: Replace `#60a5fa` with your color in both CSS files

---

## ⏱️ Animation Timings

```css
fadeIn:   0.4s   (Overlay entrance)
slideDown: 0.5s  (Dashboard sections)
slideUp:  0.5s   (Smooth pop-in)
shake:    0.5s   (Wrong answer)
fadeOut:  0.5s   (Correct answer)
glow:     2s     (Button hover loop)
```

**To speed up**: Change `0.5s` to `0.3s`
**To slow down**: Change `0.5s` to `0.8s`

---

## 💾 Storage Keys

```javascript
{
    restrictedSites: ['youtube.com', ...],
    customSites: ['example.com', ...],
    questionsAnswered: 42,
    bypassUntil: 1707000000000
}
```

**Access in DevTools Console**:
```javascript
chrome.storage.local.get(null, console.log);
```

---

## 🎯 Common Questions

### Q: How do I add more questions?
**A**: Edit `content.js` → Find `QUESTIONS` array → Add new object:
```javascript
{
    id: 9,
    question: "Your question?",
    answers: ["Wrong", "Correct", "Wrong", "Wrong"],
    correct: 1
}
```

### Q: How do I change the reward time?
**A**: Edit `content.js` → Find `60000` → Change to:
- `30000` = 30 seconds
- `120000` = 2 minutes
- `300000` = 5 minutes

### Q: How do I change colors?
**A**: Edit `.css` files → Replace `#60a5fa` with your color

### Q: How do I disable an animation?
**A**: Edit `content.css` → Find animation name → Change `animation: NAME 0.5s` to `animation: none`

### Q: How do I test without waiting 60 seconds?
**A**: DevTools Console:
```javascript
chrome.storage.local.clear();
```
Then reload page to trigger overlay again

---

## 🔧 DevTools Debugging

### View All Data
```javascript
chrome.storage.local.get(null, console.log);
```

### Check Bypass Status
```javascript
chrome.storage.local.get(['bypassUntil'], (r) => {
    console.log('Active:', Date.now() < r.bypassUntil);
});
```

### Reset Everything
```javascript
chrome.storage.local.clear();
```

### Check Restricted Sites
```javascript
chrome.storage.local.get(['restrictedSites'], console.log);
```

### Test Answer Logic
Add to `content.js`:
```javascript
console.log('Question:', currentQuestion.question);
console.log('Correct index:', currentQuestion.correct);
```

---

## 📁 File Organization

```
Essential (Must Have):
├── manifest.json
├── popup.html/css/js
├── content.js/css
└── background.js

Documentation (Reference):
├── README.md ⭐
├── QUICKSTART.md ⭐
├── INSTALLATION_TESTING.md ⭐
├── FILE_INDEX.md ⭐
├── PROJECT_COMPLETE.md
├── ADVANCED_CUSTOMIZATION.md
└── FINAL_SUMMARY.md

Resources:
└── icons/
```

---

## ✅ Testing Checklist

- [ ] Extension loads in Edge
- [ ] Settings popup opens
- [ ] Can toggle site restrictions
- [ ] Can add custom sites
- [ ] Overlay appears on blocked site
- [ ] Question displays correctly
- [ ] Answers are clickable
- [ ] Correct answer removes overlay
- [ ] Wrong answer shuffles answers
- [ ] Timer counts down
- [ ] Scroll is prevented
- [ ] Counter increments
- [ ] Overlay persists on refresh

---

## 🚀 Deployment Checklist

- [ ] All files in place
- [ ] manifest.json verified
- [ ] No console errors
- [ ] Settings save/load working
- [ ] Overlay injects correctly
- [ ] Animations smooth
- [ ] Mobile responsive (test)
- [ ] Icons added (optional)

---

## 📚 Documentation Quick Links

| Need | Read |
|------|------|
| **Quick Start** | QUICKSTART.md |
| **Full Docs** | README.md |
| **Setup & Test** | INSTALLATION_TESTING.md |
| **Examples** | ADVANCED_CUSTOMIZATION.md |
| **Overview** | PROJECT_COMPLETE.md |
| **File Guide** | FILE_INDEX.md |
| **Summary** | FINAL_SUMMARY.md |

---

## 🎨 CSS Selectors Reference

```css
/* Popup Dashboard */
.container         /* Main container */
.header            /* Top header */
.checkbox-item     /* Individual checkbox */
.btn-primary       /* Save button */

/* Overlay */
#earn-your-scroll-overlay      /* Main overlay */
.overlay-backdrop              /* Background blur */
.overlay-container             /* Content box */
.question-container            /* Question area */
.answer-btn                    /* Answer buttons */
.progress-fill                 /* Timer bar */
```

---

## 🔴 Common Mistakes

❌ Don't:
- Edit ID selectors without updating JS
- Change file names (breaks imports)
- Remove manifest permissions
- Use `//` comments in JSON
- Mix CSS and JS styling

✅ Do:
- Test in DevTools Console first
- Backup files before major changes
- Use consistent indentation
- Clear cache after JS changes
- Reload extension after manifest changes

---

## ⚡ Performance Tips

1. **Cache Questions**: Already done (array in memory)
2. **Lazy Load CSS**: Already optimized
3. **Minimize Re-renders**: Already implemented
4. **Debounce Events**: Already handled
5. **Optimize Images**: Add icons in `icons/` folder

---

## 🎓 Learning Resources

- [Chrome/Edge Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

---

**Print this card for quick reference! 📋**

**Last Updated**: February 4, 2026
**Version**: 1.0.0
