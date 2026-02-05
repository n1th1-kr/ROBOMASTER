# 🚀 Installation & Testing Guide

## Quick Installation (2 minutes)

### Step 1️⃣: Open Edge Extensions Page
```
Microsoft Edge → Type in address bar:
edge://extensions/
```

### Step 2️⃣: Enable Developer Mode
```
Top-right corner → Toggle "Developer mode" (gray → blue)
```

### Step 3️⃣: Load Extension
```
Click "Load unpacked" button → 
Select the "Earn Your Scroll" folder →
Click "Select Folder"
```

### Step 4️⃣: Verify Installation
```
✓ Extension appears in toolbar
✓ Click icon → Settings popup opens
✓ Shows "Earn Your Scroll Settings"
```

---

## Step-by-Step Testing

### Test 1: Settings Dashboard
```
1. Click extension icon
2. You should see:
   ✓ Dark gradient background
   ✓ Header "Earn Your Scroll Settings"
   ✓ 5 checkboxes (YouTube, Instagram, TikTok, Reddit, Facebook)
   ✓ "Add Custom Site" input field
   ✓ "Save Settings" button
   ✓ "Lifetime Questions Answered" counter (shows 0)
```

### Test 2: Configure Restrictions
```
1. Check 2-3 boxes (e.g., YouTube + TikTok)
2. Click "Save Settings"
3. You should see: ✓ Green notification
4. Refresh popup → Settings should persist
```

### Test 3: Add Custom Site
```
1. Type "example.com" in custom site input
2. Click "Add"
3. You should see: ✓ example.com appears below
4. Click "Save Settings"
```

### Test 4: Visit Restricted Site
```
1. Open a new tab
2. Visit: youtube.com (or other checked site)
3. After page loads, you should see:
   ✓ Full-screen overlay appears
   ✓ Question displayed
   ✓ 4 answer buttons
   ✓ 60-second countdown timer
   ✓ Progress bar
   ✓ Page is frozen (can't scroll)
```

### Test 5: Answer Correctly
```
1. Read the question
2. Click the CORRECT answer (usually C)
3. You should see:
   ✓ Overlay fades out
   ✓ Page becomes scrollable
   ✓ Question counter increments (now shows 1)
   ✓ 60-second bypass granted
4. Refresh page → No overlay (within 60 seconds)
```

### Test 6: Answer Incorrectly
```
1. Go back to restricted site
2. (Wait 60 seconds if needed, or clear bypass in DevTools)
3. Click a WRONG answer
4. You should see:
   ✓ Shake animation
   ✓ Answers shuffle
   ✓ Same question appears again
5. Try again with correct answer
```

### Test 7: Scroll Prevention
```
1. When overlay is visible, try to:
   ✓ Scroll wheel → Blocked
   ✓ Swipe on trackpad → Blocked
   ✓ Touch scroll on mobile → Blocked
   ✓ Page behind overlay → Frozen
```

---

## Debugging in DevTools

### Open DevTools
```
Any page → Press F12 → Console tab
```

### Check Storage
```javascript
// View all stored data
chrome.storage.local.get(null, console.log);

// Expected output:
{
    restrictedSites: ["youtube.com", "tiktok.com"],
    customSites: ["example.com"],
    questionsAnswered: 1,
    bypassUntil: 1707040200000
}
```

### Check Bypass Status
```javascript
// Is bypass still active?
chrome.storage.local.get(['bypassUntil'], (r) => {
    const active = Date.now() < r.bypassUntil;
    console.log('Bypass active:', active);
});
```

### Clear Everything (Reset)
```javascript
// Delete all stored data
chrome.storage.local.clear();
console.log('Storage cleared!');
```

### View Restricted Sites
```javascript
chrome.storage.local.get(['restrictedSites'], console.log);
```

---

## Visual Testing Checklist

### Dashboard (popup.html)
- [ ] Dark gradient background visible
- [ ] Header text: "Earn Your Scroll Settings"
- [ ] 5 site checkboxes display correctly
- [ ] Custom site input field works
- [ ] "Save Settings" button has blue gradient
- [ ] Notification appears after save
- [ ] Counter shows correct number
- [ ] Hover effects work (glow on buttons)
- [ ] Responsive on smaller windows

### Overlay (content.js + content.css)
- [ ] Full-screen overlay appears
- [ ] Glassmorphism effect visible (blur background)
- [ ] Question text displays clearly
- [ ] 4 answer buttons show in correct layout
- [ ] Progress bar animates (60s → 0s)
- [ ] Time counter counts down
- [ ] Buttons have glow effect on hover
- [ ] Shake animation on wrong answer
- [ ] Fade-out animation on correct answer
- [ ] Overlay stays on refresh

### Animations
- [ ] Overlay fades in smoothly
- [ ] Buttons glow on hover
- [ ] Wrong answer shakes
- [ ] Correct answer fades out
- [ ] Sections slide down on popup open

---

## Expected Results Table

| Action | Expected | Status |
|--------|----------|--------|
| Load extension | Icon appears in toolbar | ✓ |
| Click icon | Settings popup opens | ✓ |
| Check box | Checkbox gets checkmark | ✓ |
| Save settings | Notification shows | ✓ |
| Visit blocked site | Overlay appears | ✓ |
| Answer correct | Overlay disappears | ✓ |
| Answer wrong | Answers shuffle | ✓ |
| Try to scroll | Blocked | ✓ |
| Wait 60s | Overlay appears again | ✓ |
| Refresh page | Overlay persists | ✓ |

---

## Troubleshooting

### "Overlay Not Appearing"
```
1. Check if site is in restricted list
2. Run: chrome.storage.local.get(['restrictedSites'], console.log)
3. Verify site matches list
4. Reload page
5. Try different site
```

### "Can't Add Custom Site"
```
1. Check domain format (e.g., example.com, NOT https://example.com)
2. Remove "www." prefix if present
3. Check for typos
4. Try simpler domain first
```

### "Settings Not Saving"
```
1. Check browser console for errors
2. Verify storage permission in manifest.json
3. Try clearing all storage: chrome.storage.local.clear()
4. Reload extension (go to edge://extensions/ and reload)
```

### "Button Clicks Not Working"
```
1. Check if overlay z-index is correct (999999)
2. Verify content.js is injected (check console)
3. Clear cache (Ctrl+Shift+Delete)
4. Reload extension
```

### "Animations Not Smooth"
```
1. This is normal if GPU acceleration is disabled
2. Check Edge settings → Performance
3. Ensure hardware acceleration is enabled
4. Try disabling other extensions
```

---

## Performance Testing

### Page Load Impact
```
The extension should add <100ms to page load
- manifest.json: <1ms
- content.css: <1ms (injected in header)
- content.js: ~5-10ms (overlay creation on trigger)
```

### Memory Usage
```
Expected: <5MB when idle
- Storage: ~2KB
- Service worker: ~1MB
- Content script: ~2MB
```

### CPU Usage
```
Normal: <1% when idle
Timer: <1% when overlay active
```

---

## Success Indicators ✅

You'll know it's working when you see:

1. ✅ **Icon in Toolbar** - Blue extension icon appears
2. ✅ **Settings Open** - Dark dashboard displays
3. ✅ **Beautiful UI** - Gradient background, glowing buttons
4. ✅ **Site Detection** - Overlay appears on restricted sites
5. ✅ **Smooth Animation** - Overlay slides in smoothly
6. ✅ **Working Questions** - Questions display with answers
7. ✅ **Answer Logic** - Correct removes overlay, wrong shuffles
8. ✅ **Timer Works** - Countdown progresses correctly
9. ✅ **Scroll Blocked** - Can't interact with page
10. ✅ **Bypass Works** - 60-second access after correct answer

---

## What to Customize Next

### Easy (No Coding)
- [ ] Change restricted sites
- [ ] Add custom domains
- [ ] Check statistics

### Medium (CSS)
- [ ] Change colors (edit #60a5fa in both CSS files)
- [ ] Adjust animation speeds
- [ ] Modify button styles

### Advanced (JavaScript)
- [ ] Add more questions (edit content.js QUESTIONS array)
- [ ] Change reward time (60000 → different value)
- [ ] Add sound effects
- [ ] Track daily stats

See `ADVANCED_CUSTOMIZATION.md` for code examples!

---

## Support

### Need Help?
1. Check `README.md` for full documentation
2. See `QUICKSTART.md` for setup
3. Read `ADVANCED_CUSTOMIZATION.md` for examples
4. Use DevTools Console to debug

### Still Stuck?
```javascript
// Run in DevTools Console to diagnose
chrome.storage.local.get(null, (items) => {
    console.log('Storage:', items);
    console.log('Restricted Sites:', items.restrictedSites);
    console.log('Bypass Until:', new Date(items.bypassUntil));
});
```

---

**You're all set! Happy productivity boosting! 🎉**
