// Load settings and display them
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadQuestionCount();
    setupEventListeners();
});

// Load saved settings from storage
function loadSettings() {
    chrome.storage.local.get(['restrictedSites', 'customSites'], (result) => {
        const restrictedSites = result.restrictedSites || [];
        const customSites = result.customSites || [];

        // Check predefined sites
        document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(checkbox => {
            if (restrictedSites.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });

        // Display custom sites
        displayCustomSites(customSites);
    });
}

// Load lifetime questions answered count
function loadQuestionCount() {
    chrome.storage.local.get(['questionsAnswered'], (result) => {
        const count = result.questionsAnswered || 0;
        document.getElementById('questionsAnswered').textContent = count;
    });
}

// Setup event listeners
function setupEventListeners() {
    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveSettings);

    // Add custom site button
    document.getElementById('addCustomBtn').addEventListener('click', addCustomSite);

    // Custom site input enter key
    document.getElementById('customSiteInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomSite();
        }
    });
}

// Save settings
function saveSettings() {
    const checkedSites = Array.from(
        document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.value);

    chrome.storage.local.get(['customSites'], (result) => {
        const customSites = result.customSites || [];
        
        chrome.storage.local.set({
            restrictedSites: checkedSites,
            customSites: customSites
        }, () => {
            showNotification('Settings saved successfully!');
        });
    });
}

// Add custom site
function addCustomSite() {
    const input = document.getElementById('customSiteInput');
    const domain = input.value.trim().toLowerCase();

    if (!domain) {
        showNotification('Please enter a domain');
        return;
    }

    // Basic domain validation
    if (!isValidDomain(domain)) {
        showNotification('Please enter a valid domain');
        return;
    }

    chrome.storage.local.get(['customSites', 'restrictedSites'], (result) => {
        let customSites = result.customSites || [];
        let restrictedSites = result.restrictedSites || [];

        if (customSites.includes(domain)) {
            showNotification('Site already added');
            return;
        }

        customSites.push(domain);
        restrictedSites.push(domain);

        chrome.storage.local.set({
            customSites: customSites,
            restrictedSites: restrictedSites
        }, () => {
            displayCustomSites(customSites);
            input.value = '';
            showNotification('Site added successfully!');
        });
    });
}

// Display custom sites
function displayCustomSites(customSites) {
    const list = document.getElementById('customSitesList');
    list.innerHTML = '';

    customSites.forEach(site => {
        const item = document.createElement('div');
        item.className = 'custom-site-item';
        item.innerHTML = `
            <span>${site}</span>
            <button class="remove-btn" data-site="${site}">Remove</button>
        `;

        item.querySelector('.remove-btn').addEventListener('click', () => {
            removeCustomSite(site);
        });

        list.appendChild(item);
    });
}

// Remove custom site
function removeCustomSite(site) {
    chrome.storage.local.get(['customSites', 'restrictedSites'], (result) => {
        let customSites = result.customSites || [];
        let restrictedSites = result.restrictedSites || [];

        customSites = customSites.filter(s => s !== site);
        restrictedSites = restrictedSites.filter(s => s !== site);

        chrome.storage.local.set({
            customSites: customSites,
            restrictedSites: restrictedSites
        }, () => {
            displayCustomSites(customSites);
            showNotification('Site removed successfully!');
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// Validate domain
function isValidDomain(domain) {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
    return domainRegex.test(domain);
}
