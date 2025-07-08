import express from "express";

const server = express();
const PORT = 4545
server.use(express.json());

function logger(req, res, next) {
    req.timeBegin = new Date();
    console.log(`[${req.timeBegin.toISOString()}] ${req.method} ${req.url}`);
    next();
}

server.use(logger)

server.get('/greet', (req, res) => {
    res.json({
        message: `hi from get endpoint: [${new Date().toISOString()}]`,
        time: `time of begin: [${req.timeBegin.toISOString()}]`

    })

})
server.get('/greet/:name', (req, res) => {
    const { name } = req.params;
    console.log(`I got: ${name}`);
    res.json({
        msg: `got name: ${name}`
    })
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

})
server.post('/action', async (req, res) => {
    if (req.body.action === "joke") {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        const joke = ` ${data.setup} ${data.punchline}`.toUpperCase();
        res.json({ joke })
    }
    else if (req.body.action === "cat fact") {
        const apiKey = "live_I5sfhrOzTHNmXsD4zOciCkHjOhHse0lnJUWuRovvMSVT2wTONULmsbGrJvaBqee1"
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            }

        })
        const dataJson = await response.json()
        res.json({ length: dataJson.length });
    } else {
        res.status(400).json({ msg: "body is malformed" });
    }

})


server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})