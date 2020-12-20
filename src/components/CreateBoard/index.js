import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { createBoards } from '../../api/boards'
import './index.css'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

const BoardCreate = props => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  // const [createdBoardId, setCreatedBoardId] = useState(null)
  const history = useHistory()
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
        // setCreatedBoardId(response.data.board.id)
        return msgAlert({
          heading: 'Successfully Created',
          message: 'Created Board:' + ' ' + response.data.board.title + ' - ' + response.data.board.topic,
          variant: 'success'
        })
      })
      .then(() => history.push('/boards'))
  }

  // if (createdBoardId) {
  //   return (
  //     <Redirect to={'/boards/'} />
  //   )
  // }

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
