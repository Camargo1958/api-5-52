const express = require('express');

const server = express();

server.use(express.json());

const port = 3007;

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request Body = { nome: 'NodeJS', tipo: 'Backend' }

//CRUD> Create, Read, Update, Delete

const cursos = ['Node JS', 'JavaScript','React Native', 'Java'];

//Middleware Global
server.use((req,res,next)=>{
    console.log(`URL CHAMADA: ${req.url}`);
    //console.log(`Body: ${req.body}`);
    return next();
});

//Middleware
function checkIndexCurso(req,res,next){
    const curso = cursos[req.params.index];

    if(!curso){
        return res.status(400).json({error: "Curso inexistente!"});
    }

    req.curso = curso;

    return next();
}

//Middleware
function checkCurso(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório!"});
    }
    return next();
}

// localhost:3007/cursos
//Lista todos os cursos
server.get('/cursos', (req,res)=>{
    return res.json({cursos: cursos});
});

//Lista Curso especifico
server.get('/cursos/:index',checkIndexCurso, (req,res)=>{
    //const { index } = req.params;
    //return res.json(cursos[index]);
    return res.json({curso: req.curso});
});

//Criando um novo Curso
server.post('/cursos', checkCurso, (req,res)=>{
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

//Atualizando um Curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req,res)=>{
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos);
});

//Excluindo algum Curso
server.delete('/cursos/:index', checkIndexCurso, (req,res)=>{
    const { index } = req.params;

    cursos.splice(index,1);
    return res.json(cursos);
});


server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});