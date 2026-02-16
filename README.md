# 🚌 BUS TRACKER PROJECT - COMPLETE INSTRUCTIONS

This project enables real-time bus tracking using Node.js and MongoDB. Drivers can share their GPS location, and users can view the live movement of buses and stops on an interactive map.

---

## 1. SYSTEM REQUIREMENTS
Ensure you have the following installed on your machine:
- **Node.js**
- **MongoDB Community Server** (must be active and running)
- **MongoDB Database Tools** (required for the 'mongoimport' command)

---

## 2. INITIAL SETUP
1. Open your terminal or command prompt in the project folder.
2. Install the necessary dependencies by running:
   $ npm install

---

## 3. DATABASE DATA IMPORT
Before starting the application, you must populate your local database with the provided user and bus stop data. Run these two commands in your terminal:

$mongoimport --db progettoBus --collection utenti --file utenti.json --jsonArray
$mongoimport --db progettoBus --collection fermate --file fermate.json --jsonArray

---

## 4. STARTING THE SERVER
For the system to function, the backend server must be running at all times:
1. In the terminal, type:
   $ node server.js
2. The server will be active at: http://localhost:3000 (Keep this terminal window open).

---

## 5. HOW TO OPEN AND USE THE PROJECT
To test the application correctly, follow these steps in order:

1. **Main Page:** Click on the **index.html** file to open the project's main interface.
2. **Driver Area:** From the home page (or by opening **conducente.html** directly), log in using the credentials (e.g., Username: 'mario', Password: '123') and click "Inizia Servizio" (Start Service).
   *Note: You must allow the browser to access your GPS location.*
3. **Map View:** Return to the main page (**index.html**) to see the bus moving in real-time on the map.

---

## 6. MANUAL INSPECTION (MONGOSH)
If you wish to verify the data directly through the terminal:
1. Type: $ mongosh
2. Type: > use progettoBus
3. To view active buses: > db.buses.find()

---

## 📂 PROJECT FILE LIST
- **server.js**: The core backend engine of the project.
- **index.html**: The main landing page featuring the interactive map.
- **conducente.html**: Driver portal for login and GPS transmission.
- **style.css**: The stylesheet managing the visual design of the entire project.
- **utenti.json / fermate.json**: Data files used to populate the database.
