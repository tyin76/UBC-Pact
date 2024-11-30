
-- DROP TABLE statements to allow the script to run multiple times
    DROP TABLE UserAnswer;
    DROP TABLE Mail;
    DROP TABLE UserPostalCode;
    DROP TABLE UserGender;
    DROP TABLE UserAge;
    DROP TABLE UserBContract;
    DROP TABLE UserAContract;
    DROP TABLE Users;
    DROP TABLE Question;
    DROP TABLE Personality;
    DROP TABLE Mailbox;
    DROP TABLE PostalCodeCity;
    DROP TABLE PostalCodeCountry;
    DROP TABLE Profile;


-- Create POSTALCODE
CREATE TABLE PostalCodeCountry (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            Country VARCHAR2(20)
        );


-- Create PROFILE
CREATE TABLE Profile (
            ProfileID VARCHAR2(200) PRIMARY KEY,
            Name VARCHAR2(50),
            Sexuality VARCHAR2(10),
            DreamVacation VARCHAR2(50),
            FavouriteHobby VARCHAR2(50),
            FavouriteSport VARCHAR2(50),
            FavouriteMusicGenre VARCHAR2(50)
        );

-- Create PostalCodeCity 
CREATE TABLE PostalCodeCity (
            PostalCode VARCHAR2(20) PRIMARY KEY,
            City VARCHAR2(50),
            FOREIGN KEY (PostalCode) REFERENCES PostalCodeCountry(PostalCode) ON DELETE CASCADE
        );



-- Create Mailbox 
CREATE TABLE Mailbox (
            MailboxID VARCHAR2(200) PRIMARY KEY,
            UnreadMail NUMBER
        );



-- Create Personality 
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
        );

-- Create Question
CREATE TABLE Question (
            QuestionID VARCHAR2(200) PRIMARY KEY, 
            QuestionContent VARCHAR(2000)
      );

-- Create Users
CREATE TABLE Users (
            Email VARCHAR2(200) PRIMARY KEY,
            Name VARCHAR2(200),
            PersonalityID VARCHAR2(200),
            ProfileID VARCHAR2(200),
            MailBoxID VARCHAR2(200),
            FOREIGN KEY (ProfileID) REFERENCES Profile(ProfileID) ON DELETE CASCADE,
            FOREIGN KEY (PersonalityID) REFERENCES Personality(PersonalityID) ON DELETE CASCADE,
            FOREIGN KEY (MailBoxID) REFERENCES Mailbox(MailBoxID) ON DELETE CASCADE
            );

-- Create UserAContract
CREATE TABLE UserAContract(
                User_A_Email VARCHAR2(200) PRIMARY KEY,
                Contract VARCHAR2(255),
                FOREIGN KEY (User_A_Email) REFERENCES Users(Email)
            );

-- Create UserBContract
CREATE TABLE UserBContract(
                User_B_Email VARCHAR2(200) PRIMARY KEY,
                Contract VARCHAR2(255),
                FOREIGN KEY (User_B_Email) REFERENCES Users(Email)
            );

-- Create UserAge
CREATE TABLE UserAge (
                Email VARCHAR2(200) PRIMARY KEY,
                Age NUMBER,
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            );

-- Create UserGender
CREATE TABLE UserGender (
                Email VARCHAR2(200) PRIMARY KEY,
                Gender VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            );

-- Create UserPostalCode
CREATE TABLE UserPostalCode (
                Email VARCHAR2(200) PRIMARY KEY,
                PostalCode VARCHAR2(20),
                FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE
            );
-- Create Mail
CREATE TABLE Mail (
                MailID CHAR(20) PRIMARY KEY,
                MailboxID VARCHAR2(200),
                Email VARCHAR2(255), 
                Message VARCHAR2(255),
                FOREIGN KEY (MailboxID) REFERENCES Mailbox(MailboxID)
            );

-- Create UserAnswer
CREATE TABLE UserAnswer (
	            AnswerID VARCHAR2(200) PRIMARY KEY, 
  	            QuestionID VARCHAR2(200),
	            AnswerValue NUMBER,
            	Email VARCHAR2(255),
	            FOREIGN KEY (Email) REFERENCES Users(Email) ON DELETE CASCADE,
	            FOREIGN KEY (QuestionID) REFERENCES Question(QuestionID) ON DELETE CASCADE 
            );

-- IASHDIHAOSHDOHASHDIOAHSODHSAOIHDOIAHSOIDHOHASIDSOHADs --

-- Insert createQuestions
INSERT INTO Question (QuestionID, QuestionContent) 
VALUES ('1', 'How likely are you to go to a social event after a long day of school?')

INSERT INTO Question (QuestionID, QuestionContent) 
VALUES ('2', 'How often do you trust your gut when making decisions?')

INSERT INTO Question (QuestionID, QuestionContent) 
VALUES ('3', 'How often do you prioritize your emotions and how others may feel when making decisions?')

INSERT INTO Question (QuestionID, QuestionContent) 
VALUES ('4', 'How often do you plan out your week?')

INSERT INTO Question (QuestionID, QuestionContent) 
VALUES ('5', 'How often do you feel stressed when things do not go according to plan?')

-- Insert into PostalCodeCountry table

INSERT INTO PostalCodeCountry (PostalCode, Country) 
VALUES ('V6T', 'Canada')

INSERT INTO PostalCodeCountry (PostalCode, Country) 
VALUES ('V5A', 'Canada')

INSERT INTO PostalCodeCountry (PostalCode, Country) 
VALUES ('V8W', 'Canada')

-- Insert into PostalCodeCity table

INSERT INTO PostalCodeCity (PostalCode, City) 
VALUES ('V6T', 'Vancouver')

INSERT INTO PostalCodeCity (PostalCode, City) 
VALUES ('V5A', 'Burnaby')

INSERT INTO PostalCodeCity (PostalCode, City) 
VALUES ('V8W', 'Victoria')

-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('fegiclyn@gmail.com', 'Feg Feg', 'Hetero', 'I would love to go to vancouver.', 'I love playing tennis', 'I love tennis', 'I love jazz')

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('fegiclyn@gmail.com', 5, 5, 7, 3, 8, 2, 4, 6, 3, 7);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('fegiclyn@gmail.com', 0)

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('fegiclyn@gmail.com', 'fegiclyn', 'fegiclyn@gmail.com', 'fegiclyn@gmail.com', 'fegiclyn@gmail.com')

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegiclyn@gmail.com1', '1', 5, 'fegiclyn@gmail.com')

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegiclyn@gmail.com2', '2', 7, 'fegiclyn@gmail.com')

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegiclyn@gmail.com3', '3', 2, 'fegiclyn@gmail.com')

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegiclyn@gmail.com4', '4', 6, 'fegiclyn@gmail.com')

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegiclyn@gmail.com5', '5', 3, 'fegiclyn@gmail.com')

-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('terence@gmail.com', 'Terbear', 'Homosexual', 'Middle east', 'I love league', 'F1', 'I love legends never die');

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('terence@gmail.com', 1, 9, 8, 2, 1, 9, 0, 10, 10, 0);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('terence@gmail.com', 2);

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('terence@gmail.com', 'terence', 'terence@gmail.com', 'terence@gmail.com', 'terence@gmail.com');

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terence@gmail.com1', '1', 9, 'terence@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terence@gmail.com2', '2', 8, 'terence@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terence@gmail.com3', '3', 9, 'terence@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terence@gmail.com4', '4', 10, 'terence@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terence@gmail.com5', '5', 10, 'terence@gmail.com');

-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('fegico@gmail.com', 'Faster', 'Hetero', 'North Korea', 'I love guitar', 'Muscle ups', 'R&B');

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('fegico@gmail.com', 2, 8, 9, 1, 2, 8, 0, 10, 6, 4);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('fegico@gmail.com', 1);

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('fegico@gmail.com', 'fegico', 'fegico@gmail.com', 'fegico@gmail.com', 'fegico@gmail.com');

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegico@gmail.com1', '1', 8, 'fegico@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegico@gmail.com2', '2', 9, 'fegico@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegico@gmail.com3', '3', 8, 'fegico@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegico@gmail.com4', '4', 10, 'fegico@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('fegico@gmail.com5', '5', 6, 'fegico@gmail.com');

-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('jake@gmail.com', 'Ja Ja', 'Hetero', 'Hawaii', 'sleep', 'Watching shorts', 'I love flawed mangoes');

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('jake@gmail.com', 2, 8, 8, 2, 5, 5, 3, 7, 9, 1);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('jake@gmail.com', 1);

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('jake@gmail.com', 'jake', 'jake@gmail.com', 'jake@gmail.com', 'jake@gmail.com');

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jake@gmail.com1', '1', 8, 'jake@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jake@gmail.com2', '2', 8, 'jake@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jake@gmail.com3', '3', 5, 'jake@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jake@gmail.com4', '4', 7, 'jake@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jake@gmail.com5', '5', 9, 'jake@gmail.com');

-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('jaklyn@gmail.com', 'Jyln', 'Hetero', 'Italy', 'Dance', 'gymnastics', 'classical');

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('jaklyn@gmail.com', 1, 9, 1, 9, 1, 9, 1, 9, 1, 9);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('jaklyn@gmail.com', 0);

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('jaklyn@gmail.com', 'jaklyn', 'jaklyn@gmail.com', 'jaklyn@gmail.com', 'jaklyn@gmail.com');

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jaklyn@gmail.com1', '1', 9, 'jaklyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jaklyn@gmail.com2', '2', 1, 'jaklyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jaklyn@gmail.com3', '3', 9, 'jaklyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jaklyn@gmail.com4', '4', 9, 'jaklyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('jaklyn@gmail.com5', '5', 1, 'jaklyn@gmail.com');


-- Insert into Profile table
INSERT INTO Profile (ProfileID, Name, Sexuality, DreamVacation, FavouriteHobby, FavouriteSport, FavouriteMusicGenre)
VALUES ('terelyn@gmail.com', 'Tylin', 'Hetero', 'Greece', 'Legos', 'Running', 'Rock');

-- Insert into Personality table
INSERT INTO Personality (PersonalityID, Introvertedness, Extrovertedness, Intuitive, Observant, Thinking, Feeling, Prospecting, Judging, Turbulent, Assertive)
VALUES ('terelyn@gmail.com', 2, 8, 2, 8, 0, 10, 4, 6, 3, 7);

-- Insert into Mailbox table
INSERT INTO Mailbox (MailboxID, UnreadMail)
VALUES ('terelyn@gmail.com', 0);

-- Insert into Users table
INSERT INTO Users (Email, Name, PersonalityID, ProfileID, MailBoxID)
VALUES ('terelyn@gmail.com', 'terelyn', 'terelyn@gmail.com', 'terelyn@gmail.com', 'terelyn@gmail.com');

-- Insert into UserAnswer table
INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terelyn@gmail.com1', '1', 8, 'terelyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terelyn@gmail.com2', '2', 2, 'terelyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terelyn@gmail.com3', '3', 10, 'terelyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terelyn@gmail.com4', '4', 6, 'terelyn@gmail.com');

INSERT INTO UserAnswer (AnswerID, QuestionID, AnswerValue, Email)
VALUES ('terelyn@gmail.com5', '5', 3, 'terelyn@gmail.com');


-- Insert into UserPostalCode table
INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('terence@gmail.com', 'V5A');

INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('jake@gmail.com', 'V8W');

INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('fegico@gmail.com', 'V6T');

INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('jaklyn@gmail.com', 'V6T');

INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('terelyn@gmail.com', 'V5A');

INSERT INTO UserPostalCode (Email, PostalCode)
VALUES ('fegiclyn@gmail.com', 'V8W');


-- Insert into UserGender table
INSERT INTO UserGender (Email, Gender)
VALUES ('terence@gmail.com', 'Male');

INSERT INTO UserGender (Email, Gender)
VALUES ('jake@gmail.com', 'Male');

INSERT INTO UserGender (Email, Gender)
VALUES ('fegico@gmail.com', 'Male');

INSERT INTO UserGender (Email, Gender)
VALUES ('jaklyn@gmail.com', 'Female');

INSERT INTO UserGender (Email, Gender)
VALUES ('terelyn@gmail.com', 'Female');

INSERT INTO UserGender (Email, Gender)
VALUES ('fegiclyn@gmail.com', 'Female');


-- Mail for Fegiclyn
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('1', 'fegico@gmail.com', 'fegico@gmail.com', 'Hi, you are basically my twin.');

-- Mail for Terence
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('2', 'fegico@gmail.com', 'fegico@gmail.com', 'Hi, I love you.');

INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('3', 'fegico@gmail.com', 'fegico@gmail.com', 'Hello? Please respond did u see my last message?');

-- Mail for Fegico
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('4', 'terence@gmail.com', 'terence@gmail.com', 'Hi, hope on league.');

-- Mail for Jake
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('5', 'terence@gmail.com', 'terence@gmail.com', 'Hi, are u goin to class.');

-- Mail for Jaklyn
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('6', 'terence@gmail.com', 'terence@gmail.com', 'Hi, wanna sign a contract');

-- Mail for Terelyn
INSERT INTO Mail (MailID, MailboxID, Email, Message)
VALUES ('7', 'terence@gmail.com', 'terence@gmail.com', 'Hi, u are my leageu twin');


-- Insert User Age data
INSERT INTO UserAge (Email, Age) 
VALUES ('terence@gmail.com', '20');

INSERT INTO UserAge (Email, Age) 
VALUES ('jake@gmail.com', '20');

INSERT INTO UserAge (Email, Age) 
VALUES ('fegico@gmail.com', '20');

INSERT INTO UserAge (Email, Age) 
VALUES ('jaklyn@gmail.com', '23');

INSERT INTO UserAge (Email, Age) 
VALUES ('terelyn@gmail.com', '24');

INSERT INTO UserAge (Email, Age) 
VALUES ('fegiclyn@gmail.com', '25');

