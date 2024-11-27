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
            await connection.execute(`DROP TABLE Profile CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Mailbox CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Personality CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Question CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Users CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserAContract CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserBContract CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserEmailAge CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserEmailGender CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserEmailPostalCode CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Mail CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserAnswer CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Matches CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Pact CASCADE CONSTRAINTS`);

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
    `);

        // Create PostalCodeCity 
        await connection.execute(`
        CREATE TABLE PostalCodeCity (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            City VARCHAR2(50),
            FOREIGN KEY (PostalCode) REFERENCES PostalCode(PostalCode) ON DELETE CASCADE
        )
    `);

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

        // Create Question
        await connection.execute(`
        CREATE TABLE Question (
            QuestionID VARCHAR2(8) PRIMARY KEY, 
            QuestionContent VARCHAR(2000)
      )
    `);

        // Create User
        await connection.execute(`
        CREATE TABLE Users (
            Email VARCHAR2(200) PRIMARY KEY,
            Name VARCHAR2(200),
            PersonalityID VARCHAR2(8),
            ProfileID VARCHAR2(20),
            MailBoxID VARCHAR2(8),
            PostalCode VARCHAR2(20),
            FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE,
            FOREIGN KEY (PersonalityID) REFERENCES Personality(PersonalityID) ON DELETE CASCADE,
            FOREIGN KEY (MailBoxID) REFERENCES Personality(PersonalityID) ON DELETE CASCADE,
            FOREIGN KEY (PostalCode) REFERENCES PostalCode(PostalCode) ON DELETE CASCADE
            ) 
    `);

        // Create User
        await connection.execute(`
            CREATE TABLE UserAContract(
                User_A_Email VARCHAR2(200) PRIMARY KEY,
                Contract VARCHAR2(255),
                FOREIGN KEY (User_A_Email) REFERENCES Users(Email)
            )
        
        `);

        // Create User
        await connection.execute(`
            CREATE TABLE UserBContract(
                User_B_Email VARCHAR2(200) PRIMARY KEY,
                Contract VARCHAR2(255),
                FOREIGN KEY (User_B_Email) REFERENCES Users(Email)
            )
        
        `);

        // Create UserEmailAge table
        await connection.execute(`
            CREATE TABLE UserEmailAge (
                Email VARCHAR2(200) PRIMARY KEY,
                Age NUMBER,
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create UserEmailGender table
        await connection.execute(`
            CREATE TABLE UserEmailGender (
                Email VARCHAR2(200) PRIMARY KEY,
                Gender VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create UserEmailGender table
        await connection.execute(`
            CREATE TABLE UserEmailPostalCode (
                Email VARCHAR2(200) PRIMARY KEY,
                PostalCode VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
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