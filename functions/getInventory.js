const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const query = {
      "model": "my",                // Model Y
      "condition": "new",           // Yeni araç
      "buyOrLease": "buy",          // Satın alma
      "arrangeByPrice": true,       // Fiyata göre sıralama
      "region": "EMEA",             // Avrupa, Ortadoğu ve Afrika
      "country": "TR",              // Türkiye
      "super_region": "emea",
      "inventory_offset": 0,
      "lng": 28.9784,               // İstanbul koordinatları
      "lat": 41.0082,
      "zip": "34000"                // İstanbul örnek posta kodu
    };

    const encodedQuery = Buffer.from(JSON.stringify(query)).toString('base64');

    const apiUrl = `https://www.tesla.com/inventory/api/v1/inventory-results?query=${encodedQuery}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
