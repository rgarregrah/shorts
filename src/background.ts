let enabled = true;

const IMAGES_DIR = __dirname + "images/";
const ON_ICON = IMAGES_DIR + "icon16_on.png";
const OFF_ICON = IMAGES_DIR + "icon16_off.png";
const TARGET_URL = "https://www.youtube.com/shorts/";
const AFTER_URL = "https://www.youtube.com/watch?v=";

const changeStatus = () => {
    if (enabled) {
        chrome.action.setIcon({ path: OFF_ICON });
    } else {
        chrome.action.setIcon({ path: ON_ICON });
    }
    enabled = !enabled;
};

const isTargetUrl = (url: string) => {
    return url.startsWith(TARGET_URL);
};

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => changeStatus());

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "loading") {
        return;
    }
    if (!enabled) {
        return;
    }
    let url = tab.url;
    if (!url) {
        return;
    }
    if (!isTargetUrl(url)) {
        return;
    }
    const id = url.replace(TARGET_URL, "");
    chrome.tabs.update(tabId, { url: AFTER_URL + id });
});
