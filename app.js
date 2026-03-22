const express = require('express');
const app = express();
app.use(express.json());

let users = [
    {
        firstName: "John",
        email: "johndoe@dal.ca",
        id: "1"
    },
    {
        firstName: "Jane",
        email: "janedoe@dal.ca",
        id: "2",
    }
];



// GET /users  
app.get('/users', (req, res) => {

    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users
    });

});


// GET /users/id  
app.get('/users/:id', (req, res) => {

    const id = req.params.id;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
        });
    }

    res.status(200).json({
        user: user,
        success: true,
    });

});

// PUT /users/:id  (update user)
app.put('/update/:id', (req, res) => {
     //find user with id
    const id = req.params.id;
    const user = users.find(u => u.id === id);
    //check if user exist
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }
    //if there is no body
    if (!req.body) {
        return res.status(400).json({
            message: "Request body is required to update user",
            success: false
        });
    }
    //change name or email or both
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.email) user.email = req.body.email;

    res.status(200).json({
        message: "User updated",
        success: true,
        user: user
    });

});



// POST /users  (create new user)
app.post('/add', (req, res) => {

     //if there is no body
    if (!req.body) {
        return res.status(400).json({
            message: "Request body is required to update user",
            success: false
        });
    }
    
    //generate ID
    const newUserId = String(Number(users[users.length - 1].id) + 1);
    const newUser = {
        firstName: req.body.firstName,
        email: req.body.email,
        id: newUserId
    };
    //add new users
    users.push(newUser);

    res.status(201).json({
        message: "User added",
        success: true,
        user: newUser
    });

});





module.exports = app;