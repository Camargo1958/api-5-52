
const cursos = ['Node JS', 'JavaScript','React Native', 'Java']

const getAllCourses = () => {
    return cursos
}

const getCourseByIndex = (index) => {
    return cursos[index]
}

const createNewCourse = (courseName) => {
    cursos.push(courseName)

    return true
}

const updateCourse = (index,newName) => {
    var checkCourse = getCourseByIndex(index)
    if(checkCourse!=null) {
        cursos[index] = newName
        return index
    } else {
        return -1
    }
}

const deleteCourse = (index) => {
    cursos.splice(index,1)
    return true
}

module.exports = {
    getAllCourses,
    getCourseByIndex,
    createNewCourse,
    updateCourse,
    deleteCourse
}