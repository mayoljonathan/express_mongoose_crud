const { UserRepository } = require('../repositories');
const { ValidationError, NotFoundError, ErrorMapper, FormError } = require('../utils/error_handler');

class UserService {
  static async register(registerUserDTO) {
    const { error } = registerUserDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    const { username } = registerUserDTO;

    const user = await UserRepository.find({ username }, { multiple: false });
    if (user) {
      throw new ValidationError('Existing username', [
        FormError('username', 'Username already exist. Please choose another username.'),
      ]);
    }

    return UserRepository.create(registerUserDTO);
  }

  static async login(loginUserDTO) {
    const { error } = loginUserDTO.validate();
    if (error) throw new ValidationError(null, ErrorMapper(error));

    const errorMessage = 'Username or password is incorrect.';
    const { username, password } = loginUserDTO;

    const user = await UserRepository.find({ username }, { multiple: false });
    if (!user) throw new NotFoundError(errorMessage);

    const didMatch = await user.comparePassword(password);
    if (!didMatch) throw new NotFoundError(errorMessage);

    return user.authenticate();
  }
}

module.exports = UserService;
