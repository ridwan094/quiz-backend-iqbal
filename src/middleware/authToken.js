const jwt = require('jsonwebtoken');
const { siswa } = require('../../models');

exports.authToken = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        const token = header && header.split(" ")[1];

        if (!token) {
            res.status(401).json({
                status: "failed",
                message: "Token not found"
            });
        }

        let userVerifiedId = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    });
                }
                return user.id;
            }
        );

        const userVerified = await siswa.findOne({
            where: {
                id: userVerifiedId,
            },
            attributes: ["id", "nama", "username", "password", "role"]
        });

        req.user = userVerified.dataValues;
        next();
    } catch (error) {
        console.log(error);
        return res.send({
            status: "500",
            message: "Internal Server Error"
        });
    }
};