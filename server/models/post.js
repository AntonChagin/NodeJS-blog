'use strict';
module.exports = (sequelize, DataTypes) => {

  var Post = sequelize.define('Post', {
    topic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    annotation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: DataTypes.TEXT
  }, {});

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Post;
};
