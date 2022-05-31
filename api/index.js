import express from 'express';
const app = express();
import { Users, registerUser, login, Rooms, rateRoom } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser"

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

app.post("/users/register", (req, res) => {
    const user = req.body.user
    const pwd = req.body.pwd
    console.log("body " + req.body)
    console.log("body " + JSON.stringify(req.body))
    console.log(req.body.user)
    console.log(req.body.pwd)
    registerUser(req.body.user, req.body.pwd)
    res.end()
})

app.post("/users/login", (req, res) => {
    console.log("body " + req.body)
    let success = login(req.body.user, req.body.pwd)
    if (success) {
        res.send(200);
    } else {
        res.send(401);
    }
})

app.get("/rating", (req, res) => {
    const rating = req.query.rating
    const room = req.query.room

    rateRoom(rating, room);
});

app.get("/", (req, res) => {
    const { q } = req.query;

    const keys = ["room_name", "location", "theme"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    q ? res.json(search(Rooms).slice(0, 10)) : res.json(Rooms.slice(0, 10));
});

app.get("/rooms/:id", (req, res) => {
    const id = req.params.id;

    console.log("requested id " + id)

    const search = (data) => {
        return data.find((item) =>
            item.id == id
        );
    };

    console.log("requested id " + JSON.stringify(search(Rooms)));

    res.json(search(Rooms));
});

app.listen(5000, () => console.log("API is working!"));