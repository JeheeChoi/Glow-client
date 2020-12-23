import React, { useState, useEffect } from 'react'
import { showBoards, deleteBoards, updateBoards } from '../../api/boards'
import { showBoardGlows } from '../../api/glows'
import messages from '../AutoDismissAlert/messages'
import { Redirect, Link } from 'react-router-dom'
import './index.css'

// Board detail info with delete/update feature
const BoardShow = (props) => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  // Show glow messages
  const [glowArray, setGlowArray] = useState([])

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
    showBoardGlows(user, match.params.id)
      .then(response => {
        setGlowArray(response.data.glows)
      })
      .then(() => {
        msgAlert({
          heading: 'Index Glows Success',
          message: 'See all the glows on this board!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Index Glows Failed with error: ' + error.message,
          message: messages.indexGlowsFailure,
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

  if (deleted) {
    return (
      <Redirect to={'/home'}/>
    )
  }
  if (edited) {
  }
  const glows = glowArray.map(glow => {
    return (
      <div
        onClick={() => {
          console.log(glow)
        }}
        className="index-glow-detail"
        key={glow.id}
      >
        <p>{glow.message}</p>
        <p>{glow.name}</p>
        <Link to={`/glows/${glow.id}`}>See More</Link>
      </div>
    )
  })
  return (
    <div className="row">
      {board ? (
        <div className="col-12">
          <div className="card border-info">
            <br/>
            <br/>
            <h2 className="card-title">{board.title}</h2>
            <p className="card-text">{board.topic}</p>
          </div>
        </div>
      ) : 'Loading...'}
      <div className="col-12">
        <p><small className="text-muted">Created By: {board.owner} At {board.created_at}</small></p>
      </div>
      <div className="col-6 form-group">
        <form onSubmit={handleUpdateSubmit}>
          <input
            className="form-control"
            placeholder="New Board Title Here"
            onChange={handleUpdateChange}
            name="title"
            value={board.title}
          />
          <input
            className="form-control"
            placeholder="New Board Topic Here"
            onChange={handleUpdateChange}
            name="topic"
            value={board.topic}
          />
          <button className="btn btn-outline-secondary" type="submit">Edit Board</button>
        </form>
      </div>
      <div className="col-12">
        <button className="btn btn-outline-secondary" onClick={destroyBoard}>Delete</button>
        <Link to={`/boards/${board.id}/glows`}><button className="btn btn-outline-secondary">Add A Glow Message</button></Link>
        <div className="index-board-glows-container">
          {glows}
        </div>
      </div>
    </div>
  )
}

export default BoardShow
