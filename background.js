const postData = async (url = '', data = {}) => {
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

// // background url sending function when updating the url
// chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo) {
//     const url = changeInfo.url;
//     if (url && !isUnwantedUrl(url)) {
//         console.log(url);
//         const response = await postData('http://127.0.0.1:5000/predict', { url })
//         console.log(response)
        
//         chrome.tabs.sendMessage(tabId, {
//             message: response
//         });
//     }   
// });

function isUnwantedUrl(url) {
    return url.startsWith('chrome');
}

// development of sending the html code of the page

// chrome.browserAction.onClicked.addListener(function () {
//     chrome.tabs.query({}, function (tabs) {
//         for (var i = 0; i < tabs.length; i++) {
//             var id = tabs[i].id;
//             var url = tabs[i].url;
//             //method1(id);
//             method2(id);
//             //method3(url);
//         }
//     });
// });

// function method1(tabId) {
//     chrome.tabs.executeScript(tabId, { "code": "document.documentElement.outerHTML;" }, function (result) {
//         console.log(result);
//     });
// }

// function method2(id) {
//     chrome.tabs.sendMessage(id, {action: "getSource"}, function(response) {
//         console.log(response.sourceCode);
//     });
// }

// function method3(url) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         console.log(xhr.responseText);
//     };
//     xhr.open("GET", url);
//     xhr.send();
// }