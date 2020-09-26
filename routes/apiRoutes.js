const router = require("express").Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let notes = [];

//updates the json file whenever a note is added or deleted
function updateDb() {
    fs.writeFileSync("db/db.json", JSON.stringify(notes,'\t'), function (err) {
        if (err) throw err;
        return true;
    });
}

function readTheNotesDB() {
    fs.readFile("db/db.json","utf8", (err, data) => {
        console.log('DATA: ' + data);
        if (err) throw err;
        notes = JSON.parse(data);
        console.log('NOTES: ' + notes);
    });
}

router.get("/notes", function(req, res) {
    // Read the db.json file and return all saved notes as JSON.
    readTheNotesDB();
    res.json(notes);
});

// Setup the /api/notes post route
// Receives a new note, adds it to db.json, then returns the new note
router.post("/notes", function(req, res) {
    // Receives a new note, adds it to db.json, then returns the new note
    let newNote = req.body;
    newNote.id = uuidv4();

    readTheNotesDB();
    notes.push(newNote);
    updateDb();
    console.log("Express Posted a new note: " + newNote.title + "," + newNote.text);
    res.json(newNote);
});

// Retrieves a note with specific id
router.get("/notes/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    console.log('req ' + req);
    res.json(notes[req.params.id]);
});

// Deletes a note with specific id
router.delete("/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    updateDb();
    console.log("Express Deleted the note with id " + req.params.id);
    res.json(notes);
    //res.end(JSON.stringify({ a: 1 }, null, 3));
});

module.exports = router;