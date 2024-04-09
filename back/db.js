const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"arij771969",
    host:"localhost",
    port:5433,
    database:"Clubs"
});
module.exports = pool;
 