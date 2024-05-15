const express = require('express')
const coursesFunctions = require('../middleware/coursesFunctions')
const cursosController = require('../controllers/cursosController')
const cursosRouter = express.Router()

cursosRouter.get('/', cursosController.getAllCourses)
cursosRouter.get('/:index', coursesFunctions.checkIndexCurso, cursosController.getCourseByIndex)
cursosRouter.post('/', coursesFunctions.checkCurso, cursosController.createNewCourse)
cursosRouter.put('/:index', coursesFunctions.checkCurso, coursesFunctions.checkIndexCurso, cursosController.updateCourse)
cursosRouter.delete('/:index', coursesFunctions.checkIndexCurso, cursosController.deleteCourse)


module.exports = cursosRouter