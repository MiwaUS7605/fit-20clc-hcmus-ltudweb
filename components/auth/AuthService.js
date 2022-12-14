const bcrypt = require('bcryptjs');

const authRepository = require('./AuthRepository');

class AuthService {
    async register(name, phonenumber, address, email, password) {
      if (await authRepository.emailExists(email))
        throw new Error('Email exists!');
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return authRepository.insertUser(name, phonenumber, address, email, hash);
    }
    
    async checkUserCredential(email, password) {
      const user = await authRepository.getUserByEmail(email);
      if (!user) return null;
      if (await bcrypt.compare(password, user.password))
        return user;
      return null;
    }

    async getUserByEmail(email) {
        return authRepository.getUserByEmail(email);
    }

    async editProfile(name, phonenumber, address, password, user) {
        console.log("Tui tiep tuc na");
        return authRepository.edit(name, phonenumber, address, password, user);
    }
    
}

module.exports = new AuthService;