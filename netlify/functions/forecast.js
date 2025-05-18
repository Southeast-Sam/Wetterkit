// @ts-nocheck
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function handler(event) {
  const API_KEY = process.env.OPENWEATHER_KEY;
  const city = event.queryStringParameters.q;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=de`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fehler beim Abrufen der Wetterdaten" }),
    };
  }
}
