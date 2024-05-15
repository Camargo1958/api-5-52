const services = require('../services/services')

//Middleware
function checkIndexCurso(req,res,next){
    //const curso = cursos[req.params.index];
    const curso = services.getCourseByIndex(req.params.index);

    if(!curso){
        return res.status(400).json({error: "Curso inexistente!"});
    }

    req.curso = curso;

    return next();
}

//Middleware
function checkCurso(req,res,next){
    if(!req.body.name || !req.body || req.body.name==null){
        return res.status(400).json({error: "Nome do curso é obrigatório!"});
    }
    return next();
}

module.exports = {
    checkIndexCurso,
    checkCurso
}