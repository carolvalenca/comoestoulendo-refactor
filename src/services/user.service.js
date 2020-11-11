const User = require('../models/User')

async function getUser(email) {
    const user = await User.findOne({ email });

    return user;
}

async function createUser(name, email, password) {
    const user = new User({
        name,
        email,
        password
    });

    const newUser = await user.save();

    return newUser;
}

module.exports = {
    getUser,
    createUser
}