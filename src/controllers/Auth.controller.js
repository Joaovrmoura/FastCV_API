import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(401).json({ "success": false, "message": "Dados incompletos" })
            }

            const userExists = await UserModel.findOne({ "email": email.toLowerCase() });

            if (userExists) {
                return res.status(400).json({ "success": false, "message": "Usuário já cadastrado!" })
            }

            const hash_password = await bcryptjs.hash(password, 10);

            const createUser = await UserModel.create(
                {
                    email: email,
                    password: hash_password,
                    role: "user"
                }
            );

            if (createUser) {
                const token = jwt.sign(
                    {
                        _id: createUser._id.toString(),
                        email: createUser.email, role: createUser.role
                    }, 
                    process.env.ACESS_TOKEN_SECRET,
                    {
                        expiresIn: process.env.TOKEN_EXPIRATION
                    }
                    
                );

                res.cookie('token', token, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
                    maxAge: 24 * 60 * 60 * 1000
                });

                return res.status(201).json(
                    { 
                        "success": true, "message": "Usuário cadastrado com sucesso!", 
                        "data": { 
                             _id: createUser._id.toString(),
                             email: createUser.email, 
                            role: createUser.role
                        } 
                    }
                );
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ "success": false, "message": "Algo deu errado!" })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(401).json({ "success": false, "message": "Dados incompletos" })
            }
            const userExists = await UserModel.findOne({ email })

            if (!userExists) {
                return res.status(402).json({ "success": false, "message": "Usuário não cadastrado!" })
            }
            const comparePassword = await bcryptjs.compare(password, userExists.password)

            if (!comparePassword) {
                return res.status(400).json({ "success": false, "message": "erro nas credenciais!" })
            }

            const { _id, role } = userExists

            const user = {
                _id: _id,
                email: userExists.email,
                role: role
              }


            const token = jwt.sign({ _id, email, role }, process.env.ACESS_TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION })

            res.cookie('token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",  // on localhost are development
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(201).json(
                {
                    "success": true,
                    "message": "Logado com sucesso",
                    "data": user
                }
            )

        } catch (error) {
            console.error(error);
            return res.status(500).json({ "success": false, "message": "Algo deu errado!" });
        }
    }
}

export default new AuthController()