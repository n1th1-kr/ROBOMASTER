// Background service worker for Earn Your Scroll extension

// Initialize storage on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        restrictedSites: ['youtube.com', 'instagram.com', 'tiktok.com', 'reddit.com', 'facebook.com'],
        customSites: [],
        questionsAnswered: 0,
        bypassUntil: 0
    });
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStats') {
        chrome.storage.local.get(['questionsAnswered', 'bypassUntil'], (result) => {
            sendResponse({
                questionsAnswered: result.questionsAnswered || 0,
                bypassUntil: result.bypassUntil || 0
            });
        });
        return true; // Keep channel open for async response
    }

    if (request.action === 'updateBypass') {
        chrome.storage.local.set({ bypassUntil: request.bypassUntil });
        sendResponse({ success: true });
    }
});

// Listen for tab changes to reinject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Send message to check if site is restricted
        chrome.tabs.sendMessage(tabId, { action: 'checkSite' }).catch(() => {
            // Content script may not be loaded yet, which is fine
        });
    }
});
