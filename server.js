const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/progettoBus')
    .then(() => console.log("Connesso a MongoDB!"))
    .catch(err => console.error("Errore connessione:", err));


const Bus = mongoose.model(
    'Bus',
    {
        nome: String,
        lat: Number,
        lng: Number,
        attivo: Boolean
    },
    'buses'
);

const Fermata = mongoose.model(
    'Fermata',
    {
        nome: String,
        lat: Number,
        lng: Number,
        linee: [String]
    },
    'fermate'
);

const Utente = mongoose.model(
    'Utente',
    {
        username: String,
        password: String,
        nomeCompleto: String
    },
    'utenti'
);



app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {

        const utente = await Utente.findOne({ username, password });

        if (utente) {
            res.json({
                success: true,
                nome: utente.nomeCompleto
            });
        } else {
            res.status(401).json({ success: false });
        }

    } catch (err) {
        res.status(500).send("Errore server");
    }
});


app.get('/fermate/:linea', async (req, res) => {

    const lineaScelta = req.params.linea;

    try {
        const fermate = await Fermata.find({ linee: lineaScelta });
        res.json(fermate);
    } catch (err) {
        res.status(500).send("Errore recupero fermate");
    }

});


app.get('/linee', (req, res) => {

    res.json([
        "Linea 1",
        "Linea 2",
        "Linea 3",
        "Linea 4",
        "Linea 5"
    ]);

});


app.post('/aggiorna', async (req, res) => {

    const { nome, lat, lng } = req.body;

    try {

        await Bus.findOneAndUpdate(
            { nome: nome },
            { lat: lat, lng: lng, attivo: true },
            { upsert: true }
        );

        res.send("Posizione ricevuta");

    } catch (err) {
        res.status(500).send("Errore aggiornamento");
    }

});


app.post('/interrompi', async (req, res) => {

    const { nome } = req.body;

    try {

        await Bus.findOneAndUpdate(
            { nome: nome },
            { attivo: false }
        );

        res.send("Bus rimosso dalla mappa");

    } catch (err) {
        res.status(500).send("Errore interruzione");
    }

});


app.get('/leggi', async (req, res) => {

    try {

        const busAttivi = await Bus.find({ attivo: true });
        res.json(busAttivi);

    } catch (err) {
        res.status(500).send("Errore lettura");
    }

});



app.listen(3000, () => {
    console.log("Server attivo sulla porta 3000");
});
