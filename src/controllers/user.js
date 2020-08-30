const { RegisterUserDTO, LoginUserDTO } = require('../dtos');
const { UserService } = require('../services');
const { ValidationError, NotFoundError } = require('../utils/error_handler');
const { ResponseHandler } = require('../utils/response_hander');

class UserController {
  static async register(req, res) {
    try {
      const registerUserDTO = new RegisterUserDTO(req.body);
      const user = await UserService.register(registerUserDTO);

      res.send(ResponseHandler.success('Registered successfully!', user));
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.send(ResponseHandler.fail(null, err));
      }
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  static async login(req, res) {
    try {
      const loginUserDTO = new LoginUserDTO(req.body);
      const { user, token } = await UserService.login(loginUserDTO);

      // Don't mix the actual data (user data) and token to the response body, instead send token as response header (Authorization)
      res.set('Authorization', token);
      res.send(ResponseHandler.success(`Welcome ${user.displayName}!`, user));
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(401).send(ResponseHandler.error(err.message));
      }
      res.status(500).send(ResponseHandler.error(err.message, err));
    }
  }

  // TODO
  static async getProfile(req, res) {
    try {
      res.send(req.params.id);
    } catch (err) {
      console.log(`getProfile catch: ${err}`);
      res.status(403).send(ResponseHandler.error(err.message, err));
    }
  }
}

module.exports = UserController;
