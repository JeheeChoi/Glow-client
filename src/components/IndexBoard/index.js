import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexBoards } from '../../api/boards'
import messages from '../AutoDismissAlert/messages'
import './index.css'

const BoardIndex = (props) => {
  const [boardArray, setBoardArray] = useState(null)

  useEffect(() => {
    const { user, msgAlert } = props
    indexBoards(user)
      .then(response => {
        setBoardArray(response.data.boards)
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
  if (!boardArray) {
    return (
      'Loading...'
    )
  } else if (boardArray.length === 0) {
    return (
      'No Boards to display'
    )
  } else {
    return (
      <div>
        <div className="card-container">
          {boardArray.map(board => (
            <div
              onClick={() => {
                props.history.push(`/boards/${board.id}`)
                console.log(board)
              }}
              className="card border-info mb-3"
              key={board.id}
            >
              <br/>
              <br/>
              <h2 className="card-title">{board.title}</h2>
              <p className="card-text">{board.topic}</p>
            </div>
          ))}
          <Link to={'/home/boards/'}>
            <div className="card border-info mb-3">
              <br/>
              <br/>
              <br/>
              <Link to={'/home/boards/'}><p className="card-text">+ Add a new board</p></Link>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default BoardIndex
