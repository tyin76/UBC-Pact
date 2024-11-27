async function insertPostalCodes(connection) {
    await connection.execute(
        `INSERT INTO PostalCode (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: '1', Country: 'Canada' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO PostalCode (PostalCode, Country) VALUES (:PostalCode, :Country)`,
        { PostalCode: '2', Country: 'USA' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: '1', City: 'Vancouver' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO PostalCodeCity (PostalCode, City) VALUES (:PostalCode, :City)`,
        { PostalCode: '2', City: 'Texas' },
        { autoCommit: false }
    );
}

async function assignPostalCodes(connection) {

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'terence@gmail.com', PostalCode: '1' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jake@gmail.com', PostalCode: '1' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegico@gmail.com', PostalCode: '2' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'jaklyn@gmail.com', PostalCode: '1' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'terelyn@gmail.com', PostalCode: '1' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserPostalCode (Email, PostalCode) VALUES (:Email, :PostalCode)`,
        { Email: 'fegiclyn@gmail.com', PostalCode: '2' },
        { autoCommit: false }
    );
}

async function assignGenders(connection) {

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'terence@gmail.com', Gender: 'Male' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'jake@gmail.com', Gender: 'Male' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'fegico@gmail.com', Gender: 'Male' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'jaklyn@gmail.com', Gender: 'Female' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'terelyn@gmail.com', Gender: 'Female' },
        { autoCommit: false }
    );

    await connection.execute(
        `INSERT INTO UserGender (Email, Gender) VALUES (:Email, :Gender)`,
        { Email: 'fegiclyn@gmail.com', Gender: 'Female' },
        { autoCommit: false }
    );
}

async function insertFegiclyn(connection) {
    
                // Insert Profile first because a User needs to have a profile code
                await connection.execute(
                    `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
                    VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
                    {
                        ProfileID: '1',
                        Name: 'Feg Feg',
                        Age: 25,
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
        `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '2',
            Name: 'Ter Bear',
            Age: 20,
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
        { MailboxID: '2', UnreadMail: 123 },
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
        `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '3',
            Name: 'Fegico',
            Age: 20,
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
        { MailboxID: '3', UnreadMail: 23 },
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
        `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '4',
            Name: 'Ja Ja',
            Age: 20,
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
        { MailboxID: '4', UnreadMail: 13 },
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
        `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '5',
            Name: 'Jyln',
            Age: 23,
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
        { MailboxID: '5', UnreadMail: 13 },
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
        `INSERT INTO Profile (ProfileID, Name, Age, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
        VALUES (:ProfileID, :Name, :Age, :Sexuality, :DreamVacation, :FavouriteHobby, :FavouriteSport, :FavouriteMusicGenre)`,
        {
            ProfileID: '6',
            Name: 'Tylin',
            Age: 24,
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
        { MailboxID: '6', UnreadMail: 4 },
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
    assignGenders
};