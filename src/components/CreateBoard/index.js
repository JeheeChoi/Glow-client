import React, { useState } from 'react'
// import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
import { createBoards } from '../../api/boards'
// import Form from 'react-bootstrap/Form'
import './index.css'
import messages from '../AutoDismissAlert/messages'
// import CreateBoardForm from './modal'
import Modal from 'react-bootstrap/Modal'

const BoardCreate = props => {
  const [createModalShow, setCreateModalShow] = useState(false)
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
      <Redirect to={`/boards/${createdBoardId}`} />
    )
  }

  return (
    <div className="create-board">
      <button className="btn btn-outline-info" onClick={() => setCreateModalShow(true)} block>Create a new board</button>

      <Modal
        show={createModalShow}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a new board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h5>Board Title</h5>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
              value={board.title}
            />
            <h5>Board Topic</h5>
            <input
              type="text"
              className="form-control"
              name="topic"
              onChange={handleChange}
              value={board.topic}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setCreateModalShow(false)}>Close</button>
          <button className="btn btn-info" onClick={handleSubmit}>Create</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BoardCreate
