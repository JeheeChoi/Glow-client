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
      'No Boards to display :('
    )
  } else {
    return (
      <div>
        <div className="card-container">
          {boardArray.map(board => (
            <div
              onClick={() => {
                console.log(board)
              }}
              className="card border-info mb-3"
              key={board.id}
            >
              <h2 className="card-title">{board.title}</h2>
              <p className="card-text">{board.topic}</p>
              <p className="card-text"><small className="text-muted">{board.updated_at}</small></p>
              <Link to={`/boards/${board.id}`}>See More</Link>
            </div>
          ))}
          <Link to={'/boards/'}>
            <div className="card border-info mb-3">
              <br/>
              <br/>
              <br/>
              <p className="card-title"><Link to={'/boards/'}><button>+</button></Link></p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default BoardIndex
