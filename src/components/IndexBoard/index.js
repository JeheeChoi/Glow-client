import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexBoards } from '../../api/boards'
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
      </div>
    )
  }
}

export default BoardIndex
