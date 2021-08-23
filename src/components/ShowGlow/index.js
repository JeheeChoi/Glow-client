import React, { useState, useEffect } from 'react'
import { showGlows, deleteGlows } from '../../api/glows'
import messages from '../AutoDismissAlert/messages'
import { Redirect, Link } from 'react-router-dom'
// import { Modal, Button } from 'react-bootstrap'
import './index.scss'

const GlowShow = props => {
  const [glow, setGlow] = useState({ message: '', name: '' })
  const [deleted, setDeleted] = useState(false)
  // Show glow message detail modal
  // const [viewGlowModalShow, setViewGlowModalShow] = useState(false)

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
      <Redirect to={'/home'}/>
    )
  }
  return (
    <div className="showglow-container">
      <div className="col-9">
        {glow ? (
          <div className="card p-3 text-left" id="glow-show">
            <blockquote className="blockquote mb-0">
              {glow.message}
              <footer className="blockquote-footer">
                <small className="text-muted">{glow.name}</small>
              </footer>
            </blockquote>
          </div>
        ) : 'Loading... '}
        <div className="glow-buttons">
          <Link to={`/boards/${glow.board_id}`}><button className="btn btn-outline-secondary">Close</button></Link>
          {user.id === glow.owner &&
            <button className="btn btn-outline-secondary" onClick={destroyGlow}>Delete</button>
          }
        </div>

        {/* }<Modal
          show={viewGlowModalShow}
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              View Glow Message
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <h3>Message: {glow.message}</h3>
            <h3>By {glow.name}</h3>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-secondary" onClick={() => setViewGlowModalShow(false)}>Close</Button>
            <Button variant="info" onClick={destroyGlow}>Delete</Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </div>
  )
}

export default GlowShow
