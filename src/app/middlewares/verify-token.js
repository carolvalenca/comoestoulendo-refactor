const jwt = require('jsonwebtoken');

//verificacao de token de login
module.exports = function (req, res, next) {
    const authHeader = req.header('auth-token');
    if (!authHeader) return res.status(401).send('Acesso negado');

    const [, token] = authHeader.split(" ");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).send('Token inválido');
    }
}