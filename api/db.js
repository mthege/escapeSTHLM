import { Low, JSONFile } from 'lowdb'

//Code for the database of the users 
const usersAdapter = new JSONFile('users.json')
const usersDB = new Low(usersAdapter)

export const Users = usersDB.data;

await usersDB.read();
export async function registerUser(username, password) {
    usersDB.data.push({ username: username, password: password })
    usersDB.write();
    usersDB.read();
}

export function login(username, password) {
    let record = usersDB.data.find(rec => rec.username == username);
    if (!record || record.password != password) {
        return false;
    } else {
        return true;
    }
}

//Code for the database of the rooms 
const roomsAdapter = new JSONFile('rooms.json')
const roomsDB = new Low(roomsAdapter)

await roomsDB.read();
export const Rooms = roomsDB.data

//Code for the database of rating
const ratingsAdapter = new JSONFile('ratings.json')
const ratingDB = new Low(ratingsAdapter)
ratingDB.data = []

await ratingDB.read();

export async function rateRoom(user, room, rating) {

    var existing = ratingDB.data.find(rec => rec.user == user && rec.room == room)
    var existingIndex = ratingDB.data.indexOf(existing);
    ratingDB.data.splice(existingIndex, 1)

    ratingDB.data.push({ user: user, room: room, rating: rating })
    ratingDB.write();
    roomsDB.read();
}

export async function saveRoom(user, room) {

    var existing = ratingDB.data.find(rec => rec.user == user && rec.room == room)
    if (existing === undefined) {
        ratingDB.data.push({ user: user, room: room, rating: 0 })
        ratingDB.write();
        roomsDB.read();
    }
}

export function getRating(user, room) {
    return ratingDB.data.find(rec => rec.user == user && rec.room == room)
}

export function getSavedRooms(user) {
    return ratingDB.data.filter(rec => rec.user == user) || []
}

export const Ratings = ratingDB.data;