const url = document.getElementById("URL");
url.addEventListener("click", async () => {
    console.log("Button URL clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const currentUrl = tabs[0].url;
        if (currentUrl.startsWith('chrome')) {
            alert("SAFE");
            return;
        }
        try {
            const response = await postData('http://127.0.0.1:5000/predict', { url: currentUrl });    
            console.log("url = ", currentUrl);
            console.log("response = ", response);
            if (response.predicted_class === 0) {
                alert(currentUrl + " - SAFE URL")
            } else if (response.predicted_class === 1) {
                alert(currentUrl + " - PHISHING URL")
            } else if (response.error) {
                alert("Ошибка");
                console.log("ERROR" + response.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

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
        throw new Error('Error fetching data:', error);
    }
}

// development of sending the html code of the page

// const html = document.getElementById("HTML");
// html.addEventListener("click", async () => {
//     console.log("Button HTML clicked");
//     chrome.tabs.query({}, function (tabs) {
//         for (var i = 0; i < tabs.length; i++) {
//             var id = tabs[i].id;
//             var url = tabs[i].url;
//             //method1(id);
//             method2(id);
//             //method3(url);
//         }
//     });
// })

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