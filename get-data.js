async function fetchData(url) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getAssets() {
    const url = 'https://api.coincap.io/v2/assets';
    return fetchData(url);
}

async function getAssetById(id) {
    const url = `https://api.coincap.io/v2/assets/${id}`;
    return fetchData(url);
}

async function getAssetHistory(id) {
    const url = `https://api.coincap.io/v2/assets/${id}/history`;
    return fetchData(url);
}

async function getAssetMarket(id) {
    const url = `https://api.coincap.io/v2/assets/${id}/market`;
    return fetchData(url);
}

async function getRates() {
    const url = `https://api.coincap.io/v2/rates`;
    return fetchData(url);
}

async function getRateById(id) {
    const url = `https://api.coincap.io/v2/rates/${id}`;
    return fetchData(url);
}

async function getExchanges() {
    const url = `https://api.coincap.io/v2/exchanges`;
    return fetchData(url);
}

async function getExchangeById(id) {
    const url = `https://api.coincap.io/v2/exchanges/${id}`;
    return fetchData(url);
}

async function getMarkets() {
    const url = `https://api.coincap.io/v2/markets`;
    return fetchData(url);
}

async function getCandles() {
    const url = `https://api.coincap.io/v2/candles`;
    return fetchData(url);
}