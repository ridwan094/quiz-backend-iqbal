// Buatlah sebuah crud dari model table siswa dan kelas, ketika ingin login menggunakan username dan password dari table siswa, maka siswa dapat memilih beberapa kelas, dia mengambil id dari siswa dan id dari kelas

const { akun } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const body = req.body;
        const schema = joi.object({
            nama: joi.string().min(3).required(),
            username: joi.string().min(3).required(),
            password: joi.string().min(8).required(),
            role: joi.string().min(3).required(),
        });

        const { error } = schema.validate(body);

        if (error) {
            return res.status(400).send({
                status: "validation failed",
                message: error.details[0].message,
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const akun = await akun.create({
            nama: body.nama,
            username: body.username,
            password: hashedPassword,
            role: body.role,
        });

        const token = jwt.sign({ id: akun.id }, process.env.ACCESS_TOKEN_SECRET);

        res.send({
            status: "success",
            data: {
                user: {
                    nama: akun.nama,
                    username: akun.username,
                    role: akun.role,
                },
                token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Internal Server Error",
        });

    }
}

exports.login = async (req, res) => {
    try {
        const body = req.body;
        const schema = joi.object({
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
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Internal Server Error",
        });
    }
}

exports.getAllAkun = async (req, res) => {

    try {
        const akun = await akun.findAll({
            attributes: ["id", "nama", "username", "role"],
        });

        res.send({
            status: "success",
            data: {
                akun,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Internal Server Error",
        });
    }
}

exports.getAkunById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await akun.findOne({
            where: {
                id,
            },
            attributes: ["id", "nama", "username", "role"],
        });

        if (!data) {
            return res.status(404).send({
                status: "failed",
                message: "Akun not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Internal Server Error",
        });
    }
}

exports.deleteAkun = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await akun.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return res.status(404).send({
                status: "failed",
                message: "Akun not found",
            });
        }

        await akun.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "Internal Server Error",
        });
    }
}