import express from 'express';
const app = express();
import { registerUser, login, getRooms, rateRoom, getRating, getRatings, deleteRating } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser"

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

// Stores a user with a password
app.post("/users/register", (req, res) => {
    registerUser(req.body.user, req.body.pwd)
    res.send(200);
})

// Checks that the user and password provided exist
// Return 401 if it doesn't match
app.post("/users/login", (req, res) => {
    let success = login(req.body.user, req.body.pwd)
    if (success) {
        res.send(200);
    } else {
        res.send(401);
    }
})

// Creates a rating for a user to a room
// If there is already a rating, it is Updated
app.post("/users/:user/rooms/:room/rating", (req, res) => {
    const user = req.params.user
    const room = parseInt(req.params.room)
    const rating = parseInt(req.body.rating)

    rateRoom(user, room, rating);
    res.send(200);
});

// Get the current rating for a room and a user
app.get("/users/:user/rooms/:room/rating", (req, res) => {
    const user = req.params.user
    const room = parseInt(req.params.room)
    if (user == undefined) {
        res.send(401)
    }
    res.json(getRating(user, room));
});

// Gets all rated rooms for a user
app.get("/users/:user/rooms/", (req, res) => {
    const user = req.params.user
    var ratedRoomIDs = getRatings(user).map(item => item.room);
    var allRooms = getRooms()
    var roomsToReturn = []
    for (let i = 0; i < allRooms.length; i++) {
        if (ratedRoomIDs.includes(allRooms[i].id)) {
            roomsToReturn.push(allRooms[i])
        }
    }
    res.json(roomsToReturn);
});

// Deletes a room from the users list of ratings
app.delete("/users/:user/rooms/:room", (req, res) => {
    const user = req.params.user
    const room = parseInt(req.params.room)

    deleteRating(user, room);
    res.send(200);
});

// Search for rooms, based on name, location and theme
app.get("/rooms", (req, res) => {
    const { q } = req.query;
    const keys = ["room_name", "location", "theme"];
    let allRooms = getRooms();

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    q ? res.json(search(allRooms).slice(0, 10)) : res.json(allRooms.slice(0, 10));
});

// Returns the room with the given ID
app.get("/rooms/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let allRooms = getRooms()

    const search = (data) => {
        return data.find((item) =>
            item.id == id
        );
    };
    res.json(search(allRooms));
});

app.listen(5001, () => console.log("API is working!"));