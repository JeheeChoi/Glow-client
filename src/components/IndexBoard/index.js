import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexBoards } from '../../api/boards'
import './index.css'
import messages from '../AutoDismissAlert/messages'

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
          heading: 'Index Board Failed with error: ' + error.message,
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
      'No Boards to display :('
    )
  } else {
    return (
      <div className="index-boards-container">
        {boardArray.map(board => (
          <div
            onClick={() => {
              console.log(board)
            }}
            className="index-board-detail"
            key={board.id}
          >
            <h2>{board.title}</h2>
            <p>{board.topic}</p>
            <Link to={`/boards/${board.id}`}>See More</Link>
          </div>
        ))}
        <div>
          <h2>Create Board</h2>
          <Link to={'/boards/'}><button>+</button></Link>

        </div>
      </div>
    )
  }
}

export default BoardIndex
