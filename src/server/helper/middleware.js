import JWT from "jsonwebtoken";
import config from "../../config/config";
import httpStatus from "http-status";
import error from "./error";

function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' '); // 字串切割
        const bearerToken = bearer[1]; // 取得 JWT
        req.token = bearerToken; // 在response中建立一個token參數
        JWT.verify(bearerToken, 'my_secret_key', (err, payload) => {
            if (err) {
                res.status(401).send({
                    code: 401,
                    message: 'token verify fail！'
                });
            } else {
                req.user = {
                    id: payload['payload'].admin_name,
                    mail: payload['payload'].admin_mail
                }
                console.log("BearerToken decode\n" + JSON.stringify(req.user))
                next();
            }
        });
    } else {
        res.status(403).send({
            code: 403,
            message: 'you have not login！'
        });
    }
};

export default { verifyToken };