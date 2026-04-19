# Garage Tracker 🚗🛠️

> **Live Demo:** [Insert your GitHub Pages link here]

## 📖 About The Project

This website is a garage tracker which allows you to keep track of maintenance and modifications for any number of vehicles which you own, it has a relatively robust set of features and allows you to customize most of your record-keeping, so it acts as a decent framework, without forcing you to keep very specific records if you do not want to. I like to keep track of my maintenance both for resale value and for my own purposes, so I find this to be useful. It currently uses LocalStorage for saving data, but I would like to change this to utilize a database in the future.

**Academic Context:** This project was developed by Drew Voss for CS571: Building User Interfaces at UW-Madison. 
*Note: AI assistance (Gemini) was utilized during development, as well as for writing this basic outline, though I changed a decent amount of the text and wrote the more important pieces myself.*

---

## ✨ Core Features

* **Multi-Vehicle Management:** Add, view, and delete multiple vehicles in your garage, keep a persistent view of your vehicles' on one device through LocalStorage.
* **Detailed Logging System:** Track both maintenance (e.g., oil changes) and modifications (e.g., aftermarket parts).
* **Flexible Data Entry:** Robust form handling that accommodates edge cases, such as "Unknown" mileage/dates and custom service providers ("Done By" tracking).
* **Automated Cost Tracking:** Automatically calculates and displays total investment/maintenance costs per vehicle. This can be useful for keeping track of when it is time to give up on a vehicle as well.
* **Persistent Local Storage:** Safely saves user data locally across browser sessions without needing a backend database. **Ideally a backend database will be added in the future, but I am not creating it for this class, as I am not sure how to make it fully stable with as close to 100% uptime as possible yet.**

---

## ♿ Accessibility & Design Decisions

* **Semantic HTML & Hierarchy:** Ensured strict heading levels (`<h1>` through `<h3>`) across all pages for seamless screen reader navigation.
* **Programmatic Form Labeling:** All inputs are explicitly linked to their labels using React Bootstrap `controlId`s.
* **Color Contrast:** The custom color palette (`--rs-steel-azure`, `--rs-alice-blue`, etc.) will be audited to ensure it meets WCAG AA standards for visual accessibility by the time this project is complete.
* **Responsive Layout:** Utilizes React Bootstrap's grid system (`Container`, `Row`, `Col`) to ensure the dashboard is usable on both desktop and mobile devices.

---

## 💻 Built With

[List the core technologies so a developer knows your stack at a glance.]

* **React (Vite)**
* **React Router DOM** (Client-side routing)
* **React Bootstrap** (Component library & styling)
* **CSS3** (Custom styling and variables)

---
