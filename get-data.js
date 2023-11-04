async function fetchData(url) {
    try {
      const response = await fetch(url);
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
  
  // Define similar functions for other GET endpoints
  