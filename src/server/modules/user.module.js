import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});

const addhistory = insertValues => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // connect database
        if (connectionError) {
            reject(connectionError); // if connect failed return
        } else {
            connection.query('INSERT INTO history SET ?', insertValues, (error, result) => { // insert a tuple to history database
                if (error) {
                    console.error('SQL error: ', error);
                    reject(error); // insert failed retrun error message
                } else if (result.affectedRows === 1) {
                    resolve(`insert successfully！ u_mouse_id: ${result.insertId}`); // insert successfully return the tuple's id inserted
                }
                connection.release();
            });
        }
    });
});

export default {
    addhistory
};
