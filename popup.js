const grab = document.getElementById("grab");

grab.addEventListener("click", async () => {
    console.log("Button clicked");
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        const currentUrl = tabs[0].url;
        console.log(currentUrl);
        console.log(typeof(currentUrl))
        try {
            const response = await postData('http://127.0.0.1:5000/predict', { url: currentUrl });
            console.log(response);
            if (response.predicted_class === 0) {
                alert("Это не фишинг");            
            } else if (response.predicted_class === 1) {
                alert("Это ФИШИНГ!")
            } else if (response.error) {
                alert("Ошибка")
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