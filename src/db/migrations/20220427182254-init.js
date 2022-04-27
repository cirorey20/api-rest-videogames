'use strict';

const {USER_TABLE} = require('../models/User');
const {VIDEOGAME_TABLE} = require('../models/Videogame');
const {GENRE_TABLE} = require('../models/Genre');

const {DataTypes} = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
      },
      password: {
          allowNull: false,
          type: DataTypes.STRING,
      },
      role: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'user'
      }
    });
    await queryInterface.createTable(VIDEOGAME_TABLE, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      released: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.DOUBLE
      },
      platforms: {
        type: DataTypes.JSON,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(GENRE_TABLE, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(VIDEOGAME_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
  }
};
