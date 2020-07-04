// implement your API here
const express = require("express");

const server = express();

const port = 4040

server.get("/", (req, res)=>{
    res.json(
        {
            message: "You've got this Taja!"
        }
    )
})



server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})