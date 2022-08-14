import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { ReactComponent as SaveIcon } from '../assets/save.svg'
import { ReactComponent as TrashIcon } from '../assets/trash.svg'


const Note = () => {
    let params = useParams()
    let navigate = useNavigate()
    let noteId = params.id
    
    useEffect(() => {
        const getNote = async () => {
            let response = await fetch(`/notes/${noteId}`)
            let data = await response.json()
            setNote(data)
        }
        getNote()
    }, [noteId])
    
    

    let submitData = async () => {
        try {
            let url = ''
            let method = ''
            if(noteId !== 'add') {
                url = `/notes/${noteId}`
                method = 'PUT'
            } else {
                url = '/notes'
                method = 'POST'
            }
            await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"body": note.body}),
            })
        } catch (err) {
            console.log(err)
        }
        navigate('/')
    }

    let deleteNote = async (e) => {
        e.preventDefault()
        try {
            await fetch(`/notes/${noteId}`, {
                method: 'DELETE',
            })
        } catch (err) {
            console.log(err)
        }
        navigate('/')
    }
    
    let [note, setNote] = useState()
    return (
        <div>
            <div className="note">
                <div className='note-header'>
                    <h3>
                        <Link to="/">
                            <ArrowLeft />
                        </Link>
                    </h3>
                    {noteId !== 'add' && <button onClick={deleteNote}><TrashIcon /></button>}
                </div>
        
                <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value}) }} placeholder="Edit note" value={note?.body} required></textarea>
        
                <div onClick={submitData} className="floating-button">
                    <SaveIcon  />
                </div>
            </div>
        </div>
    )
}

export default Note