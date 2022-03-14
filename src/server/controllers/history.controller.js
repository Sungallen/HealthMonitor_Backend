/* eslint-disable prefer-destructuring */


// import res from 'express/lib/response';
import historyModule from '../modules/history.module';

// controller
// get method %get all the informations from history %/api/history
const historyGet = (req, res) => {
  historyModule.selectall().then((result) => {
    res.send(result); // if success, return result
  }).catch(err => res.send(err)); // if fail, return error message
};

// post method %insert a information to history %/api/history
const historyPost = (req, res) => {
  const insertValues = req.body;// get the payload that is json form which is sended by UI
  historyModule.addhistory(insertValues).then((result) => {
    res.send(result); // if success, return result
  }).catch(err => res.send(err)); // if fail, return error message
};

// get method %get a user's history %/api/history/:userId
const userGet = (req, res) => {
  const userId = req.params.userId;
  historyModule.getuserhistory(userId).then((result) => {
    res.send(result);
  }).catch(err => res.send(err));
};

const test = (req, res) => {
  res.send('test');
};


export default {
  test,
  historyGet,
  historyPost,
  userGet
};
