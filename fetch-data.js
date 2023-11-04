async function fetchData(id = '') {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  
    const url = id ? `https://api.coincap.io/v2/assets/${id}` : 'https://api.coincap.io/v2/assets';
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (id) {
        return data.data; // Return the data for a single coin
      } else {
        return data.data.map(coin => coin.id).filter(item => item !== null); // Return a list of all coin IDs
      }
    } catch (error) {
      console.error('Error:', error);
      return id ? null : []; // Return null for a single coin request, or an empty array for all IDs
    }
  }
  
  // Usage examples:
  
  // To get data for a single coin by ID:
  async function getCoinData(coinId) {
    const data = await fetchData(coinId);
    console.log(data); // Process or use the data here
  }
  
  // To get a list of all coin IDs:
  async function getAllCoinIDs() {
    const data = await fetchData();
    console.log(data); // Process or use the list of IDs here
  }
  
  // Call the functions as needed:
  getCoinData('bitcoin'); // Get data for a single coin
  getAllCoinIDs(); // Get a list of all coin IDs
  