'use strict';
const bcrypt = require('bcrypt');

function getHash(value) {
  bcrypt.hash(value, 12, function(err, hash) {
    return hash;
  });
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encryptedPassword:  {
      type: DataTypes.TEXT,
      allowNull: false,
      set(val) {
        let hash = bcrypt.hashSync(val, 12);
          this.setDataValue('encryptedPassword', hash);
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
   User.prototype.passwordIsValid = function(pass) {
    const hash = this.getDataValue('encryptedPassword');
     return bcrypt.compare(pass, hash);
     //.then(res=>{console.log('compare '+res);return res;});
  };
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'userPosts',
    });
  };

  return User;
};
