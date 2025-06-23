import ResumeModel from '../models/Resume.model.js';

class ResumeController {

    async findAll(req, res) {
        try {
            const userId = req.userId; 
            const userRole = req.userRole;

            if (!userId ) {
                return res.status(400).json({ "success": false, "message": "Operação inválida" })
            }  
            const resumes = await ResumeModel.find({ user_id: userId }, '_id template_selected createdAt');
            
            if (!resumes) {
                return res.status(402).json({ "success": false, "message": "Nenhum currículo encontrado" })
            }

            if(resumes[0]._id.toString() !== userId && userRole !== 'admin'){
                return res.status(402).json({ "success": false, "message": "Currículo não acessível" })
            }
            
            return res.status(201).json({ "success": true, "data": resumes })

        } catch (error) {
            console.error(error)
            res.status(400).json({ "success": false, "message": "Erro ao consultar currículos" })
        }
    }

    async findOne(req, res) {
    
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ "success": false, "message": "Operação inválida" })
            }
            const resume = await ResumeModel.findById(id);

            if (!resume) {
                return res.status(404).json({ "success": false, "message": "Nenhum currículo encontrado" })
            }
            // if user logged is difirent than resume user_id reference the request is abort
            // req.userId = user with verified token
            
            if (resume.user_id.toString() !== req.userId && req.userRole !== 'admin') {
                return res.status(402).json({ "success": false, "message": "Currículo não acessível" })
            }

            return res.status(201).json({ "success": true, "data": resume })

        } catch (error) {
            console.error(error)
            res.status(403).json({ "success": false, "message": "Erro interno ao buscar currículo" })
        }
    }

    async update(req, res) {
        
        try {
            const { id } = req.params;
            const data = req.body;

            if (!id || !data) {
                return res.status(400).json({ "success": false, "message": "Operção inválida" })
            }
            const resume = await ResumeModel.findOne({ _id: id })

            if (!resume) {
                return res.status(404).json({ "success": false, "message": "Nenhum currículo encontrado" })
            }
            // if user logged is difirent than resume user_id reference the request is abort
            // req.userId = user with verified token
            if (resume.user_id.toString() != req.userId) {
                return res.status(402).json({ "success": false, "message": "Currículo não disponível" })
            }

            // id = param of req with resume _id
            const updateResume = await ResumeModel.findByIdAndUpdate(id, data)

            if (!updateResume) {
                return res.status(500).json({ "success": false, "message": "Erro ao atualizar currículo" })
            }
            return res.status(201).json({ "success": true, "data": updateResume })

        } catch (error) {
            console.error(error)
            res.status(403).json({ "success": false, "message": "Erro interno ao atualizar currículo" })
        }
    }

    async remove (req, res) {
        try {
            const {id} = req.params;

            if(!id){
                return res.status(400).json({ "success": false, "message": "Operção inválida" })
            }
            
            const resumeDeleted = await ResumeModel.findByIdAndDelete(id)

            if(!resumeDeleted){
                return res.status(404).json({ "success": false, "message": "nenhum dado encontrado" })
            }

            return res.status(200).json({ "success": true, "message": "deleted"})

        } catch (error) {
              console.error(error)
            res.status(500).json({ "success": false, "message": "Erro interno ao excluir currículo" })
        }
    }

    async create(req, res) {
        try {
            const data = req.body
            const userId = req.userId;

            if (!data || !userId) {
                return res.status(400).json({ "success": false, "message": "nenhum dado enviado" })
            }

            // Verify if  user has more 5 resumes
            const resumes = await ResumeModel.find({ user_id: userId });

            if(resumes.length >= 5) {
                return res.status(403).json({success: false,message: "Limite de currículos atingido. Exclua um currículo antes de criar outro."});
        }

            const salveResume = await ResumeModel.create(data);

            if (!salveResume) {
                return res.status(400).json(
                    {
                        "success": false,
                        "message":
                            "Erro ao adicionar currículo"
                    }
                )
            }

            return res.status(200).json({ "success": true, "data": data });

        } catch (error) {
            console.error(error);
            res.status(400).json({ "success": false, "message": "Erro ao adicionar currículo" });
        }
    }
}

export default new ResumeController();