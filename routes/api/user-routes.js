// Requirements 
const { User } = require('../../models');
const router = require('express').Router();
const errorUserNotFound = res => 
    res.status(404).json({ message: 'this user does not exist...' });

// GET all user's
const GET_ROOT = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};

// CREATE a new user
const POST_ROOT = async ({ body }, res) => {
    try {
        const newUser = await User.create(body);
        return res.json(newUser);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};


// get single user 
const GET_ID = async ({ params }, res) => {
    try {
        const user = await User.findOne({ _id: params.id })
            .select('-__v')

        if (!user) {
            return errorUserNotFound(res);
        }

        return res.status(200).json(user);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};

// update a single user
const UPDATE_ID = async ({ params, body }, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { runValidators: true, new: true }
        );

        if (!user) {
            return errorUserNotFound(res);
        }

        return res.status(200).json(user);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};

// delete a user
const DELETE_ID = async ({ params }, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: params.id });
        if (!user) {
            return errorUserNotFound(res);
        }

        return res.status(200).json(user);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};


// add a friend
const POST_FRIEND = async ({ params }, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .select('-__v');

        if (!user) {
            return errorUserNotFound(res);
        }

        return res.status(200).json(user);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};

// delete a friend
const DELETE_FRIEND = async ({ params }, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .select('-__v');

        if (!user) {
            return errorUserNotFound(res);
        }

        return res.status(200).json(user);
    } catch(err) {
        console.log('Error: ', err);
        return res.status(500).json(err);
    }
};


// ALL routes
router
    .route('/')
    .get(GET_ROOT)
    .post(POST_ROOT)
router
    .route('/:id')
    .get(GET_ID)
    .put(UPDATE_ID)
    .delete(DELETE_ID)
router
    .route('/:id/friends/:friendId')
    .post(POST_FRIEND)
    .delete(DELETE_FRIEND)



    
module.exports = router