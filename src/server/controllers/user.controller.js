import userModule from "../modules/user.module";

const insertcondition = (req, res) => {
    const insertValues = req.body;
    userModule.addhistory(insertValues).then((result) => {
        res.send(result);
    }).catch(err => res.send(err));
};

export default {
    insertcondition
};