const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/user.model')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://pramitbhatia25:Pram%40197058@cluster0.ln3zxwd.mongodb.net/?retryWrites=true&w=majority')


app.post('/api/createUser', async (req, res) => {
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			pass: req.body.pass,
			phone: req.body.phone,
			food_listings: req.body.food_listings,
			lifep: req.body.lifep,
			community: req.body.community,
		})
		console.log("ok")
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err);
		res.json({ status: 'error', error: "HELO!!!!!API" })
	}
})

app.get('/api/fetchUsers', async (req, res) => {
    try {
        const users = await User.find();
		res.json({ status: 'ok', users:users})
    }
    catch(err)
    {
		res.json({ status: 'error', error: err })
    }
})

app.put('/api/updateFoodListing', async (req, res) => {
    let food_listings = req.body.food_listings;
    let lifep = req.body.lifep;
    let email = req.body.email;
	try {
		await User.updateOne(
            {email: email},
            {$set: {food_listings: food_listings, lifep:lifep}}
		);
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}

    console.log("Hi!")
})


app.post('/api/find', async (req, res) => {
        const email = req.body.email;
        try {
        const userLogin = await User.findOne({email:email});
        res.json({status: "ok", user: userLogin});       
        } catch(err) {
            res.json({status:"error", error: err})
    }
});

app.post('/api/login', async (req, res) => {
    try{
        const {email, pass} = req.body;

        if(!email || !pass){
            res.status(400).json({error:"field incomplete"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
        const isMatch = pass === userLogin.pass;
        if(!isMatch){
            res.status(400).json({error:"user login unsuccesful"});
        }else{
            res.json({message:"user login succesful", userType: userLogin.userType});
        }}else{
            res.status(400).json({error:"user login unsuccesful"});
        }
        

    }catch (err) {
        console.log(err);
    }
});

app.listen(1337, () => {
	console.log('Server started on 1337')
})
