const { siswa } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllSiswa = async (req, res) => {
    try {
        console.log(req.user);
        const data = await siswa.findAll({
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username", "password"],
        });
        res.send({
            status: "200",
            message: "Siswa berhasil di dapatkan",
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

exports.getSiswaById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await siswa.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        res.send({
            status: "success",
            message: "Siswa berhasil di dapatkan",
            data: {
                data,
            },
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username", "password"],
        });
        res.send({
            status: "200",
            message: "Siswa berhasil di dapatkan",
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

exports.addSiswa = async (req, res) => {
    try {
        const body = req.body;

        const schema = joi.object({
            nama: joi.string().min(3).required(),
            tanggal_lahir: joi.string().min(3).required(),
            tempat_lahir: joi.string().min(3).required(),
            kelas: joi.string().min(3).required(),
            alamat: joi.string().min(3).required(),
            no_hp: joi.string().min(11).required(),
            nama_ortu: joi.string().min(3).required(),
            no_hp_ortu: joi.string().min(11).required(),
            username: joi.string().min(3).required(),
            password: joi.string().min(8).required(),
        });

        const { error } = schema.validate(body);

        if (error) {
            return res.status(400).send({
                status: "validation failed",
                message: error.details[0].message,
            });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const getSiswa = await siswa.create({
            nama: body.nama,
            tanggal_lahir: body.tanggal_lahir,
            tempat_lahir: body.tempat_lahir,
            kelas: body.kelas,
            alamat: body.alamat,
            no_hp: body.no_hp,
            nama_ortu: body.nama_ortu,
            no_hp_ortu: body.no_hp_ortu,
            username: body.username,
            password: hashedPassword,
        });

        res.send({
            status: "200",
            message: "Siswa berhasil di tambahkan",
            data: {
                getSiswa,
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

exports.updateSiswa = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const siswaData = await siswa.findOne({
            where: { id },
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username", "password"],
        });

        if (!siswaData) {
            return res.status(404).send({
                status: "404",
                message: "Siswa not found",
            });
        }

        // Mengenerate password baru menggunakan bcrypt
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const updateSiswa = await siswa.update({
            nama: body.nama,
            tanggal_lahir: body.tanggal_lahir,
            tempat_lahir: body.tempat_lahir,
            kelas: body.kelas,
            alamat: body.alamat,
            no_hp: body.no_hp,
            nama_ortu: body.nama_ortu,
            no_hp_ortu: body.no_hp_ortu,
            username: body.username,
            password: hashedPassword, // Menggunakan password yang sudah di-hash
        }, {
            where: { id },
        });

        const siswaUpdate = await siswa.findOne({
            where: { id },
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username"],
        });

        res.send({
            status: "200",
            message: "Siswa berhasil di update",
            data: {
                siswaUpdate,
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


exports.deleteSiswa = async (req, res) => {
    try {
        const id = req.params.id;

        const siswaData = await siswa.findOne({
            where: { id },
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username"],
        });

        if (!siswaData) {
            return res.status(404).send({
                status: "404",
                message: "Siswa not found",
            });
        }

        await siswa.destroy({
            where: { id },
        });

        res.send({
            status: "200",
            message: "Siswa berhasil dihapus",
            data: {
                siswaData,
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


exports.loginSiswa = async (req, res) => {
    try {
        const schema = joi.object({
            username: joi.string().min(3).required(),
            password: joi.string().min(8).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                status: "validation failed",
                message: error.details[0].message,
            });
        }

        let siswaData = await siswa.findOne({
            where: {
                username: req.body.username,
            },
            attributes: ["id", "nama", "tanggal_lahir", "tempat_lahir", "kelas", "alamat", "no_hp", "nama_ortu", "no_hp_ortu", "username", "password"],
        });

        if (!siswaData) {
            return res.status(404).send({
                status: "404",
                message: "Siswa not found",
            });
        }

        const match = await bcrypt.compare(req.body.password, siswaData.password);

        if (!match) {
            return res.status(401).send({
                status: "401",
                message: "Wrong password",
            });
        }

        const accessToken = jwt.sign(
            { id: siswaData.id },
            process.env.ACCESS_TOKEN_SECRET
        );

        siswaData = {
            id: siswaData.id,
            nama: siswaData.nama,
            tanggal_lahir: siswaData.tanggal_lahir,
            tempat_lahir: siswaData.tempat_lahir,
            kelas: siswaData.kelas,
            alamat: siswaData.alamat,
            no_hp: siswaData.no_hp,
            nama_ortu: siswaData.nama_ortu,
            no_hp_ortu: siswaData.no_hp_ortu,
            username: siswaData.username,
        };

        res.status(200).send({
            status: "200",
            message: "Login success",
            data: {
                siswaData,
                accessToken,
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
