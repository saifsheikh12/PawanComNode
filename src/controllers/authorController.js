const authorModel = require("../models/authorModel");
const validator = require("email-validator");
const jwt = require("jsonwebtoken")



// ==========================================================API FOR CREATING AUTHOR=========================================================================================

const createAuthor = async function (req, res) {
    try {
        let authorData = req.body;

       

        if (!authorData.UserName) return res.status(400).send({ status: false, msg: "UserName Is Mandatory" });
     


      
        let validEmail = validator.validate(authorData.email);
        if (validEmail === false) return res.status(400).send({ status: false, msg: "Invalid Email" });
        let author = await authorModel.findOne({ email: authorData.email });
        if(author)return res.status(400).send({status:false,msg:"Email Already In Use,Please Try With Other EmailId"})

        if (!authorData.password) return res.status(400).send({ status: false, msg: "Password is Mandatory" })
        let savedData = await authorModel.create(authorData);
        return res.status(201).send({ status: true,message:"Author Created Successfully", data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




// ======================================================API FOR AUTHOR LOGIN=======================================================================================

const login = async function (req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email) return res.status(400).send({ status: false, msg: "Please Input Email" });
        if (!password) return res.status(400).send({ status: false, msg: "Please Input Password" });
        let authorData = await authorModel.findOne({ email: email, password: password });
        if (!authorData) return res.status(400).send({ status: false, msg: "No User Found With These Credentials" });
        let token = jwt.sign({ authorid: authorData._id, email: authorData.email }, "ZanduBalm");

        return res.status(200).send({ status: true, data: { token: token } })
    }
    catch (error) {
        return res.status(500).send({ status: false,message:"Author loggedIn Successfully", message: error.message })
    }
}












module.exports.createAuthor = createAuthor;
module.exports.login = login;
