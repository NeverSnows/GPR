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

//#region assets
async function getAssets() {
    const url = 'https://api.coincap.io/v2/assets';
    return fetchData(url);
}

async function getAssetById(id = '') {
    const url = `https://api.coincap.io/v2/assets/${id}`;
    return fetchData(url);
}
//#endregion

//#region utils
async function getAssetIds(){
    const response = await getAssets();
    return response.data.map(coin => coin.id);
}

async function getSelectedCoins(){
    const coinIDs = [
        "ethereum", 
        "bitcoin",
        "polygon",
        "uniswap",
        "dydx",
        "render-token",
        "solana",
        "aave",
        "lido-dao",
        "fetch"
    ];

    const coins = [];   

    for (const id of coinIDs) {
        const response = await getAssetById(id);
        coins.push(response.data);
    }

    return coins;
}

async function logData(func){
    func().then(response => console.log(response));
}
//#endregion

function updateTable(dataArray = []){
    const tableBodyElement = document.querySelector('#data-table tbody');
    tableBodyElement.innerHTML = '';

    dataArray.forEach(coin => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = coin.name;
            row.appendChild(nameCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = '$' + Number(coin.priceUsd).toFixed(2);
            row.appendChild(priceCell);

            const marketCapCell = document.createElement('td');
            marketCapCell.textContent = '$' + Number(coin.marketCapUsd).toFixed(2);
            row.appendChild(marketCapCell);

            const vwapCell = document.createElement('td');
            vwapCell.textContent = '$' +  Number(coin.vwap24Hr).toFixed(2);
            row.appendChild(vwapCell);

            const supplyCell = document.createElement('td');
            supplyCell.textContent = Number(coin.supply).toFixed(2)
            row.appendChild(supplyCell);

            const volumeCell = document.createElement('td');
            volumeCell.textContent = '$' + Number(coin.volumeUsd24Hr).toFixed(2);
            row.appendChild(volumeCell);

            const changePercentCell = document.createElement('td');
            let changePcentValue = Number(coin.changePercent24Hr).toFixed(2);
            if(changePcentValue == 0) changePcentValue = changePcentValue.replace('-','');
            changePercentCell.textContent = changePcentValue  + '%';
            row.appendChild(changePercentCell);

            tableBodyElement.appendChild(row);
    })
}

//Calls
const fetchSecondsInterval = 5;
const fetchInterval = 1000 * fetchSecondsInterval;
const titleElement = document.querySelector('.title');

const fetchTimer = setInterval(() => getSelectedCoins()
    .then((response) => {
        updateTable(response);
        console.log(response);
    }), fetchInterval);


$(document).ready(function () {
    $('#data-table').DataTable();
});