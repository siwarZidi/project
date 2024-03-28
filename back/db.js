const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"200327",
    host:"localhost",
    port:5432,
    database:"Clubs"
});
module.exports = pool;
