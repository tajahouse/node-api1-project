// implement your API here
const db = require("./data/db");
const express = require("express");
const { get } = require("express/lib/response");


const server = express();
server.use(express.json());

const port = 3001

//GET
//---------------------------------------------------------------------------------------------------------------------------
server.get('/', (req, res) => {
    res.send('You\'ve got this Taja');
});

server.get("/api/users", async (req, res)=>{
    const users =  await db.find()
        users ?
        res.json(users) 
        : res.status(500)
            .json({
                     message: 'The user information could not be retrieved.',
                 });
    
     })

    server.get('/api/users/:id', async (req, res)=>{
        const users = await db.findById()
            users ?
            res.json(users)
            : res.status(404)
            .json({
                      message: 'The user with the specific ID does not exist.'
                  })
  
    })

    //POST
    //---------------------------------------------------------------------------------------------------------------------------  
    server.post('/api/users', async (req, res)=>{
        if(!req.body.name && !req.body.bio){
            return res.statusCode(400).json({
                message: "Please add a name and bio for the user"
            })
        }
        const newUser = await db.insert({
        name: req.body.name,
        bio: req.body.bio
        })
        res.status(201).json(newUser)
    })

    //PUT
    //---------------------------------------------------------------------------------------------------------------------------
    server.put('/api/users/:id', async (req, res)=>{
        const user = await db.findById();
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
    //DELETE
    //---------------------------------------------------------------------------------------------------------------------------
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
