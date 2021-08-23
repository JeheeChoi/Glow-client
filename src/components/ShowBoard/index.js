import React, { useState, useEffect } from 'react'
// import { showBoards, deleteBoards, updateBoards } from '../../api/boards'
import { showBoards, deleteBoards, updateBoards } from '../../api/boards'
import { createGlows, showBoardGlows } from '../../api/glows'

import messages from '../AutoDismissAlert/messages'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import './index.scss'
// import GlowCreate from '../CreateGlow'
// import BoardUpdate from '../UpdateBoard'

// Board detail info with delete/update feature
const BoardShow = (props) => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  // Update board info
  const [updateModalShow, setUpdateModalShow] = useState(false)
  const [edited, setEdited] = useState(false)
  // Delete board with confirmation modal
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [deleted, setDeleted] = useState(false)
  // Create glow messages
  const [createGlowModalShow, setCreateGlowModalShow] = useState(false)
  const [glow, setGlow] = useState({ message: '', name: '' })
  const [createdGlowId, setCreatedGlowId] = useState(null)
  // Show glow messages
  const [glowArray, setGlowArray] = useState([])
  const [radioValue, setRadioValue] = useState('0')

  const { user, msgAlert, match } = props

  useEffect(() => {
    showBoards(user, match.params.id)
      .then(response => {
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
    showBoardGlows(user, match.params.id)
      .then(response => {
        console.log('this is the showBoardGlows response:', response)
        setGlowArray(response.data.glows)
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

  const handleCreateChange = event => {
    event.persist()
    setGlow(prevGlow => {
      const updatedField = { [event.target.name]: event.target.value }
      const updatedGlow = Object.assign({}, prevGlow, updatedField)
      return updatedGlow
    })
  }

  const handleCreateSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = props
    createGlows({ glow }, user, match.params.id)
      .then(response => {
        setCreatedGlowId(response.data.glow.id)
        return msgAlert({
          heading: 'Successfully Created',
          message: 'Created Glow:' + ' ' + response.data.glow.message + ' - ' + response.data.glow.name,
          variant: 'success'
        })
      })
      .then(() => setCreateGlowModalShow(false))
      .then(() => setGlow({ message: '', name: '' })
      )
      .catch(error => {
        setGlow({ message: '', name: '' })
        msgAlert({
          heading: 'Create Glow Failed with error: ' + error.message,
          message: messages.createGlowsFailure,
          variant: 'danger'
        })
      })
  }

  const handleUpdateChange = event => {
    event.persist()

    setBoard(prevBoard => {
      const updatedField = { [event.target.name]: event.target.value }
      const updatedBoard = Object.assign({}, prevBoard, updatedField)
      return updatedBoard
    })
  }

  const handleUpdateSubmit = event => {
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
  const glows = glowArray.map(glow => {
    return (
      <div
        onClick={() => {
          props.history.push(`${glow.board_id}/glows/${glow.id}`)
          // console.log('Board id: ', glow.board_id, 'Clicked glow id: ', glow.id)
        }}
        className="col-4 index-glow-detail"
        key={glow.id}
      >
        <blockquote className="blockquote mb-0" id="glow-message-text">
          {glow.message}
          <footer className="blockquote-footer">
            <small className="text-muted">{glow.name}</small>
          </footer>
        </blockquote>
      </div>

    )
  })

  const radios = [
    { name: 'Go Back', value: '1' },
    { name: 'Edit', value: '2' },
    { name: 'Delete', value: '3' },
    { name: 'Add Glow Message', value: '4' }
  ]

  if (deleted || edited) {
    return (
      <Redirect to={'/home'}/>
    )
  }
  if (createdGlowId) {
  //   return (
  //     <Redirect to={`boards/${board.id}`} />
  //   )
  }
  // if (edited) {
  //   return (
  //     <Redirect to={'/home'}/>
  //   )
  // }
  return (
    <div className="row">
      <div className="col-12">
        {board ? (
          <div className="card border-info" id="card-show">
            <br/>
            {glows}
            <h1 className="card-title">{board.title}</h1>
            <p className="card-text">{board.topic}</p>
            <div className="col-12" id="showboard-buttons">
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={'btn btn-outline-secondary'}
                    name="radio"
                    className="buttons"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    onClick={() => {
                      radio.value === '1'
                        ? props.history.push('/home')
                        : radio.value === '2' ? setUpdateModalShow(true)
                          : radio.value === '3' ? setDeleteModalShow(true)
                            : setCreateGlowModalShow(true)
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
          </div>
        ) : 'Loading...'}
        {/* <p className="create-date-info"><small className="text-muted">Created By: {board.owner} At {board.created_at}</small></p> */}
      </div>

      <Modal
        show={deleteModalShow}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Would you like to delete</h5>
          <br/>
          <h3>{board.title} - {board.topic} board?</h3>
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-secondary" onClick={() => setDeleteModalShow(false)}>Close</Button>
          <Button variant="info" onClick={destroyBoard}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={updateModalShow}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>New Board Title</h5>
          <form onSubmit={handleUpdateSubmit}>
            <input
              className="form-control"
              placeholder="New Board Title Here"
              onChange={handleUpdateChange}
              name="title"
              value={board.title}
            />
            <br/>
            <h5>New Board Topic</h5>
            <input
              className="form-control"
              placeholder="New Board Topic Here"
              onChange={handleUpdateChange}
              name="topic"
              value={board.topic}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setUpdateModalShow(false)}>Close</button>
          <button className="btn btn-info" onClick={handleUpdateSubmit}>Save Changes</button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={createGlowModalShow}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            A New Glow Message for {board.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreateSubmit}>
            <h5>Message</h5>
            <textarea
              className="form-control"
              cols="55"
              rows="5"
              placeholder="Glow Message Here"
              value={glow.message}
              onChange={handleCreateChange}
              name="message"
            >
            </textarea>
            <h5>From</h5>
            <input
              className="form-control"
              placeholder="Your Name Here"
              value={glow.name}
              onChange={handleCreateChange}
              name="name"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-secondary" onClick={() => setCreateGlowModalShow(false)}>Close</Button>
          <Button variant="info" onClick={handleCreateSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}

export default BoardShow
