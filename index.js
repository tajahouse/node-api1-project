// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

const port = 3001

    server.get("/api/users", (req, res)=>{
        const users = db.find() 
        users ? 
        res.json(users) 
            : res.status(500)
    })

    server.get('/api/users/:id', (req, res)=>{
        const user = db.findById();
        user ?
        res.json(user) 
            : res.status(404)
    })

    server.post('/api/users', (req, res)=>{
        if(!req.body.name && !req.body.bio){
            return res.statusCode(400).json({
                message: "Please add a name and bio for the user"
            })
        }
        const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
        })
        res.status(201).json(newUser)
    })

    server.put('/api/users/:id', (req, res)=>{
        const user = db.findById();
        if(user){
            const updateUser = db.update(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio
            })
            res.json(updateUser)
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    
    })
    server.delete('/api/users/:id', (req, res)=>{
        const user = db.findById();
        if(user){
            const deleteUser = db.delelte(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio
            })
            res.json(deleteUser)
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    
    })

server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

