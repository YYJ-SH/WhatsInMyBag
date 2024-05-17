// config/database.js
const { Sequelize } = require('sequelize');
const config = require('./config.json'); // config.json 파일에서 설정 가져오기
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

module.exports = sequelize;