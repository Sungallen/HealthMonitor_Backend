import query from '../database/operation.database'
import jwt from 'jsonwebtoken';


const Register = values => new Promise((resolve, reject) => {
    query.query("SELECT * FROM admin WHERE account = ?", [values.account]).then((result) => {
        if (Object.keys(result).length === 0) {
            console.log(values);
            query.query('INSERT INTO admin VALUES(?, ?, ?, ?, ?)',
                [values.account, values.password, values.name, values.e_mail, values.management]).then((result) => {
                    if (result.affectedRows === 1) {
                        resolve('sign up successfully');
                    }
                }).catch((error) => { reject(error); });
        } else {
            reject("fail");
        }
    }).catch((error) => { reject(error); });
});

const Login = values => new Promise((resolve, reject) => {
    query.query("SELECT * FROM admin WHERE account = ?", [values.account]).then((result) => {
        if (result.length > 0) {
            const queryPassword = result[0].password;
            const userPassword = values.password;
            if (queryPassword === userPassword) {
                const payload = {
                    admin_name: result[0].name,
                    admin_mail: result[0].e_mail
                };
                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (86500 * 365) }, 'my_secret_key');
                resolve({
                    //                    message: 'Login Successfully',
                    message: {
                        a: ["123", "21"]
                    },
                    token
                });
            } else {
                reject({ message: 'Wrong Password' });
            }
        } else {
            reject('The account does not exist.');
        }
    }).catch((error) => { reject(error); });
});

const searchalluser = admin => new Promise((resolve, reject) => {
    query.query("SELECT * FROM user WHERE a_account = ?", [admin]).then((result) => {
        if (result.length > 0) {
            resolve(result);
        } else {
            reject('no user managed by you');
        }
    }).catch((error) => { reject(error); });
});





export default {
    Register,
    Login,
    searchalluser
};