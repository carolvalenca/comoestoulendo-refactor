let Validator = require('validatorjs');

let validation = new Validator({
    name: 'D',
    email: 'carol'
  }, {
    name: 'size:3',
    email: 'required|email'
  });
  
  validation.fails(); // true
  validation.passes(); // false
  
  // Error messages
  validation.errors.first('email'); // 'The email format is invalid.'
  validation.errors.get('email'); // returns an array of all email error messages

  console.log(validation.fails())
  console.log(validation.errors.get('email'))