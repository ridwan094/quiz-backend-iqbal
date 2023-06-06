// membuat router untuk kelas
const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelas');

router.get('/kelas', kelasController.getAllKelas);
router.get('/kelas/:id', kelasController.getKelasById);
router.post('/kelas', kelasController.addKelas);
router.put('/kelas/:id', kelasController.updateKelas);
router.delete('/kelas/:id', kelasController.deleteKelas);

module.exports = router;