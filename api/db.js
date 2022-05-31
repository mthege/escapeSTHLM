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

export async function rateRoom(room, rating) {
    ratingDB.data.push({ room: room, rating: rating })
    ratingDB.write();
}

export const Ratings = ratingDB.data;