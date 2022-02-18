'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, {
        foreignKey: 'UserId', targetKey: 'id'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
         notEmpty: {
          msg: 'Cannot be blank'
        }
      },
      unique: {
        args: true,
        msg: "Email must be unique"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Cannot be blank'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};