const server = require('../server')
const request = require('supertest')

describe('Server tests', () => {

    describe('Health check tests', () => {
        it('returns server is alive message if helath check is requested', async () => {
            const res = await request(server).get('/').expect('Content-Type', "text/html; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.text).toBe('Server is alive!')
        })
    })

    describe('Courses CRUD tests', () => {

        it('returns a list of courses', async () => {
            const res = await request(server).get('/api/cursos').expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual({
                "cursos": ['Node JS', 'JavaScript','React Native', 'Java']
            })
        })

        it('gets a course by index', async () => {
            const res = await request(server).get('/api/cursos/0').expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual({
                "curso": "Node JS"
            })
        })

        it('tries to get a course with error', async () => {
            const res = await request(server).get('/api/cursos/9').expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Curso inexistente!"
            })
        })

        it('creates a new course', async () => {
            const res = await request(server).post('/api/cursos').send({"name": "Fortran"}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual({
                "cursos": ['Node JS', 'JavaScript','React Native', 'Java', 'Fortran']
            })
        })

        it('tries to create a new course with error #1', async () => {
            const res = await request(server).post('/api/cursos').send({"name": ""}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Nome do curso é obrigatório!"
            })
        })

        it('tries to create a new course with error #2', async () => {
            const res = await request(server).post('/api/cursos').send({}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Nome do curso é obrigatório!"
            })
        })

        it('tries to create a new course with error #3', async () => {
            const res = await request(server).post('/api/cursos').send({"teste": "Fortran"}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Nome do curso é obrigatório!"
            })
        })

        it('updates a course', async () => {
            const res = await request(server).put('/api/cursos/0').send({"name": "C#"}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual({
                "cursos": ['C#', 'JavaScript','React Native', 'Java', 'Fortran']
            })
        })

        it('tries to update a course with error', async () => {
            const res = await request(server).put('/api/cursos/9').send({"name": "C#"}).expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Curso inexistente!"
            })
        })

        it('deletes a course', async () => {
            const res = await request(server).delete('/api/cursos/1').expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(200)
            expect(res.body).toStrictEqual({
                "cursos": ['C#', 'React Native', 'Java', 'Fortran']
            })
        })

        it('tries to delete a course with error', async () => {
            const res = await request(server).delete('/api/cursos/7').expect('Content-Type', "application/json; charset=utf-8")

            expect(res.status).toBe(400)
            expect(res.body).toStrictEqual({
                "error": "Curso inexistente!"
            })
        })
    })
})