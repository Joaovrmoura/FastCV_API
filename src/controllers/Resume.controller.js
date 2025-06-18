const ResumeModel = require('../models/Resume.model')

const create = async (req, res) => {
    try {
        const data = req.body
    
        if(!data){
            return res.status(400).json({"success": false, "message": "nenhum dado enviado"})
        }
        const salveResume = await ResumeModel.create(data);

        if(!salveResume){
            return res.status(400).json({"success": false, "message": "Erro ao adicionar currículo"})
        }  

        return res.status(200).json({"success": true, "data": data})

    } catch (error) {
        console.error(error)
        res.status(400).json({"success": false, "message": "Erro ao adicionar currículo"})
    }

}

module.exports = {create};