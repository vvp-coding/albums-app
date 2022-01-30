const fs = require("fs");
const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/albums";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: /localhost|192.168./ig.test(dbUrl) ? false : { rejectUnauthorized: false },
});

const dbScript = fs.readFileSync("./server/dbsetup.sql").toString();

pool.query(dbScript)
    .then(() => console.info("running db restore script..."))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });