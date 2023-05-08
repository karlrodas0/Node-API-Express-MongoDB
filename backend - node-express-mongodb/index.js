const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://karlrodas0:12345@karldb.xszzzmq.mongodb.net/Node-Express-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})


app.get('/', (req, res) => {
    res.send('Use /users to view all user')
})


app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const users = await User.findById(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// create
app.post('/users', async(req, res) => {
    try {
        const users = await User.create(req.body)
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update 
app.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const users = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any users in database
        if(!users){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        const updatedProduct = await User.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete
app.delete('/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const users = await User.findByIdAndDelete(id);
        if(!users){
            return res.status(404).json({message: `cannot find any users with ID ${id}`})
        }
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

