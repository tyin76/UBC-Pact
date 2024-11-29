async function createQuestions(connection) {

    // Introvertedness and extravertedness where this answer determines extravertedness
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
}

async function insertPostalCodes(connection) {
    await connection.execute(
        `INSERT INTO PostalCodeCountry (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: 'V6T', Country: 'Canada' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCountry (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: 'V5A', Country: 'Canada' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCountry (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: 'V8W', Country: 'Canada' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: 'V6T', City: 'Vancouver' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: 'V5A', City: 'Burnaby' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: 'V8W', City: 'Victoria' },
        { autoCommit: true }
    );
}

async function assignAge(connection) {

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'terence@gmail.com', Age: '20' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'jake@gmail.com', Age: '20' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'fegico@gmail.com', Age: '20' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'jaklyn@gmail.com', Age: '23' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'terelyn@gmail.com', Age: '24' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserAge (Email, Age) VALUES (:Email, :Age)`,
        { Email: 'fegiclyn@gmail.com', Age: '25' },
        { autoCommit: true }
    );
}

async function assignPostalCodes(connection) {

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'terence@gmail.com', PostalCode: 'V5A' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jake@gmail.com', PostalCode: 'V8W' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegico@gmail.com', PostalCode: 'V6T' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jaklyn@gmail.com', PostalCode: 'V6T' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'terelyn@gmail.com', PostalCode: 'V5A' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegiclyn@gmail.com', PostalCode: 'V8W' },
        { autoCommit: true }
    );
}

async function assignMail(connection) {
    // Reminder that the email is the email of the person who sent the message!

    // Mail for Fegiclyn
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "1",
            MailboxID: "fegico@gmail.com",
            Email: "fegico@gmail.com",
            Message: "Hi, you are basically my twin.",
        },
        { autoCommit: true }
    );

    // Mail for Terence 
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "2",
            MailboxID: "fegico@gmail.com",
            Email: "fegico@gmail.com",
            Message: "Hi, I love you.",
        },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "3",
            MailboxID: "fegico@gmail.com",
            Email: "fegico@gmail.com",
            Message: "Hello? Please respond did u see my last message?",
        },
        { autoCommit: true }
    );

    // Mail for Fegico 
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "4",
            MailboxID: "terence@gmail.com",
            Email: "terence@gmail.com",
            Message: "Hi, hope on league.",
        },
        { autoCommit: true }
    );

    // Mail for Jake 
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "5",
            MailboxID: "terence@gmail.com",
            Email: "terence@gmail.com",
            Message: "Hi, are u goin to class.",
        },
        { autoCommit: true }
    );

    // Mail for Jaklyn 
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "6",
            MailboxID: "terence@gmail.com",
            Email: "terence@gmail.com",
            Message: "Hi, wanna sign a contract",
        },
        { autoCommit: true }
    );

    // Mail for Terelyn
    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "7",
            MailboxID: "terence@gmail.com",
            Email: "terence@gmail.com",
            Message: "Hi, u are my leageu twin",
        },
        { autoCommit: true }
    );

}

async function assignGenders(connection) {

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'terence@gmail.com', Gender: 'Male' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'jake@gmail.com', Gender: 'Male' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'fegico@gmail.com', Gender: 'Male' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'jaklyn@gmail.com', Gender: 'Female' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'terelyn@gmail.com', Gender: 'Female' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'fegiclyn@gmail.com', Gender: 'Female' },
        { autoCommit: true }
    );
}

async function insertFegiclyn(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
                    VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'fegiclyn@gmail.com',
            Name: 'Feg Feg',
            Sexuality: 'Hetero',
            DreamVacation: 'I would love to go to vancouver.',
            FavouriteHobby: 'I love playing tennis',
            FavouriteSport: 'I love tennis',
            FavouriteMusicGenre: 'I love jazz',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
                    VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'fegiclyn@gmail.com',
            Introvertedness: 5,
            Extrovertedness: 5,
            Intuitive: 7,
            Observant: 3,
            Thinking: 8,
            Feeling: 2,
            Prospecting: 4,
            Judging: 6,
            Turbulent: 3,
            Assertive: 7,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'fegiclyn@gmail.com', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
                    VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'fegiclyn@gmail.com',
            Name: 'Fegiclyn',
            PersonalityID: 'fegiclyn@gmail.com',
            ProfileID: 'fegiclyn@gmail.com',
            MailBoxID: 'fegiclyn@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegiclyn@gmail.com1",
            '1',
            5,
            'fegiclyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegiclyn@gmail.com2",
            '2',
            7,
            'fegiclyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegiclyn@gmail.com3",
            '3',
            2,
            'fegiclyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegiclyn@gmail.com4",
            '4',
            6,
            'fegiclyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegiclyn@gmail.com5",
            '5',
            3,
            'fegiclyn@gmail.com'
        ]
    );



}

async function insertTerence(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'terence@gmail.com',
            Name: 'Terbear',
            Sexuality: 'Homosexual',
            DreamVacation: 'Middle east',
            FavouriteHobby: 'I love league',
            FavouriteSport: 'F1',
            FavouriteMusicGenre: 'I love legends never die',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'terence@gmail.com',
            Introvertedness: 5,
            Extrovertedness: 5,
            Intuitive: 8,
            Observant: 2,
            Thinking: 1,
            Feeling: 9,
            Prospecting: 0,
            Judging: 10,
            Turbulent: 10,
            Assertive: 0,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'terence@gmail.com', UnreadMail: 2 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'terence@gmail.com',
            Name: 'Terence',
            PersonalityID: 'terence@gmail.com',
            ProfileID: 'terence@gmail.com',
            MailBoxID: 'terence@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terence@gmail.com1",
            '1',
            5,
            'terence@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terence@gmail.com2",
            '2',
            8,
            'terence@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terence@gmail.com3",
            '3',
            9,
            'terence@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terence@gmail.com4",
            '4',
            10,
            'terence@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terence@gmail.com5",
            '5',
            10,
            'terence@gmail.com'
        ]
    );
}


async function insertFegico(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'fegico@gmail.com',
            Name: 'Faster',
            Sexuality: 'Hetero',
            DreamVacation: 'North Korea',
            FavouriteHobby: 'I love guitar',
            FavouriteSport: 'Muscle ups',
            FavouriteMusicGenre: 'R&B',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'fegico@gmail.com',
            Introvertedness: 2,
            Extrovertedness: 7,
            Intuitive: 9,
            Observant: 1,
            Thinking: 2,
            Feeling: 8,
            Prospecting: 0,
            Judging: 10,
            Turbulent: 6,
            Assertive: 4,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'fegico@gmail.com', UnreadMail: 1 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'fegico@gmail.com',
            Name: 'Fegico',
            PersonalityID: 'fegico@gmail.com',
            ProfileID: 'fegico@gmail.com',
            MailBoxID: 'fegico@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegico@gmail.com1",
            '1',
            7,
            'fegico@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegico@gmail.com2",
            '2',
            9,
            'fegico@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegico@gmail.com3",
            '3',
            8,
            'fegico@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegico@gmail.com4",
            '4',
            10,
            'fegico@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "fegico@gmail.com5",
            '5',
            6,
            'fegico@gmail.com'
        ]
    );
}

async function insertJake(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'jake@gmail.com',
            Name: 'Ja Ja',
            Sexuality: 'Hetero',
            DreamVacation: 'Hawaii',
            FavouriteHobby: 'sleep',
            FavouriteSport: 'Watching shorts',
            FavouriteMusicGenre: 'I love flawed mangoes',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'jake@gmail.com',
            Introvertedness: 2,
            Extrovertedness: 8,
            Intuitive: 8,
            Observant: 2,
            Thinking: 5,
            Feeling: 5,
            Prospecting: 3,
            Judging: 7,
            Turbulent: 9,
            Assertive: 1,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'jake@gmail.com', UnreadMail: 1 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'jake@gmail.com',
            Name: 'Jake',
            PersonalityID: 'jake@gmail.com',
            ProfileID: 'jake@gmail.com',
            MailBoxID: 'jake@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jake@gmail.com1",
            '1',
            8,
            'jake@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jake@gmail.com2",
            '2',
            8,
            'jake@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jake@gmail.com3",
            '3',
            5,
            'jake@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jake@gmail.com4",
            '4',
            7,
            'jake@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jake@gmail.com5",
            '5',
            9,
            'jake@gmail.com'
        ]
    );
}

async function insertJaklyn(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'jaklyn@gmail.com',
            Name: 'Jyln',
            Sexuality: 'Hetero',
            DreamVacation: 'Italy',
            FavouriteHobby: 'Dance',
            FavouriteSport: 'gymnastics',
            FavouriteMusicGenre: 'classical',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'jaklyn@gmail.com',
            Introvertedness: 1,
            Extrovertedness: 9,
            Intuitive: 1,
            Observant: 9,
            Thinking: 1,
            Feeling: 9,
            Prospecting: 1,
            Judging: 9,
            Turbulent: 1,
            Assertive: 9,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'jaklyn@gmail.com', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'jaklyn@gmail.com',
            Name: 'Jaklyn',
            PersonalityID: 'jaklyn@gmail.com',
            ProfileID: 'jaklyn@gmail.com',
            MailBoxID: 'jaklyn@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jaklyn@gmail.com1",
            '1',
            9,
            'jaklyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jaklyn@gmail.com2",
            '2',
            1,
            'jaklyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jaklyn@gmail.com3",
            '3',
            9,
            'jaklyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jaklyn@gmail.com4",
            '4',
            9,
            'jaklyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "jaklyn@gmail.com5",
            '5',
            1,
            'jaklyn@gmail.com'
        ]
    );

}

async function insertTerelyn(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: 'terelyn@gmail.com',
            Name: 'Tylin',
            Sexuality: 'Hetero',
            DreamVacation: 'Greece',
            FavouriteHobby: 'Legos',
            FavouriteSport: 'Running',
            FavouriteMusicGenre: 'Rock',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: 'terelyn@gmail.com',
            Introvertedness: 2,
            Extrovertedness: 8,
            Intuitive: 2,
            Observant: 8,
            Thinking: 0,
            Feeling: 10,
            Prospecting: 4,
            Judging: 6,
            Turbulent: 3,
            Assertive: 7,
        },
        { autoCommit: false }
    );

    // Insert Mailbox first because a User needs to have a Mailbox code
    await connection.execute(
        `INSERT INTO Mailbox (MailboxID, UnreadMail) VALUES (:MailboxID, :UnreadMail)`,
        { MailboxID: 'terelyn@gmail.com', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'terelyn@gmail.com',
            Name: 'Terelyn',
            PersonalityID: 'terelyn@gmail.com',
            ProfileID: 'terelyn@gmail.com',
            MailBoxID: 'terelyn@gmail.com'
        },
        { autoCommit: true }
    );

    // Insert the user answer stuff
    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terelyn@gmail.com1",
            '1',
            8,
            'terelyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terelyn@gmail.com2",
            '2',
            2,
            'terelyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terelyn@gmail.com3",
            '3',
            10,
            'terelyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terelyn@gmail.com4",
            '4',
            6,
            'terelyn@gmail.com'
        ]
    );

    await connection.execute(
        `INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email) 
             VALUES (:AnswerID, :QuestionID, :AnswerValue, :Email)`,
        [
            "terelyn@gmail.com5",
            '5',
            3,
            'terelyn@gmail.com'
        ]
    );
}

module.exports = {
    insertFegiclyn,
    insertTerence,
    insertFegico,
    insertJake,
    insertJaklyn,
    insertTerelyn,
    insertPostalCodes,
    assignPostalCodes,
    assignGenders,
    assignMail,
    createQuestions,
    assignAge
};