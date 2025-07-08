import express, { json } from "express";

const server = express();
const PORT = 4545
server.use(express.json());


server.get('/greet', (req, res) => {
    const data = {
        message: `hi from get endpoint: ${new Date()}`
    }
    const dataStr = JSON.stringify(data)
    res.end(dataStr)
})
server.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    console.log(`I got: ${name}`);
    const data = {
        message: `got name: ${name}`
    }
    const dataStr = JSON.stringify(data)
    res.end(dataStr)
})
server.get('/test', (req, res) => {

})


server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})