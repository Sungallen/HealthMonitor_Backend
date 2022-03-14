import adminModule from "../modules/admin.module";

const register = (req, res) => {
    const values = req.body;
    adminModule.Register(values).then((result) => {
        res.send(result);
    }).catch((err) => res.send(err));
};

const login = (req, res) => {
    const values = req.body;
    adminModule.Login(values).then((result) => {
        res.send(result);
    }).catch((err) => res.send(err));
}

const searchalluser = (req, res) => {
    const admin = req.params.adminID;
    adminModule.searchalluser(admin).then((result) => {
        res.send(result);
    }).catch((error) => res.send(err));
}

export default {
    register,
    login,
    searchalluser
};