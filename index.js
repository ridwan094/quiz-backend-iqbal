// Buat konfigurasi server dengan express
// pemetaan route
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require('dotenv').config();

const siswaRouter = require('./src/routes/siswa');
app.use('/', siswaRouter);

const kelasRouter = require('./src/routes/kelas');
app.use('/', kelasRouter);

app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

