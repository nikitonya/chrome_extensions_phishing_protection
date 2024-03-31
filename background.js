async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        throw new Error('Ошибка при получении данных:', error);
    }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        console.log(changeInfo.url);
        postData('http://127.0.0.1:5000/predict', { url: changeInfo.url });
        
    }
});

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tabInfo) {
//         console.log(tabInfo.url);
//         postData('http://127.0.0.1:5000/predict', { url: tabInfo.url });
//     });
// });