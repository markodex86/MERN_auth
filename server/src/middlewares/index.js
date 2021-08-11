const passport = require('passport');
const Joi = require('joi');

module.exports = {
  isAuthenticated: (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: 'You Shall not Pass'
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  },
  signup: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().email(),
      password: Joi.string().regex(
        // must contain at least 1 lowercase
        // must contain at least 1 uppercase
        // must contain at least 1 numeric
        // [!@#$%^&{}[]*?] must contain at least 1 special character
        // the password should be between 8-32
        // new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})")
        new RegExp('^[a-zA-Z0-9]{6,12}$')
      )
    })
    const { error } = schema.validate(req.body)
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'this is not an email and you need to have a proper email to register'
          })
          break;
        case 'password':
          res.status(400).send({
            error: `password does not match the combination.
              must contain at least 1 lowercase.
              must contain at least 1 uppercase.
            must contain at least 1 numeric.
            [!@#$%^&{}[]*?] must contain at least 1 special character.
            the password should be between 8-3.
            `
          })
          break;
        default:
          res.status(400).send({
            error: 'invalid registration info'
          })
          break;
      }
    } else {
      next()
    }
  }
}