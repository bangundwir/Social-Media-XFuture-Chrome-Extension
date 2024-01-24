// Function to open social media in a new popup window
function openSocialMedia(url) {
    const iphoneUserAgent =
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) INX MApp Pro/1.7.8 (iOS; iPhone 13 Pro Max; Build Version 15.1.1 (Build 19B81)) CFNetwork/1325.0.1 Darwin/21.1.0";

    chrome.windows.create(
        {
            url: url,
            type: "popup",
            width: 600,
            height: 932,
        },
        (newWindow) => {
            chrome.scripting.executeScript({
                target: { tabId: newWindow.tabs[0].id },
                func: setUserAgent,
                args: [iphoneUserAgent],
            });
        }
    );
}

// Function to set the user agent
function setUserAgent(userAgentString) {
    Object.defineProperty(navigator, "userAgent", {
        get: function () {
            return userAgentString;
        },
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Save the current state of dark mode to localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Load the dark mode setting from localStorage on startup
function loadDarkModeSetting() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}

// Event listeners for social media buttons
document.getElementById("openInstagram").addEventListener("click", () => {
    openSocialMedia("https://www.instagram.com/");
});

document.getElementById("openTikTok").addEventListener("click", () => {
    openSocialMedia("https://www.tiktok.com/");
});

document.getElementById("openTwitter").addEventListener("click", () => {
    openSocialMedia("https://twitter.com/");
});

// Event listener for the dark mode toggle button
document
    .getElementById("toggleDarkMode")
    .addEventListener("click", toggleDarkMode);

// Load dark mode setting when the DOM content is loaded
document.addEventListener("DOMContentLoaded", loadDarkModeSetting);
