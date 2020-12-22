import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createBoards } from '../../api/boards'
import './index.css'
import messages from '../AutoDismissAlert/messages'

const BoardCreate = props => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  const [createdBoardId, setCreatedBoardId] = useState(null)

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
    const { user, msgAlert } = props
    createBoards({ board }, user)
      .then((response) => {
        setCreatedBoardId(response.data.board.id)
        return msgAlert({
          heading: 'Successfully Created',
          message: 'Created Board:' + ' ' + response.data.board.title + ' - ' + response.data.board.topic,
          variant: 'success'
        })
      })
      .catch(error => {
        setBoard({ title: '', topic: '' })
        msgAlert({
          heading: 'Create Board Failed with error: ' + error.message,
          message: messages.createBoardsFailure,
          variant: 'danger'
        })
      })
  }

  if (createdBoardId) {
    return (
      <Redirect to={'/home'} />
    )
  }

  return (
    <div className="create-board-form">
      <h1>Create Board</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Board Title Here"
          value={board.title}
          onChange={handleChange}
          name="title"
        />
        <input
          placeholder="Board Topic Here"
          value={board.topic}
          onChange={handleChange}
          name="topic"
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  )
}

export default BoardCreate
