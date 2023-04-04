const jwt = require("jsonwebtoken");
const SECRET_KEY = "satyamgupta"

const auth = (req, res, next) => {
    try {

        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY); // Decrypts the token
            req.userid = user.id;
            req.usertype = user.usertype;
            req.username = user.username;
        }
        else {
            res.status(401).json({ message: "unauthorized user" });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unauthorized user" });

    }
};
module.exports = auth;