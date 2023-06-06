exports.authRole = async (req, res, next) => {
    try {
        const roleAllowed = ["admin", "siswa"];
        let allowedBoolean = false;

        console.log(req.user.role);

        roleAllowed.map((item) => {
            if (item === req.user.role) {
                allowedBoolean = true;
            }
        });

        if (allowedBoolean) {
            return next();
        } else {
            return res.status(403).json({
                status: "failed",
                message: "You are not allowed to access this API"
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: "500",
            message: "Internal Server Error"
        });
    }
}