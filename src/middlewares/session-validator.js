let Validator = require('validatorjs');

const registerValidator = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        email: "required|email",
        password: "required|string|min:6",
    }

    const data = req.body

    let validation = new Validator(data, validationRule)

    if (validation.fails()) {
        return res.status(400).json({ message: "the register validation failed" })
    } else {
        next()
    }
}

function loginValidator(req, res, next) {
    const validationRule = {
        email: "required|email",
        password: "required|string|min:6",
    }

    const data = req.body
    console.log(data)

    let validation = new Validator(data, validationRule)

    console.log(validation.fails())

    if (validation.fails()) {
        return res.status(400).json({ message: "the login validation failed" })
    } else {
        next()
    }
}

module.exports = { 
  registerValidator,
  loginValidator
}
