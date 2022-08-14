import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ note }) => {

  let getTimestamp = (note) => {
    return new Date(note.__updatedtime__).toLocaleDateString()
  }

  let trimmedContent = (note) => {
    let content = note.body

    if (content.length > 43) {
      return content.slice(0, 43) + '...'
    } else {
      return content
    }
  }

  return (
    <div>
      <Link to={`/notes/${note.id}`}>
        <div className='notes-list-item'>
          <h3>{trimmedContent(note)}</h3>
          <p><span>{getTimestamp(note)}</span></p>
        </div>
      </Link>
    </div>
  )
}

export default ListItem