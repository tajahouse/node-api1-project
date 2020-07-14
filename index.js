// implement your API here
const db = require("./data/db");
const express = require("express");

const server = express();

//Allows middleware to allow Express to parse JSON reqest bodies. 
server.use(express.json());

const port = 3000
const hostname =  '127.0.0.1'

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
        const users = await db.findById(req.params.id)
            users ?
            res.json(users)
            : res.status(404)
            .json({
                      message: 'The user with the specific ID does not exist.'
                  })
  
    })

    //POST
    //---------------------------------------------------------------------------------------------------------------------------  
    server.post("/api/users", (req, res)=>{
        if(!req.body.name && !req.body.bio){
            return res.status(400).json({
                message: "Please add a name and bio for the user"
            })
        }
        const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
        })
        res.status(201).json(newUser)
    })

    //PUT
    //---------------------------------------------------------------------------------------------------------------------------
    server.put('/api/users/:id', async (req, res)=>{
        const { id } = req.params;
        const user = db.findById(id);
        if(user){
            const updateUser = await db.update(id, {
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
    server.delete('/api/users/:id', async (req, res)=>{
        const { id } = req.params
        const user = db.findById(id);
        if(user){
            const deleteUser = await db.remove(id, {
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
   

server.listen(port, hostname, ()=>{
    console.log(`Server listening on http://${hostname}:${port}`)
})
