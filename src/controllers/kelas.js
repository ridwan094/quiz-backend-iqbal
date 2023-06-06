//Membuat CRUD dari model kelas
const { kelas } = require('../../models');

exports.getAllKelas = async (req, res) => {
    try {
        const data = await kelas.findAll({
            attributes: ["id", "nama_kelas"],
        });
        res.send({
            status: "200",
            message: "Kelas berhasil di dapatkan",
            data: {
                data,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}

exports.getKelasById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await kelas.findOne({
            where: {
                id,
            },
            attributes: ["id", "nama_kelas"],
        });
        res.send({
            status: "success",
            message: "Kelas berhasil di dapatkan",
            data: {
                data,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}

exports.addKelas = async (req, res) => {
    try {
        const body = req.body;

        if (body.nama_kelas == null || body.nama_kelas == "") {
            return res.status(400).send({
                status: "failed",
                message: "Nama Kelas tidak boleh kosong",
            });
        } else {
            const data = await kelas.create(body);
            res.send({
                status: "success",
                message: "Kelas berhasil di tambahkan",
                data: {
                    data,
                },
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}

exports.updateKelas = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const kelasData = await kelas.findOne({
            where: { id },
            attributes: ["id", "nama_kelas"],
        });

        if (!kelasData) {
            return res.status(400).send({
                status: "failed",
                message: "Kelas tidak ditemukan",
            });
        }

        const updateKelas = await kelas.update(body, {
            nama_kelas: body.nama_kelas,
        }, {
            where: { id },
        });

        const data = await kelas.findOne({
            where: { id },
            attributes: ["id", "nama_kelas"],
        });

        res.send({
            status: "success",
            message: "Kelas berhasil di update",
            data: {
                data,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
};

exports.deleteKelas = async (req, res) => {
    try {
        const id = req.params.id;

        const kelasData = await kelas.findOne({
            where: { id },
            attributes: ["id", "nama_kelas"],
        });

        if (!kelasData) {
            return res.status(400).send({
                status: "failed",
                message: "Kelas tidak ditemukan",
            });
        }

        await kelas.destroy();

        res.send({
            status: "success",
            message: "Kelas berhasil di hapus",
            data: {
                id: id,
            },
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}