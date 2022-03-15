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

export default {
    insertcondition,
    realtimedata
};