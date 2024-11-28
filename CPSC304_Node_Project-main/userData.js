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
        { QuestionID: '4', QuestionContent: 'How often do plan out your week?' },
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
        { PostalCode: '1', Country: 'Canada' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCountry (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: '2', Country: 'USA' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: '1', City: 'Vancouver' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: '2', City: 'Texas' },
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
        { Email: 'terence@gmail.com', PostalCode: '1' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jake@gmail.com', PostalCode: '1' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegico@gmail.com', PostalCode: '2' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jaklyn@gmail.com', PostalCode: '1' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'terelyn@gmail.com', PostalCode: '1' },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegiclyn@gmail.com', PostalCode: '2' },
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
            MailboxID: "1",
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
            MailboxID: "2",
            Email: "fegico@gmail.com",
            Message: "Hi, I love you.",
        },
        { autoCommit: true }
    );

    await connection.execute(
        `INSERT INTO Mail (MailID, MailboxID, Email, Message) VALUES (:MailID, :MailboxID, :Email, :Message)`,
        {
            MailID: "3",
            MailboxID: "2",
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
            MailboxID: "3",
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
            MailboxID: "4",
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
            MailboxID: "5",
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
            MailboxID: "6",
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
            ProfileID: '1',
            Name: 'Feg Feg',
            Sexuality: 'Straight',
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
            PersonalityID: '1',
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
        { MailboxID: '1', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
                    VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'fegiclyn@gmail.com',
            Name: 'Fegiclyn',
            PersonalityID: '1',
            ProfileID: '1',
            MailBoxID: '1'
        },
        { autoCommit: true }
    );
}

async function insertTerence(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '2',
            Name: 'Terbear',
            Sexuality: 'Gay',
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
            PersonalityID: '2',
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
        { MailboxID: '2', UnreadMail: 2 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'terence@gmail.com',
            Name: 'Terence',
            PersonalityID: '2',
            ProfileID: '2',
            MailBoxID: '2'
        },
        { autoCommit: true }
    );
}


async function insertFegico(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '3',
            Name: 'Fegico',
            Sexuality: 'Straight',
            DreamVacation: 'Taiwan',
            FavouriteHobby: 'I love guitar',
            FavouriteSport: 'Pull ups',
            FavouriteMusicGenre: 'I love jazz',
        },
        { autoCommit: false }
    );

    // Insert Personality first because a User needs to have a personality
    await connection.execute(
        `INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
        VALUES (:PersonalityID, :Introvertedness, :Extrovertedness, :Intuitive, :Observant, :Thinking, :Feeling, :Prospecting, :Judging, :Turbulent, :Assertive)`,
        {
            PersonalityID: '3',
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
        { MailboxID: '3', UnreadMail: 1 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'fegico@gmail.com',
            Name: 'Fegico',
            PersonalityID: '3',
            ProfileID: '3',
            MailBoxID: '3'
        },
        { autoCommit: true }
    );
}

async function insertJake(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '4',
            Name: 'Ja Ja',
            Sexuality: 'Straight',
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
            PersonalityID: '4',
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
        { MailboxID: '4', UnreadMail: 1 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'jake@gmail.com',
            Name: 'Jake',
            PersonalityID: '4',
            ProfileID: '4',
            MailBoxID: '4'
        },
        { autoCommit: true }
    );
}

async function insertJaklyn(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '5',
            Name: 'Jyln',
            Sexuality: 'Straight',
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
            PersonalityID: '5',
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
        { MailboxID: '5', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'jaklyn@gmail.com',
            Name: 'Jaklyn',
            PersonalityID: '5',
            ProfileID: '5',
            MailBoxID: '5'
        },
        { autoCommit: true }
    );
}

async function insertTerelyn(connection) {

    // Insert Profile first because a User needs to have a profile code
    await connection.execute(
        `INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '6',
            Name: 'Tylin',
            Sexuality: 'Straight',
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
            PersonalityID: '6',
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
        { MailboxID: '6', UnreadMail: 0 },
        { autoCommit: false }
    );

    // Insert into Users
    await connection.execute(
        `INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
        VALUES (:Email, :Name, :PersonalityID, :ProfileID, :MailBoxID)`,
        {
            Email: 'terelyn@gmail.com',
            Name: 'Terelyn',
            PersonalityID: '6',
            ProfileID: '6',
            MailBoxID: '6'
        },
        { autoCommit: true }
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