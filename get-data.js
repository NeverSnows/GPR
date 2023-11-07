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

async function getAssetHistory(id = '') {
    const url = `https://api.coincap.io/v2/assets/${id}/history`;
    return fetchData(url);
}

async function getAssetMarket(id = '') {
    const url = `https://api.coincap.io/v2/assets/${id}/market`;
    return fetchData(url);
}
//#endregion

//#region utils
async function getAssetIds(){
    const response = await getAssets();
    return response.data.map(coin => coin.name);
}

async function logData(func){
    func().then(response => console.log(response));
}
//#endregion

//#region timer

//Defines how many seconds between each fetch operation.
const fetchSecondsInterval = 5;

const fetchInterval = 1000 * fetchSecondsInterval
let iterations = 0;

function handleIterationLimmit(){
    iterations++;
    console.log(`Data fetched ${iterations} times.`);

    if(iterations >= 20){
        clearInterval(fetchTimer);
        console.log("Done.");
    }
}
//#endregion

function updateTable(dataArray){
    const tableBodyElement = document.querySelector('#data-table tbody');
    tableBodyElement.innerHTML = '';

    dataArray.forEach(coin => {
            const row = document.createElement('tr');
    
            const rankCell = document.createElement('td');
            rankCell.textContent = coin.rank;
            row.appendChild(rankCell);

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
            changePercentCell.textContent = Number(coin.changePercent24Hr).toFixed(2) + '%';
            row.appendChild(changePercentCell);

            tableBodyElement.appendChild(row);
    })
}

//Calls

const titleElement = document.querySelector('.title');

const fetchTimer = setInterval(() => getAssets()
    .then((response) => {
        console.log(response);
        updateTable(response.data);
        //handleIterationLimmit();
    }), fetchInterval)


$(document).ready(function () {
    $('#data-table').DataTable();
});