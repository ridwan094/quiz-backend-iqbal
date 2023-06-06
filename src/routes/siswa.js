// Membuat routing untuk siswa
const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswa');
const { authToken } = require('../middleware/authToken');
const { authRole } = require('../middleware/authRole');


router.get('/siswa/:id', authToken, siswaController.getSiswaById);
router.get('/siswa', authToken, siswaController.getAllSiswa);
router.post('/siswa', siswaController.addSiswa);
router.put('/siswa/:id', siswaController.updateSiswa);
router.delete('/siswa/:id', siswaController.deleteSiswa);
router.post('/siswa-signin', siswaController.loginSiswa);

module.exports = router;