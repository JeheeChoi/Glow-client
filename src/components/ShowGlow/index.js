import React, { useState, useEffect } from 'react'
import { showGlows, deleteGlows } from '../../api/glows'
import messages from '../AutoDismissAlert/messages'
import { Redirect } from 'react-router-dom'

const GlowShow = props => {
  const [glow, setGlow] = useState({ message: '', name: '' })
  const [deleted, setDeleted] = useState(false)

  const { user, msgAlert, match } = props

  useEffect(() => {
    showGlows(user, match.params.id)
      .then(response => {
        setGlow(response.data.glow)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Glows Success',
          message: 'See the glow detail info!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Show Glow Failed with error: ' + error.message,
          message: messages.showGlowFailure,
          variant: 'danger'
        })
      })
  }, [])
  const destroyGlow = () => {
    deleteGlows(user, match.params.id)
      .then(() => setDeleted(true))
      .then(response => {
        msgAlert({
          heading: 'Delete Glow Success',
          message: 'See others glows on the board!',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Delete Glow Failed with error: ' + error.message,
          message: messages.deleteGlowsFailure,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={'/boards/'}/>
    )
  }
  return (
    <div className="col-12">
      {glow ? (
        <div className="card border-red">
          <p className="card-text">{glow.message}</p>
          <p className="card-text">{glow.name}</p>
        </div>
      ) : 'Loading... '}
      <button className="btn btn-outline-secondary" onClick={destroyGlow}>Delete</button>
    </div>
  )
}

export default GlowShow
