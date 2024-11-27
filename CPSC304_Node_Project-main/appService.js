const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
            await connection.execute(`DROP TABLE PostalCode CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE PostalCodeCity CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Question CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Pact CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Profile CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Mailbox CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Personality CASCADE CONSTRAINTS`);
        } catch (err) {
            console.log('Table might not exist, proceeding to create...');
        }

        // Create DEMOTABLE
        await connection.execute(`
        CREATE TABLE DEMOTABLE (
            id NUMBER PRIMARY KEY,
            name VARCHAR2(20)
        )
    `);

        // Create POSTALCODE
        await connection.execute(`
        CREATE TABLE PostalCode (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            Country VARCHAR2(20)
        )
    `);

        // Create PROFILE
        await connection.execute(`
        CREATE TABLE Profile (
            ProfileID VARCHAR2(20) PRIMARY KEY,
            Name VARCHAR2(20),
            Age INTEGER,
            Sexuality VARCHAR2(10),
            DreamVacation VARCHAR2(50),
            FavouriteHobby VARCHAR2(30),
            FavouriteSport VARCHAR2(30),
            FavouriteMusicGenre VARCHAR2(30)
        )
    `)

        // Create PostalCodeCity 
        await connection.execute(`
        CREATE TABLE PostalCodeCity (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            City VARCHAR2(50),
            FOREIGN KEY (PostalCode) REFERENCES PostalCode(PostalCode) ON DELETE CASCADE
        )
    `);
        // Create Question
        await connection.execute(`
        CREATE TABLE Question (
            QuestionID CHAR(8) PRIMARY KEY, 
            QuestionContent VARCHAR2(2000) NOT NULL
        );
    `);



        await connection.execute(`
        CREATE TABLE Pact (
            User_A_Email VARCHAR2(255),
            User_B_Email VARCHAR2(255),
            User_A_Contract VARCHAR2(255),
            User_B_Contract VARCHAR2(255),
            CompatabilityScore INTEGER,
            PRIMARY KEY (User_A_Email, User_B_Email),
            FOREIGN KEY (User_A_Email) REFERENCES User(Email),
            FOREIGN KEY (User_B_Email) REFERENCES User(Email),
            FOREIGN KEY (User_A_Contract) REFERENCES UserAContract(Contract),
            FOREIGN KEY (User_B_Contract) REFERENCES UserBContract(Contract),
            PRIMARY KEY (User_A_Email, User_B_Email)
    );
    `)


        // Create Mailbox 
        await connection.execute(`
        CREATE TABLE Mailbox (
            MailboxID VARCHAR2(255) PRIMARY KEY,
            UnreadMail NUMBER
        )   
    `);

        // Create Personality 
        await connection.execute(`
        CREATE TABLE Personality (
            PersonalityID VARCHAR2(8) PRIMARY KEY,
            Introvertedness NUMBER,
            Extrovertedness NUMBER,
            Intuitive NUMBER, 
            Observant NUMBER, 
            Thinking NUMBER, 
            Feeling NUMBER, 
            Prospecting NUMBER, 
            Judging NUMBER, 
            Turbulent NUMBER,
            Assertive NUMBER
        )
    `);

        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable,
    insertDemotable,
    updateNameDemotable,
    countDemotable
};