const UserService = require ('../services/user.service');

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        const userExist = await UserService.getUser(email);

        if (userExist) {
            return res.status(403).json({ message: "Email já cadastrado" });
        }

        const newUser = await UserService.createUser(name, email, password);

        res.json(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ err });
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUser(email);

        if (!user) return res.status(401).json({ message: "Email não cadastrado" });

        if (!(await user.checkPassword(password))) return res.status(401).json({ message: "Senha inválida" });

        const token = await user.generateToken();

        return res.header('auth-token', token).json({ token, email: user.email });
    } catch(err) {
        console.log(err)
        res.status(500).json({ err });
    }
}

module.exports = {
    signUp,
    signIn
}
