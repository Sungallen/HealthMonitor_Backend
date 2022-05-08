import { promise } from 'bcrypt/promises';
import { func } from 'joi';
import timespan from 'jsonwebtoken/lib/timespan';
import mysql from 'mysql';
import { validateSchema } from 'webpack';
import config from '../../config/config';
import query from '../database/operation.database'

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});

const token = "1232134sadfdsaf";

const addhistory = insertValues => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // connect database
        if (connectionError) {
            reject(connectionError); // if connect failed return
        } else {
            connection.query('INSERT INTO history SET ?', insertValues, (error, result) => { // insert a tuple to history database
                if (error) {
                    console.error('SQL error: ', error);
                    reject({
                        Status: false
                    }); // insert failed retrun error message
                } else if (result.affectedRows === 1) {
                    resolve({
                        Status: true
                    }); // insert successfully return the tuple's id inserted
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

const Login = values => new Promise((resolve, reject) => {
    query.query("SELECT mouse_id, id FROM user WHERE mouse_id = ?", [values.MouseId]).then((result) => {
        if (result.length > 0) {
            const payload = {
                MouseId: result[0].mouse_id,
                UserName: result[0].id
            };
            console.log(payload);
            if (values.Token == null || values.Token === token) {
                resolve({
                    MouseId: `${result[0].mouse_id}`,
                    Token: token,
                    UserName: `${result[0].id}`,
                    IsConnected: true
                })
            } else {
                reject({
                    MouseId: `${result[0].mouse_id}`,
                    Token: token,
                    UserName: `${result[0].id}`,
                    IsConnected: true
                })
            }
        } else {
            reject({
                Mouseid: values.mouseid,
                IsConnected: false
            });
        }
    }).catch((error) => { reject(error); });
});

const modifyName = values => new Promise((resolve, reject) => {
    query.query('UPDATE user SET id = ? WHERE mouse_id = ?', [values.NewUserName, values.MouseId]).then((result) => {
        if (result.affectedRows === 1) {
            resolve({
                Status: true,
                Message: 'success'
            });
        } else {
            reject({
                Status: false,
                Message: 'fail'
            })
        }
    });
});

const pullAllDates = values => new Promise((resolve, reject) => {
    query.query('SELECT DISTINCT DATE(time) AS time FROM history WHERE u_mouse_id = ?', [values.MouseId]).then((result) => {
        if (result.length > 0) {
            console.log(typeof (result));
            let time = [];
            for (let i = 0; i < result.length; i++) {
                time.push(result[i].time);
            }
            resolve({
                MouseId: `${values.MouseId}`,
                Dates: `${time}`,
                Status: true,
                Message: "All data have been returned."
            });
        } else {
            reject({
                MouseId: `${values.MouseId}`,
                Dates: `${result}`,
                Status: true,
                Message: "No data exists."
            });
        }
    });
});

const pullalldata = values => new Promise((resolve, reject) => {
    query.query('SELECT temp, HR, SPO2, time FROM history WHERE DATE(time) = ?', [values.Date]).then((result) => {
        if (result.length > 0) {
            console.log(result);
            let history = [];
            for (let i = 0; i < result.length; i++) {
                history.push(result[i]);
            }
            resolve({
                MouseId: `${values.MouseId}`,
                Date: `${values.Date}`,
                History: `${history}`,
                Status: true
            });
        } else {
            reject({
                MouseId: `${values.MouseId}`,
                Date: `${values.Date}`,
                Status: true
            });
        }
    });
});


export default {
    addhistory,
    realtimedata,
    Login,
    modifyName,
    pullAllDates,
    pullalldata
};
