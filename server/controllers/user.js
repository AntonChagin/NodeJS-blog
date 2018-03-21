const User = require('../models').User;

module.exports = {
  async create(candidate, res) {
    try {
      user = await User.findOne({
        where: {
          email: candidate.email
        }
      })
      if (user)
      {
        return {error:true,message:('Email занят!')};
      } else {
        var data =
        {
          email: candidate.email,
          encryptedPassword: candidate.password,
          login: candidate.username
        };
        rnewUser= await User.create(data);
        if (!rnewUser) {
          return new Error(' Ошибка сохранения в базу');
        }
        if (rnewUser) {
          return {error:false,payload:rnewUser};
        }
      }
    } catch (e) {
      res=e;
      return new Error(' Ошибка при создании нового пользователя');
    }
  },
  
  async validate(candidate, res) {
    user = await User.findOne({
      where: {
        email: candidate.email
      }
    });
    if (user)
    {
      temp = await  user.passwordIsValid(candidate.password)
      if(temp)return {error:false};
      else return {error:true,message:('Неверный пароль!')}
    } else {
      return {error:true,message:('Пользователя с таким email не существует!')};}
    },

  };
