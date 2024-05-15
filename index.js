const server = require('./server');
const port = 3007;

server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});