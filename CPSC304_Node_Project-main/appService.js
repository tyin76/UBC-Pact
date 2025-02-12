const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const {
    insertFegiclyn,
    insertTerence,
    insertFegico,
    insertPostalCodes,
    insertJake,
    insertJaklyn,
    insertTerelyn,
    assignPostalCodes,
    assignGenders,
    assignMail,
    createQuestions,
    assignAge
} = require('./userData');

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

async function fetchUsersTableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT u.Email, u.Name, u.PersonalityID, u.ProfileID, u.MailBoxID, ug.Gender, upc.PostalCode, pCountry.Country, pCity.City, ua.Age, p.Name, p.Sexuality, p.DreamVacation, p.FavouriteHobby, p.FavouriteSport, p.FavouriteMusicGenre
            FROM Users u
            JOIN UserGender ug ON u.Email = ug.Email
            JOIN UserPostalCode upc ON u.Email = upc.Email
            LEFT JOIN PostalCodeCountry pCountry ON pCountry.PostalCode = upc.PostalCode
            LEFT JOIN PostalCodeCity pCity ON pCity.PostalCode = upc.PostalCode
            JOIN UserAge ua ON u.Email = ua.Email
            JOIN Profile p ON  u.ProfileID = p.ProfileID
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

/**
 *             SELECT *
            FROM Users u, PostalCode pc, PostalCodeCity pcc, UserPostalCode upc, UserGender ug
            WHERE u.Email = upc.Email AND upc.PostalCode = pc.PostalCode AND upc.PostalCode = pcc.PostalCode AND ug.Email = u.Email
 */

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
            await connection.execute(`DROP TABLE PostalCodeCountry CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE PostalCodeCity CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Profile CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Mailbox CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Personality CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Question CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE Users CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserAContract CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserBContract CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserAge CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserGender CASCADE CONSTRAINTS`);
            await connection.execute(`DROP TABLE UserPostalCode CASCADE CONSTRAINTS`);
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
        CREATE TABLE PostalCodeCountry (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            Country VARCHAR2(20)
        )
    `);

        // Create PROFILE
        await connection.execute(`
        CREATE TABLE Profile (
            ProfileID VARCHAR2(200) PRIMARY KEY,
            Name VARCHAR2(50),
            Sexuality VARCHAR2(10),
            DreamVacation VARCHAR2(50),
            FavouriteHobby VARCHAR2(50),
            FavouriteSport VARCHAR2(50),
            FavouriteMusicGenre VARCHAR2(50)
        )
    `);

        // Create PostalCodeCity 
        await connection.execute(`
        CREATE TABLE PostalCodeCity (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            City VARCHAR2(50),
            FOREIGN KEY (PostalCode) REFERENCES PostalCodeCountry(PostalCode) ON DELETE CASCADE
        )
    `);

        // Create Mailbox 
        await connection.execute(`
        CREATE TABLE Mailbox (
            MailboxID VARCHAR2(200) PRIMARY KEY,
            UnreadMail NUMBER
        )   
    `);

        // Create Personality 
        await connection.execute(`
        CREATE TABLE Personality (
            PersonalityID VARCHAR2(200) PRIMARY KEY,
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
            QuestionID VARCHAR2(200) PRIMARY KEY, 
            QuestionContent VARCHAR(2000)
      )
    `);

        // Create User
        await connection.execute(`
        CREATE TABLE Users (
            Email VARCHAR2(200) PRIMARY KEY,
            Name VARCHAR2(200),
            PersonalityID VARCHAR2(200),
            ProfileID VARCHAR2(200),
            MailBoxID VARCHAR2(200),
            FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE,
            FOREIGN KEY (PersonalityID) REFERENCES Personality(PersonalityID) ON DELETE CASCADE,
            FOREIGN KEY (MailBoxID) REFERENCES Mailbox(MailBoxID) ON DELETE CASCADE
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

        // Create UserAge table
        await connection.execute(`
            CREATE TABLE UserAge (
                Email VARCHAR2(200) PRIMARY KEY,
                Age NUMBER,
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create UserGender table
        await connection.execute(`
            CREATE TABLE UserGender (
                Email VARCHAR2(200) PRIMARY KEY,
                Gender VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create UserPostalCode table
        await connection.execute(`
            CREATE TABLE UserPostalCode (
                Email VARCHAR2(200) PRIMARY KEY,
                PostalCode VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create Mail table
        await connection.execute(`
            CREATE TABLE Mail (
                MailID CHAR(20) PRIMARY KEY,
                MailboxID VARCHAR2(200),
                Email VARCHAR2(255), 
                Message VARCHAR2(255),
                FOREIGN KEY (MailboxID) REFERENCES Mailbox(MailboxID)
            )
        `);

        // Create UserAnswer table
        await connection.execute(`
            CREATE TABLE UserAnswer (
	            AnswerID VARCHAR2(200) PRIMARY KEY, 
  	            QuestionID VARCHAR2(200),
	            AnswerValue NUMBER,
            	Email VARCHAR2(255),
	            FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE,
	            FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID) ON DELETE CASCADE 
            )
        `);

        // Create Matches table
        await connection.execute(`
            CREATE TABLE Matches (
	            User_Email_A VARCHAR2(255),
	            User_Email_B VARCHAR2(255),
	            MatchScore NUMBER,
        	    PRIMARY KEY (User_Email_A, User_Email_B),
        	    FOREIGN KEY (User_Email_A) REFERENCES Users(Email) ON DELETE CASCADE,
	            FOREIGN KEY (User_Email_B) REFERENCES Users(Email) ON DELETE CASCADE
            )
        `);

        // Create Pact
        await connection.execute(`
            CREATE TABLE Pact(
                User_A_Email VARCHAR2(200),
                User_B_Email VARCHAR2(200),
                Compatibility_Score NUMBER,
                User_A_Contract VARCHAR2(200),
                User_B_Contract VARCHAR2(200),
                FOREIGN KEY (User_A_Email) REFERENCES Users(Email),
                FOREIGN KEY (User_B_Email) REFERENCES Users(Email),
                FOREIGN KEY (User_A_Contract) REFERENCES UserAContract(User_A_Email),
                FOREIGN KEY (User_B_Contract) REFERENCES UserBContract(User_B_Email),
                PRIMARY KEY (User_A_Email, User_B_Email)
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

async function deleteUser(email) {
    return await withOracleDB(async (connection) => {

        const result = await connection.execute(`
            DELETE FROM Users
            WHERE Email = :email`,
            [email],
            { autoCommit: true }
        );

        await connection.execute(`
            DELETE FROM Profile
            WHERE ProfileID = :email`,
            [email],
            { autoCommit: true }
        );

        const PROFILE = await connection.execute(`
            Select *
            From Profile
            `
        );

        console.log(PROFILE.rows);

        if (result.rowsAffected === 0) {
            console.error(`No user found with email: ${email}`);
            return false;
        }

        return true;
    }).catch(() => {
        return false;
    });
}


async function getMatchHeteroMale(email) {

    return await withOracleDB(async (connection) => {
        try {

            const genderQuery = await connection.execute(`
                SELECT Gender
                FROM UserGender
                Where Email = :email
                `,
                [email],
            );

            if (genderQuery.rows === 0) {
                console.error(`email not found: ${email}`);
                return false;
            }

            const gender = genderQuery.rows[0][0];

            console.log(genderQuery.rows[0][0]);

            const sexualityQuery = await connection.execute(`
                SELECT Sexuality
                FROM Profile
                Where ProfileID = :email
                `,
                [email],
            );

            const sexuality = sexualityQuery.rows[0][0];

            let genderMatch = "";
            let sexualityMatch = "";

            console.log(gender + sexuality);

            switch (gender + sexuality) {
                case "MaleHetero":
                    genderMatch = "Female";
                    sexualityMatch = "Hetero";
                    break;
                case "MaleHomosexual":
                    genderMatch = "Male";
                    sexualityMatch = "Homosexual";
                    break;
                case "FemaleHetero":
                    genderMatch = "Male";
                    sexualityMatch = "Hetero";
                    break;
                case "FemaleHomo":
                    genderMatch = "Female";
                    sexualityMatch = "Homo";
                    break;
            }

            console.log(sexualityQuery.rows[0][0]);

            console.log("sexualityMatch: " + sexualityMatch);
            console.log("genderMatch: " + genderMatch);

            const result = await connection.execute(`
                WITH UserPersonality AS (
                SELECT PersonalityID, Introvertedness, Extrovertedness, Intuitive, Thinking, Prospecting, Turbulent
                FROM Personality
                WHERE PersonalityID = :email)

                SELECT per.PersonalityID, ug.Gender, pro.Name, pro.Sexuality, pro.DreamVacation, pro.FavouriteHobby, pro.FavouriteSport, pro.FavouriteMusicGenre,
                (1 - SQRT(
                POWER(per.Introvertedness - up.Introvertedness, 2) +
                POWER(per.Extrovertedness - up.Extrovertedness, 2) +
                POWER(per.Intuitive - up.Intuitive, 2) +
                POWER(per.Thinking - up.Thinking, 2) +
                POWER(per.Prospecting - up.Prospecting, 2) +
                POWER(per.Turbulent - up.Turbulent, 2))/ 24.49) * 100 AS PersonalitySimilarity

                FROM Personality per
                JOIN UserGender ug ON ug.Email = per.PersonalityID
                JOIN Profile pro ON pro.ProfileID = per.PersonalityID
                CROSS JOIN UserPersonality up
                WHERE per.PersonalityID <> :email AND ug.Gender = :genderMatch AND pro.Sexuality = :sexualityMatch

                ORDER BY PersonalitySimilarity DESC
                `,
                {
                    email: email,
                    genderMatch: genderMatch,
                    sexualityMatch: sexualityMatch
                }
            );

            console.log(result.rows);
            console.log(result.rows[0]);

            return result.rows;
        } catch (error) {
            console.error('Error updating profile:', error);
            console.error('Error stack:', error.stack);
            await connection.rollback();
            return false;
        }
    });
}

async function updateProfile(email, fieldToChange, value) {
    return await withOracleDB(async (connection) => {
        if (!['Name', 'Sexuality', 'DreamVacation', 'FavouriteHobby', 'FavouriteSport', 'FavouriteMusicGenre'].includes(fieldToChange)) {
            throw Error('Invalid field to update for profile');
        }
        try {
            console.log('Updating profile', { email, fieldToChange, value });
            const result = await connection.execute(
                `UPDATE Profile
        SET ${fieldToChange}=:value
        WHERE ProfileID=:email`,
                [value, email],
                { autoCommit: true }
            );

            if (result.rowsAffected === 0) {
                console.error(`No user found with email: ${email}`);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error updating profile:', error);
            console.error('Error stack:', error.stack);
            await connection.rollback();
            return false;
        }
    });
}

async function insertUser(email, name, gender, age, postalCode, nickname, sexuality, dreamVacation, favHobby, favSport, favMusicGenre, extravertedness, intuitive, feeling, judging, turbulence) {
    return await withOracleDB(async (connection) => {
        try {
            // Insert into Mailbox
            await connection.execute(
                `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
                [email, 0]
            );


            let city;
            const country = "Canada";

            if (postalCode === "V6T") {
                city = "Vancouver";
            } else if (postalCode === "V5A") {
                city = "Burnaby";
            } else {
                city = "Victoria";
            }

            try {
                await connection.execute(
                    `INSERT INTO PostalCodeCountry (PostalCode, Country) VALUES (:PostalCode, :Country)`,
                    [postalCode, country]
                );

                await connection.execute(
                    `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
                    [postalCode, city]
                );
            } catch (e) {
                if (e.errorNum === 1) {
                    console.log("Postal codes already inputted, skipping.");
                } else {
                    throw e;
                }
            }

            try {
                await connection.execute(
                    `INSERT INTO Question (QuestionID, QuestionContent) VALUES (:QuestionID, :QuestionContent)`,
                    { QuestionID: '1', QuestionContent: 'How likely are you to go to a social event after a long day of school?' },
                    { autoCommit: true }
                );

                // Intuitive and observant, where this answer determines intuition
                await connection.execute(
                    `INSERT INTO Question (QuestionID, QuestionContent) VALUES (:QuestionID, :QuestionContent)`,
                    { QuestionID: '2', QuestionContent: 'How often do you trust your gut when making decisions?' },
                    { autoCommit: true }
                );

                // Thinking and feeling, where this answer determines feeling
                await connection.execute(
                    `INSERT INTO Question (QuestionID, QuestionContent) VALUES (:QuestionID, :QuestionContent)`,
                    { QuestionID: '3', QuestionContent: 'How often do you prioritize your emotions and how others may feel when making decisions?' },
                    { autoCommit: true }
                );

                // Judging and prospecting, where this answer determines judging
                await connection.execute(
                    `INSERT INTO Question (QuestionID, QuestionContent) VALUES (:QuestionID, :QuestionContent)`,
                    { QuestionID: '4', QuestionContent: 'How often do you plan out your week?' },
                    { autoCommit: true }
                );

                // Turbulent and assertive where this answer determines turbulence
                await connection.execute(
                    `INSERT INTO Question (QuestionID, QuestionContent) VALUES (:QuestionID, :QuestionContent)`,
                    { QuestionID: '5', QuestionContent: 'How often do you feel stressed when things do not go according to plan?' },
                    { autoCommit: true }
                );
            } catch (e) {
                if (e.errorNum === 1) {
                    console.log("Questions already inputted, skipping.");
                } else {
                    throw e;
                }
            }

            // Insert into Personality
            await connection.execute(
                `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive) 
                 VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
                [
                    email,
                    10 - extravertedness,
                    extravertedness,
                    intuitive,
                    10 - intuitive,
                    10 - feeling,
                    feeling,
                    10 - judging,
                    judging,
                    turbulence,
                    10 - turbulence,
                ]
            );

            // Insert into Profile
            await connection.execute(
                `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre) 
                 VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
                [
                    email,
                    nickname,
                    sexuality,
                    dreamVacation,
                    favHobby,
                    favSport,
                    favMusicGenre,
                ]
            );

            // Insert into Users
            await connection.execute(
                `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID) 
                 VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
                [email, name, email, email, email]
            );

            await connection.execute(
                `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
                 VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
                [
                    email + "1",
                    '1',
                    extravertedness,
                    email
                ]
            );

            await connection.execute(
                `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
                 VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
                [
                    email + "2",
                    '2',
                    intuitive,
                    email
                ]
            );

            await connection.execute(
                `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
                 VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
                [
                    email + "3",
                    '3',
                    feeling,
                    email
                ]
            );

            await connection.execute(
                `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
                 VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
                [
                    email + "4",
                    '4',
                    judging,
                    email
                ]
            );

            await connection.execute(
                `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
                 VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
                [
                    email + "5",
                    '5',
                    turbulence,
                    email
                ]
            );

            // Insert into UserGender
            await connection.execute(
                `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
                [email, gender]
            );

            // Insert into UserPostalCode
            await connection.execute(
                `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
                [email, postalCode]
            );

            // Insert into UserAge
            await connection.execute(
                `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
                [email, age]
            );

            await connection.commit();
            return true;
        } catch (error) {
            console.error('Error inserting user:', error);
            await connection.rollback();
            return false;
        }
    });
}

async function insertTestData() {
    return await withOracleDB(async (connection) => {
        try {
            // Creating the questions
            await createQuestions(connection);

            // Insert PostalCode first because a User needs to have a postal code
            await insertPostalCodes(connection);

            await insertFegiclyn(connection);
            await insertTerence(connection);
            await insertFegico(connection);
            await insertJake(connection);
            await insertJaklyn(connection);
            await insertTerelyn(connection);

            // Can only assign postal codes once users have been created.
            await assignPostalCodes(connection);

            // Can only assign genders once users have been created.
            await assignGenders(connection);

            // Can only assign mail once users have been created.
            await assignMail(connection);

            // Can only assign age once users have been created
            await assignAge(connection);

            console.log('Test user inserted successfully.');
            return true;
        } catch (error) {
            console.error('Error inserting test user:', error);
            await connection.rollback();
            return false;
        }
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

async function projectUserData(arrayOfFields) {
    return await withOracleDB(async (connection) => {

        let select = "";

        for (const field of arrayOfFields) {
            switch (field) {
                case "Email":
                    select += 'u.Email, ';
                    break;
                case "Name":
                    select += 'u.Name, ';
                    break;
                case "Gender":
                    select += 'ug.Gender, ';
                    break;
                case "PostalCode":
                    select += 'upc.PostalCode, ';
                    break;
                case "Country":
                    select += 'pCountry.Country, ';
                    break;
                case "City":
                    select += 'pCity.City, ';
                    break;
                case "Age":
                    select += 'ua.Age, ';
                    break;
                case "Nickname":
                    select += 'p.Name, ';
                    break;
                case "Sexuality":
                    select += 'p.Sexuality, ';
                    break;
                case "DreamVacation":
                    select += 'p.DreamVacation, ';
                    break;
                case "FavouriteHobby":
                    select += 'p.FavouriteHobby, ';
                    break;
                case "FavouriteSport":
                    select += 'p.FavouriteSport, ';
                    break;
                case "FavouriteMusicGenre":
                    select += 'p.FavouriteMusicGenre, ';
                    break;
            }
        }

        // remove the last comma
        select = select.trim().slice(0, -1);

        const sqlQuery = `
            SELECT ${select}
            FROM Users u
            JOIN UserGender ug ON u.Email = ug.Email
            JOIN UserPostalCode upc ON u.Email = upc.Email
            LEFT JOIN PostalCodeCountry pCountry ON pCountry.PostalCode = upc.PostalCode
            LEFT JOIN PostalCodeCity pCity ON pCity.PostalCode = upc.PostalCode
            JOIN UserAge ua ON u.Email = ua.Email
            JOIN Profile p ON u.ProfileID = p.ProfileID`

        console.log(sqlQuery);

        const result = await connection.execute(sqlQuery);

        return result.rows;
    }).catch(() => {
        return false;
    });
}

// query form 
// Valid fields email, name, age,
// Valid query form: Email=jake@gmail.com+OR+Email=joe@gmail.com+AND+Age=12
async function selectUser(query) {
    return await withOracleDB(async (connection) => {
        console.log("hi");
        console.log(query);

        const splitQuery = query.trim().split("+");

        let sqlQuery = `
            SELECT u.Email, u.Name, ug.Gender, ua.Age, p.Name, p.Sexuality, p.DreamVacation, p.FavouriteHobby, p.FavouriteSport, p.FavouriteMusicGenre
            FROM Users u
            JOIN UserGender ug ON u.Email = ug.Email
            JOIN UserAge ua ON u.Email = ua.Email
            JOIN Profile p ON  u.ProfileID = p.ProfileID
            WHERE
    `;

        for (const str of splitQuery) {
            if (str.includes("=")) {

                const splitStr = str.split("=");
                const field = splitStr[0];
                const value = splitStr[1];

                switch (field.toLowerCase()) {
                    case "email":
                        sqlQuery += ` u.Email='${value}'`
                        break;
                    case "name":
                        sqlQuery += ` u.Name='${value}'`
                        break;
                    case "age":
                        sqlQuery += ` ua.Age=${value}` // no quotations ` ` because it's a numeric field
                        break;
                    default:
                        console.error("Invalid field entered into selection");
                        return false;
                }
            } else {
                switch (str.toLowerCase()) {
                    case "or":
                        sqlQuery += ` OR`
                        break;
                    case "and":
                        sqlQuery += ` AND`
                        break;
                    default:
                        console.error("Invalid operator entered into selection");
                        return false;
                }
            }
        }

        console.log(sqlQuery);

        const result = await connection.execute(sqlQuery).catch(() => {
            return false;
        });
        return result.rows;
    }).catch(() => {
        return [];
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

async function countHomosexualUsers() {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `SELECT Sexuality, COUNT(*) AS HomosexualCount
                 FROM Profile
                 WHERE Sexuality = :sexuality 
                 GROUP BY Sexuality`,
                ['Homosexual']
            );

            console.log("Full Query Result:", result);

            return result.rows[0][1];
        });
    } catch (error) {
        console.error("Detailed error counting homosexual users:", error);
        throw error;
    }
}

async function countHeterosexualUsers() {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `SELECT Sexuality, COUNT(*) AS HeterosexualCount
                 FROM Profile
                 WHERE Sexuality = :sexuality 
                 GROUP BY Sexuality`,
                ['Hetero']
            );

            console.log("Full Query Result:", result);


            return result.rows[0][1];
        });
    } catch (error) {
        console.error("Detailed error counting heterosexual users:", error);
        throw error;
    }
}


async function joinAndGetUserAnswers(email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT q.QuestionContent, ua.AnswerValue, p.Introvertedness, p.Extrovertedness, p.Intuitive, p.Observant, p.Thinking, p.Feeling, p.Prospecting, p.Judging, p.Turbulent, p.Assertive
            FROM Personality p
            JOIN UserAnswer ua ON ua.Email = p.PersonalityID
            JOIN Question q ON q.QuestionID = ua.QuestionID
            WHERE ua.Email=:email`,
            [email]);

        if (result.rows.length === 0) {
            return false;
        }

        return result.rows;
    }).catch(() => {
        return false;
    });
}

async function countUsersByPostalCode(postalCode) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT upc.PostalCode, COUNT(*) as UserCount
             FROM UserPostalCode upc
             GROUP BY upc.PostalCode
             HAVING upc.PostalCode = :postalCode`,
            [postalCode]
        );

        return result.rows[0] ? result.rows[0][1] : 0;
    }).catch((err) => {
        console.error(err);
        return null;
    });
}

// input is a string
async function findOlderUsers(input) {
    try {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `SELECT u.Email, u.Name, upc.PostalCode
                FROM Users u 
                JOIN UserPostalCode upc ON u.Email = upc.Email
                JOIN Users u ON u.Email = upc.Email
                WHERE upc.PostalCode IN (
                    SELECT upc2.PostalCode
                    FROM UserPostalCode upc2
                    JOIN Users u2 ON upc2.Email = u2.Email
                    GROUP BY upc2.PostalCode
                    HAVING COUNT(u2.Email) >= :input
                    )
                    `,
                [input]
            );


            //console.log("Full Query Result:", result.rows);

            return result.rows;
        });
    } catch (error) {
        console.error("Detailed error counting users:", error);
        throw error;
    }
}



async function findExtrovertedPostalCodes() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT DISTINCT pc.PostalCode, pc.City
            FROM PostalCodeCity pc
            WHERE NOT EXISTS (
                (SELECT up.Email 
                FROM UserPostalCode up 
                WHERE up.PostalCode = pc.PostalCode)
                MINUS
                (SELECT p.PersonalityID 
                FROM Personality p
                WHERE p.Extrovertedness > 5)
            )`);
        return result.rows;
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    fetchUsersTableFromDb,
    initiateDemotable,
    insertDemotable,
    updateNameDemotable,
    countDemotable,
    insertTestData,
    insertUser,
    updateProfile,
    deleteUser,
    selectUser,
    countHomosexualUsers,
    countHeterosexualUsers,
    projectUserData,
    countUsersByPostalCode,
    joinAndGetUserAnswers,
    findExtrovertedPostalCodes,
    findOlderUsers,
    joinAndGetUserAnswers,
    getMatchHeteroMale
};