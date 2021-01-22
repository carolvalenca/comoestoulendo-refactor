const { User } = require('../app/models');

async function getUser(email) {
    const user = await User.findOne({ where: { email }});

    return user;
}

async function createUser(name, email, password) {
    const newUser = await User.create({
        name,
        email,
        password
    });

    return newUser;
}

module.exports = {
    getUser,
    createUser
}