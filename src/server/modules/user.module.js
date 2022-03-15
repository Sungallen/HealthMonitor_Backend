import mysql from 'mysql';
import config from '../../config/config';
import query from '../database/operation.database'

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

const realtimedata = mouseid => new Promise((resolve, reject) => {
    query.query('select * from(select *, row_number() over (partition by u_mouse_id order by time desc) as sn from history) as R where R.sn = 1 and R.u_mouse_id = ?'
        , [mouseid]).then((result) => {
            if (result.length > 0) {
                resolve(result);
            } else {
                reject('The data does not exist.')
            }
        });
});


export default {
    addhistory,
    realtimedata
};
