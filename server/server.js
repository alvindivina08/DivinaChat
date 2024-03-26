const { Amplify } = require('aws-amplify')
const { generateClient } = require('aws-amplify/api')
const { getUsers, listUsers } = require('../src/graphql/queries')
const { createUsers } = require('../src/graphql/mutations')
const amplifyconfig = require('../src/amplifyconfiguration.json')
const path = require('path')



const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
Amplify.configure(amplifyconfig);

const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json());
const port = 5000
const client = generateClient()

app.listen(port, ()=>{
    console.log('listening')
})

app.post('/add_user', async (req, res) => {
    console.log(req.body)
    const uid = "id" + Math.random().toString(16).slice(2)
    const { firstName, lastName, email, isAnon = false } = req.body;
    const id = uid;
    let userInput, name, lastname, anonEmail;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (isAnon) {
        name = `${uid}`;
        lastname = `${uid}lastName`;
        anonEmail = `${uid}@anon.com`;
    } else {
        name = firstName;
        lastname = lastName;
    }
    
    userInput = {
        input: {
            id,
            name,
            lastname,
            email: isAnon ? anonEmail : email,
            password: isAnon ? '' : hashedPassword
        }
    };
    console.log(userInput)
    try {
        await client.graphql({
            query: createUsers,
            variables: userInput
        })
        return res.json({ message: 'User created successfully' });
    } catch (e) {
        if (e.errors && e.errors.length > 0) {
            return res.status(400).json({ message: e.errors[0].message });
        } else {
            return res.status(400).json({ message: 'An error occurred' });
        }
    }
})

app.post('/login', async (req, res) => {
    const variables  = {
        email: req.body.email,
        password: req.body.password
    };
    try {
        const response = await client.graphql({
            query: getUsers,
            variables
        })
        const storedPassword = response.data.getUsers.password
        const passwordMatch = await bcrypt.compare(variables.password, storedPassword);
        console.log(passwordMatch)
        return res.json({ message: 'User logged in successfully' });
    } catch (e) {
        console.log(e)
        if (e.errors && e.errors.length > 0) {
            return res.status(400).json({ message: e.errors[0].message });
        } else {
            return res.status(400).json({ message: 'An error occurred' });
        }
    }
})