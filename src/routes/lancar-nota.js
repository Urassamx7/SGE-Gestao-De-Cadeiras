const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

// Configuração da pool de conexão para MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const lancarNota = async () => {
  
};
