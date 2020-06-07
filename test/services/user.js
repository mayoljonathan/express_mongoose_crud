const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe, it } = require('mocha');

use(chaiAsPromised);

const { RegisterUserDTO } = require('../../src/dtos');
const { UserService } = require('../../src/services');
const { ValidationError } = require('../../src/utils/error_handler');

describe('UserService', () => {
  describe('register()', () => {
    it('should throw ValidationError when not providing correct DTO requirements(displayName, username or password)', async () => {
      const payload1 = {
        username: 'short',
        password: 'test1234',
      };
      const payload2 = {
        displayName: 'Test',
      };
      const payload3 = {
        displayName: '',
        username: '',
        password: '',
      };
      const dto1 = new RegisterUserDTO(payload1);
      const dto2 = new RegisterUserDTO(payload2);
      const dto3 = new RegisterUserDTO(payload3);

      await expect(UserService.register(dto1)).to.eventually.be.rejectedWith(ValidationError);
      await expect(UserService.register(dto2)).to.eventually.be.rejectedWith(ValidationError);
      await expect(UserService.register(dto3)).to.eventually.be.rejectedWith(ValidationError);
    });
  });
});
