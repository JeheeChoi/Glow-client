import React, { useState, useEffect } from 'react'
import { showBoards } from '../../api/boards'

const BoardShow = (props) => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const { user, msgAlert, match } = props

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
  }, [])

  return (
    <div>
      {board ? (
        <div>
          <h3>{board.title}</h3>
          <p>{board.topic}</p>
          <p>Created By: {board.owner}</p>
          <p>{board.created_at}</p>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default BoardShow
