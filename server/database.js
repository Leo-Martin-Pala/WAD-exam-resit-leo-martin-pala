const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres", // Enter your password here
    database: "testWad", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});


const execute = async(query1, query2, query3) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query1); // sends queries
        await pool.query(query2); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "strequest" (
	    "id" SERIAL PRIMARY KEY,         
	    "studentcode" VARCHAR(200) NOT NULL,
	    "coursename" VARCHAR(200) NOT NULL,
        "coursecode" VARCHAR(200) NOT NULL,
        "studentrequest" VARCHAR(200) NOT NULL,
        "decision" VARCHAR(200),
        "decisionjusification" VARCHAR(200)
    );`;


const insertDataQuery = `WITH data (studentcode, coursename, coursecode, studentrequest, decision, decisionjusification) AS 
    (
    VALUES
        ('C1002', 'ESI', 'MTAT.03.229', 'I should not lose points in ....', '', '')
    )
    
    INSERT INTO strequest(studentcode, coursename, coursecode, studentrequest, decision, decisionjusification) 
    SELECT  d.studentcode, d.coursename, d.coursecode, d.studentrequest, d.decision, d.decisionjusification
    FROM data d
    WHERE NOT EXISTS (SELECT * FROM strequest WHERE id = 1);`


// A function to execute the previous query   
execute(createTblQuery1, insertDataQuery).then(result => {
    if (result) {
        console.log('If do not exists, table "strequest" is created');
    }
});

module.exports = pool;