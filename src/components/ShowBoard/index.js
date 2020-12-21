import React, { useState, useEffect, Redirect } from 'react'
import { showBoards, deleteBoards } from '../../api/boards'

const BoardShow = (props) => {
  const [board, setBoard] = useState(null)
  const [deleted, setDeleted] = useState(false)
  // const [edited, setEdited] = useState(false)

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

  const destroyBoard = () => {
    const { user, msgAlert, match } = props
    deleteBoards(user, match.params.id)
      .then(() => setDeleted(true))
      .then(response => {
        msgAlert({
          heading: 'Delete Board Success',
          message: 'Find other boards available!',
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  if (!board) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Board succesfully deleted!' } }
    } />
  }

  return (
    <div>
      {board ? (
        <div>
          <h3>{board.title}</h3>
          <p>{board.topic}</p>
          <p>Created By: {board.owner}</p>
          <p>{board.created_at}</p>
          <button onClick={destroyBoard}>Delete</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default BoardShow
