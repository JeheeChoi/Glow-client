import React, { useState, useEffect } from 'react'
import { showBoards, deleteBoards, updateBoards } from '../../api/boards'
import messages from '../AutoDismissAlert/messages'
import { Redirect } from 'react-router-dom'

// Board detail info with delete/update feature
const BoardShow = (props) => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)

  const { user, msgAlert, match } = props

  useEffect(() => {
    showBoards(user, match.params.id)
      .then(response => {
        console.log(response)
        setBoard(response.data.board)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Board Success',
          message: 'See the matched board here!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Board Failed',
          message: 'Error code: ' + err.messag,
          variant: 'danger'
        })
      })
  }, [])

  const destroyBoard = () => {
    deleteBoards(user, match.params.id)
      .then(() => setDeleted(true))
      .then(response => {
        msgAlert({
          heading: 'Delete Board Success',
          message: 'Find other boards available!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete Board Failed with error: ' + error.message,
          message: messages.deleteBoardsFailure,
          variant: 'danger'
        })
      })
  }
  const handleChange = event => {
    event.persist()

    setBoard(prevBoard => {
      const updatedField = { [event.target.name]: event.target.value }
      const updatedBoard = Object.assign({}, prevBoard, updatedField)
      return updatedBoard
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateBoards({ board }, user, match.params.id)
      .then(() => {
        return msgAlert({
          heading: 'Successfully updated',
          message: 'Updated Board:' + ' ' + board.title + ' - ' + board.topic,
          variant: 'success'
        })
      })
      .then(() => setEdited(true))
      .catch(error => {
        msgAlert({
          heading: 'Update Board Failed with error: ' + error.message,
          message: messages.updateBoardsFailure,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={'/home'}/>
    )
  }
  if (edited) {
    return (
      <div>
        <h3>{board.title}</h3>
        <p>{board.topic}</p>
        <p>Created By: {board.owner}</p>
        <p>{board.created_at}</p>
        <button onClick={destroyBoard}>Delete</button>
      </div>
    )
  }
  return (
    <div>
      <div>
        {board ? (
          <div>
            <h3>{board.title}</h3>
            <p>{board.topic}</p>
            <p>Created By: {board.owner}</p>
            <p>{board.created_at}</p>
            <button onClick={destroyBoard}>Delete</button>
          </div>
        ) : 'Loading...'}
      </div>
      <div className="update-board-form">
        <h1>Update Board</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="New Board Title Here"
            onChange={handleChange}
            name="title"
            value={board.title}
          />
          <input
            placeholder="New Board Topic Here"
            onChange={handleChange}
            name="topic"
            value={board.topic}
          />
          <button type="submit">Update Board</button>
        </form>
      </div>
    </div>
  )
}

export default BoardShow
