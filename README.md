# Wetterkit – React + Vite Wetter-App

Diese App zeigt das aktuelle Wetter und eine 5-Tage-Vorhersage an.  
Gebaut mit React, Vite, OpenWeather API & Unsplash API.

## Technologien

- React + Vite
- CSS3 mit Media Queries
- OpenWeather API (über Netlify Function)
- Unsplash API für Stadtbilder
- responsives Design (Mobile-First)

## Features

- Aktuelles Wetter mit Icon, Temperatur, Wind & Luftfeuchtigkeit
- Sonnenaufgang & Sonnenuntergang
- Stadtbild über Unsplash
- 5-Tage-Vorhersage mit Hover-Effekt
- Schönes Hintergrundbild mit Overlay
- Mobile-Optimierung
- Dark Glass UI Style

## Sicherheit

- Die Wetterdaten werden über eine **serverseitige Funktion** aufgerufen (`/.netlify/functions/forecast`).
- Das schützt vor Missbrauch & hält den Key privat.

## ⚠️ Hinweis zur Skalierung

Auf manchen Geräten (vor allem bei ungewöhnlichen Zoom-Stufen)  
kann es sein, dass die App nicht direkt perfekt skaliert.  
👉 In dem Fall einfach einmal `CMD +` oder `CMD -` drücken (bzw. `Strg + / -`),  
um die Ansicht auf die optimale Größe zu bringen.

Ich arbeite daran, die App zukünftig **100 % responsiv und skalierbar zu machen** – danke für dein Verständnis!

---

## Ausblick

Ich bin noch am Anfang meiner Entwickler-Reise,  
aber gebe alles, um bei jedem Projekt besser zu werden.  
Dieses Projekt war ein großer Schritt für mich,  
besonders was **Netlify Functions** und **API-Sicherheit** angeht.

Weitere Features, die geplant sind:

- Bessere mobile Optimierung
- Ladeanimation
- Farbschema je nach Wetter
- Tageszeiten (Sonnenauf-/untergang)

---

## Gelernt in diesem Projekt

- API-Schlüssel absichern mit Serverless Functions
- Environment Variables auf Netlify richtig einrichten
- Projektstruktur sauber halten mit Vite + React
- Fehler erkennen & selbstständig lösen

## 🌍 Live-Demo

👉 [Hier klicken, um die App live zu testen](https://glittery-rabanadas-8efc0c.netlify.app)
