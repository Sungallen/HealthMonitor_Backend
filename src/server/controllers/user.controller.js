import userModule from "../modules/user.module";

const insertcondition = (req, res) => {
    const insertValues = req.body;
    userModule.addhistory(insertValues).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};

const realtimedata = (req, res) => {
    const mouseid = req.params.id;
    userModule.realtimedata(mouseid).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};

const userLogin = (req, res) => {
    const values = req.body;
    userModule.Login(values).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};

const modifyName = (req, res) => {
    const values = req.body;
    userModule.modifyName(values).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};

const pullAllDates = (req, res) => {
    const values = req.body;
    userModule.pullAllDates(values).then((result) => {
        res.send(result);
    }).catch(err => res.send(err))
};

const pullalldata = (req, res) => {
    const values = req.body;
    userModule.pullalldata(values).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
}

export default {
    insertcondition,
    realtimedata,
    userLogin,
    modifyName,
    pullAllDates,
    pullalldata
};