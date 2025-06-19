import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


class UserController {
    async findOne(req, res){
        try {

            const {id} = req.params;
            if(!id){
                return res.status(401).json({ "sucess": false, "message": "Operação inválida" })
            }

            const user = await UserModel.findById(id)

            if(!user){
                return res.status(402).json({ "sucess": false, "message": "Usuário não encontrado!" })
            }

            return res.status(201).json({"sucess": true, "message": "Logado com sucesso","data": user})

        } catch (error) {
            console.error(error);
            return res.status(500).json({ "sucess": false, "message": "Algo deu errado ao carregar usuário" });
        }
    }
    
    async findAll(req, res){
          try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "sucess": false, "message": "Algo deu errado ao buscar usuários" });
        }
    }
    async update(req, res){
          try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "sucess": false, "message": "Algo deu errado ao editar usuário" });
        }
    }
    async remove(req, res){
        try {
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ "sucess": false, "message": "Algo deu errado ao deletar" });
        }
    }
}