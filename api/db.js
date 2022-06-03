import { Low, JSONFile } from 'lowdb'

/**
 * Initializes the database collection of users 
 */
const usersAdapter = new JSONFile('users.json')
const usersDB = new Low(usersAdapter)
await usersDB.read();

//Initializes the database collection of rooms 
const roomsAdapter = new JSONFile('rooms.json')
const roomsDB = new Low(roomsAdapter)
await roomsDB.read();

//Initializes the database collection of ratings
const ratingsAdapter = new JSONFile('ratings.json')
const ratingDB = new Low(ratingsAdapter)
await ratingDB.read()

// Writes a new User to the beginning of the user database
// If the user already exist, only the new user can login

/**
 * Writes a new User to the beginning of the user database
 * If the user already exist, only the new user can login
 * @param {string} username 
 * @param {string} password 
 */
export function registerUser(username, password) {
    usersDB.data.unshift({ username: username, password: password })
    usersDB.write();
    usersDB.read();
}



/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns true if there is a user with the given username in the database
and the password is matching the given password
 */
export function login(username, password) {
    let record = usersDB.data.find(rec => rec.username == username);
    if (!record || record.password != password) {
        return false;
    } else {
        return true;
    }
}

/**
 * 
 * @returns Returns all rooms in the database
 */
export function getRooms() {
    return roomsDB.data
}



/**
 * Adds a rating to a room in the rating database
 * If the users has already rated the room, the rating is updated
 * 
 * @param {string} user 
 * @param {number} room 
 * @param {number} rating 
 */
export async function rateRoom(user, room, rating) {
    var existing = ratingDB.data.find(rec => rec.user == user && rec.room == room)
    var existingIndex = ratingDB.data.indexOf(existing);
    if (existingIndex >= 0) {
        ratingDB.data.splice(existingIndex, 1)
    }

    ratingDB.data.push({ user: user, room: room, rating: rating })
    ratingDB.write();
    roomsDB.read();
}



/**
 * 
 * @param {string} user 
 * @param {number} room 
 * @returns the rating from the database matching the user and the room
 */
export function getRating(user, room) {
    return ratingDB.data.find(rec => rec.user == user && rec.room == room)
}


/**
 * 
 * @param {string} user 
 * @returns all ratings that the user has given any room
 */

/**
 * 
 * @param {string} user 
 * @returns the ratings from database
 */
export function getRatings(user) {
    return ratingDB.data.filter(rec => rec.user == user) || []
}

/**
 * Deletes a rating from the database, for the user and a specific room
 * 
 * @param {string} user 
 * @param {number} room 
 */
export function deleteRating(user, room) {
    var target = ratingDB.data.find(rec => rec.user == user && rec.room == room)
    var index = ratingDB.data.indexOf(target);
    if (index >= 0) {
        ratingDB.data.splice(index, 1)
    }
}