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
    res.json({
        msg: `got name: ${name}`
    })
    res.end()
})
server.get('/test', async (req, res) => {
    const name = "Bob";
    const response = await fetch(`http://localhost:${PORT}/greet/${name}`);
    const data = await response.json();

    if (data.msg && data.msg.includes(name)) {
        res.json({ result: "ok" });
    } else {
        res.json({ result: "fail" });
    }
    res.end()

})


server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})