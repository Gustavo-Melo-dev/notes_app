from fastapi import APIRouter, Body
from config.db import db

note = APIRouter()

@note.get("/notes")
def get_notes():
    notes = db.sql('SELECT * FROM notesapp.notes ORDER BY __updatedtime__ DESC')
    
    return notes

@note.get("/notes/{id}")
def get_note(id: str):
    notes = db.search_by_hash("notesapp", "notes", [id], get_attributes=["*"])
    return notes[0]

@note.post("/notes")
def create_notes(data = Body()):
    db.insert("notesapp", "notes", [{"body": data["body"]}])
    notes = db.search_by_value("notesapp", "notes", "id", "*", get_attributes=["*"])
    return notes

@note.put("/notes/{id}")
def update_note(id: str, data = Body()):
    db.update("notesapp", "notes", [{"id": id, "body": data["body"]}])
    notes = db.search_by_value("notesapp", "notes", "id", "*", get_attributes=["*"])
    return notes

@note.delete("/notes/{id}")
def delete_notes(id: str):
    db.delete("notesapp", "notes", [id])
    notes = db.search_by_value("notesapp", "notes", "id", "*", get_attributes=["*"])
    return notes