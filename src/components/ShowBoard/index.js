import React, { useState, useEffect } from 'react'
// import { showBoards, deleteBoards, updateBoards } from '../../api/boards'
import { showBoards, deleteBoards } from '../../api/boards'

import { showBoardGlows } from '../../api/glows'
import messages from '../AutoDismissAlert/messages'
import { Redirect, Link } from 'react-router-dom'
import './index.scss'
// import GlowCreate from '../CreateGlow'
// import BoardUpdate from '../UpdateBoard'

// Board detail info with delete/update feature
const BoardShow = (props) => {
  const [board, setBoard] = useState({ title: '', topic: '' })
  const [deleted, setDeleted] = useState(false)
  // const [updateFormShow, setUpdateFormShow] = useState(false)
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
      // .then(() => {
      //   msgAlert({
      //     heading: 'Index Glows Success',
      //     message: 'See all the glows on this board!',
      //     variant: 'success'
      //   })
      // })
      // .catch(error => {
      //   msgAlert({
      //     heading: 'Index Glows Failed with error: ' + error.message,
      //     message: messages.indexGlowsFailure,
      //     variant: 'danger'
      //   })
      // })
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

  // const handleUpdateChange = event => {
  //   event.persist()
  //   setBoard(prevBoard => {
  //     const updatedField = { [event.target.name]: event.target.value }
  //     const updatedBoard = Object.assign({}, prevBoard, updatedField)
  //     return updatedBoard
  //   })
  // }
  // const handleUpdateSubmit = event => {
  //   event.preventDefault()
  //   updateBoards({ board }, user, match.params.id)
  //     .then(() => {
  //       return msgAlert({
  //         heading: 'Successfully updated',
  //         message: 'Updated Board:' + ' ' + board.title + ' - ' + board.topic,
  //         variant: 'success'
  //       })
  //     })
  //     .then(() => setEdited(true))
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Update Board Failed with error: ' + error.message,
  //         message: messages.updateBoardsFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  if (deleted) {
    return (
      <Redirect to={'/home'}/>
    )
  }
  // if (edited) {
  // }
  const glows = glowArray.map(glow => {
    return (
      <div
        onClick={() => {
          props.history.push(`/glows/${glow.id}`)
          console.log(glow)
        }}
        className="index-glow-detail"
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

  // const form = () => {
  //   return (
  //     <div className="update-board">
  //       <br/>
  //       <div className="col-6 form-group" id="update-board-form">
  //         <form>
  //           <input
  //             className="form-control"
  //             placeholder="New Board Title Here"
  //             name="title"
  //             value={board.title}
  //           />
  //           <input
  //             className="form-control"
  //             placeholder="New Board Topic Here"
  //             name="topic"
  //             value={board.topic}
  //           />
  //           <button className="btn btn-outline-secondary" type="submit">Update Board</button>
  //         </form>
  //       </div>
  //     </div>
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
              <Link to={'/home'}><button className="btn btn-outline-secondary">Go Back</button></Link>
              {/* <Link to={`/boards/${board.id}/update`}><button className="btn btn-outline-secondary">Edit</button></Link> */}
              <button className="btn btn-outline-secondary" onClick={() => props.history.push(`/boards/${board.id}/update`)} block>Edit</button>
              <button className="btn btn-outline-secondary" onClick={destroyBoard}>Delete</button>
              <Link to={`/boards/${board.id}/glows`}><button className="btn btn-outline-secondary">Add A Glow Message</button></Link>
            </div>
          </div>
        ) : 'Loading...'}
        <p className="create-date-info"><small className="text-muted">Created By: {board.owner} At {board.created_at}</small></p>
      </div>
    </div>
  )
}

export default BoardShow
