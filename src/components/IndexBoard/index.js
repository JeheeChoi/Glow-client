import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { indexBoards } from '../../api/boards'
import messages from '../AutoDismissAlert/messages'
import './index.scss'

const BoardIndex = props => {
  // Index boards
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const { user, msgAlert } = props
    indexBoards(user)
      .then(response => {
        setBoards(response.data.boards)
      })
      .then(() => {
        msgAlert({
          heading: 'Index Boards Success',
          message: 'See all the boards here!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Index Boards Failed with error: ' + error.message,
          message: messages.indexBoardsFailure,
          variant: 'danger'
        })
      })
  }, [])

  if (!boards) {
    return (
      'Loading...'
    )
  } else if (boards.length === 0) {
    return (
      <div
        className="card border-info mb-3"
        onClick={() => {
          props.history.push('/home/boards')
        }}
      >
        <br/>
        <br/>
        <br/>
        <p className="card-text">+ Add a new board</p>
      </div>
    )
  } else {
    return (
      <div>
        <div className="card-container">
          {boards.map(board => (
            <div
              onClick={() => {
                props.history.push(`/boards/${board.id}`)
              }}
              className="card shadow-lg p-3 mb-5 bg-white rounded"
              key={board.id}
            >
              <br/>
              <br/>
              <h2 className="card-title">{board.title}</h2>
              <p className="card-text">{board.topic}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default BoardIndex
