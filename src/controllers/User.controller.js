import UserModel from '../models/User.model.js';

class UserController {

    async findOne(req, res){
        try {

            const {id} = req.params;    
            console.log(id, req.userId, req.userRole);
            
            if(id !== req.userId && req.userRole !== 'admin'){
                return res.status(400).json({ "success": false, "message": "Operação inválida" })
            }

            const user = await UserModel.findById(id)

            if(!user){
                return res.status(402).json({ "success": false, "message": "Usuário não encontrado!" })
            }
            const {_id, email, role, createdAt, updatedAt} = user;

            return res.status(201).json({"success": true, "data": {_id, email, role, createdAt, updatedAt} })

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                { "success": false, 
                    "message": "Algo deu errado ao carregar usuário" 
                }
            );
        }
    }
    
    async findAll(req, res){
        try {
            const allUsers = await UserModel.find({}, {password: 0, __v: 0})

            if(!allUsers){
                return res.status(402).json({ "success": false, "message": "Usuário não encontrado!" })
            }

            return res.status(200).json({"success": true, "data": allUsers})

        } catch (error) {
            console.error(error);
            return res.status(500).json(
                { 
                    "success": false, 
                    "message": "Algo deu errado ao buscar usuários" 
                }
            );
        }
    }

    async remove(req, res){
        try {
            const {id} = req.params;

            if(id.length <= 1 || req.userRole !== 'admin'){
                return res.status(400).json({ "success": false, "message": "Operação inválida!" })
            }

            const user = await UserModel.findByIdAndDelete(id)

            if(!user){
                return res.status(402).json({ "sucess": false, "message": "Usuário não encontrado!" })
            }

            return res.status(200).json(
                {
                    "sucess": true, 
                    "message": "Usuário deletado com sucesso", 
                    "data": user
                }
           )
            
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                { 
                    "sucess": false, 
                    "message": "Algo deu errado ao deletar" 
                }
            );
        }
    }
    
}

export default new UserController()