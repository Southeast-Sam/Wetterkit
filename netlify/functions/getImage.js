const fetch = require("node-fetch");

exports.handler = async function (event) {
  const query = event.queryStringParameters.stadt || "stadt";
  const UNSPLASH_KEY = process.env.VITE_UNSPLASH_KEY;

  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`;
  try {
    const res = await fetch(url);
    const daten = await res.json();

    console.log("Unsplash Daten:", daten);

    return {
      statusCode: 200,
      body: JSON.stringify({
        bild: daten.results[0]?.urls?.regular || null,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ fehler: "Bild konnte nicht geladen werden" }),
    };
  }
};
