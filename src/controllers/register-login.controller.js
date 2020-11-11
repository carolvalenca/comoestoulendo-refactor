const UserService = require ('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const userExist = await UserService.getUser(email);
        console.log(userExist)

        if (userExist) {
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserService.createUser(name, email, hashedPassword);

        res.json(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ err });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUser(email);

        if (!user) return res.status(400).json({ message: "Email não cadastrado" });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ message: "Senha inválida" });

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

        return res.header('auth-token', token).json({ token, email: user.email });
    } catch(err) {
        console.log(err)
        res.status(500).json({ err });
    }
}

module.exports = {
    register,
    login
}