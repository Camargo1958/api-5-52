const services = require('../services/services')
//const cursos = ['Node JS', 'JavaScript','React Native', 'Java']

//Lista todos os cursos
const getAllCourses = (req, res) => {
    cursos = services.getAllCourses()
    res.json({cursos: cursos})  
}

//Obtem Curso especifico
const getCourseByIndex = (req,res) => {
    //const { index } = req.params;
    //return res.json(cursos[index]);
    res.json({curso: req.curso});
}

//Cria um novo Curso
const createNewCourse = (req,res) => {
    const { name } = req.body;
    services.createNewCourse(name);

    cursos = services.getAllCourses()
    res.json({cursos: cursos});
}

//Atualizando um Curso
const updateCourse = (req,res) => {
    const { index } = req.params;
    const { name } = req.body;

    result = services.updateCourse(index, name)
    if(result!=-1) {
        cursos = services.getAllCourses()
        res.json({cursos: cursos});
    } else {
        res.status(500).send({ error: "Erro interno"})
    }
}

//Excluindo algum Curso
//server.delete('/cursos/:index', checkIndexCurso, 
const deleteCourse = (req,res) => {
    const { index } = req.params;

    result = services.deleteCourse(index)
    if(result) {
        cursos = services.getAllCourses()
        res.json({cursos: cursos});
    } else {
        res.status(500).send({ error: "Erro interno"})
    }
}

module.exports = {
    getAllCourses,
    getCourseByIndex,
    createNewCourse,
    updateCourse,
    deleteCourse
}