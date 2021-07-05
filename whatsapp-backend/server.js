//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

//appconfig
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1223177",
    key: "e3754e4e45675fc81aaf",
    secret: "e1e10978e492f459e6e6",
    cluster: "eu",
    useTLS: true
});

//middleware
app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader("Acces-Control-Allow-Origin","*");
    res.setHeader("Acces-Control-Allow-Headers","*");
    next();
});

//DBconfig
const connection_url = "mongodb+srv://admin:B8eMA87IJm4Rnxdq@cluster0.dmsbt.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection

db.once("open",()=>{
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);

        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted", {
                name: messageDetails.user,
                message: messageDetails.message,
            });
        }
        else{
            console.log("Error triggering pusher");
        }
    });

});


//api routes
app.get('/',(req, res) => res.status(200).send("hello world"));

app.get("/message/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    });
});

app.post("/message/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    });
});

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));