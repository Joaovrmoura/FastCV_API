const UserModel = require('../models/User.model')
const bcryptjs = require('bcryptjs')

const register = async (req, res) => {

    try {
        const {email, password} = req.body;
        console.log(email, password);

        const userExists = await UserModel.findOne({email});

         if(userExists){
            return res.status(400).json({ "sucess": false, "message": "Usuário já cadastrado!"}
            )
        }

        const hash_password = await bcryptjs.hash(password, 10)

        const createUser = await UserModel.create(
            {
                "email": email,
                "password": hash_password
            }
        );

        if(createUser){
            return res.status(200).json({"sucess": true, "message": "Usuário cadastrado com sucesso!"})
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({"sucess": false, "message": "Algo deu errado!"})
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const userExists = await UserModel.findOne({email})

        if(!userExists){
            return res.status(402).json({"sucess": false, "message": "Usuário não cadastrado!"})
        }
        const comparePassword = await bcryptjs.compare(password, userExists.password)

        if(!comparePassword){
            return res.status(400).json({"sucess": false, "message": "erro nas credenciais!"})
        }
        const user = {
            _id: userExists._id,
            email: userExists.email
        }
        return res.status(200).json({"sucess": true,"message": "cadastrado com sucesso", "data": user})
     
    }catch(error) {
        console.error(error);
        return res.status(500).json({"sucess": false, "message": "Algo deu errado!"})
    }
}

module.exports = {
    register, 
    login
}