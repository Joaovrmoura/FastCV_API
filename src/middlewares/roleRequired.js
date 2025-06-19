// in snsitive routes define (['admin']) inside this function
// and check if userRole get with token are "admin"
export default (role = []) => {
    return (req, res, next) => {
       if(!role.includes(req.userRole)) {
           return res.status(403).json({"sucess": false, "message": "Acesso negado"})
       }
       next();
   };
};