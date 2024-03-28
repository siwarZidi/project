create DATABASE Clubs;
CREATE TABLE club(
    club_id SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Year VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);
CREATE TABLE Reservation(
    Reservation_id SERIAL PRIMARY KEY,
    ClubName VARCHAR(255),
    date DATE,
    time TIME ,
);