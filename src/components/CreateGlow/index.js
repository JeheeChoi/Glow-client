import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createGlows } from '../../api/glows'
import messages from '../AutoDismissAlert/messages'

const GlowCreate = props => {
  const [glow, setGlow] = useState({ message: '', name: '' })
  const [createdGlowId, setCreatedGlowId] = useState(null)

  const handleChange = event => {
    event.persist()
    setGlow(prevGlow => {
      const updatedField = { [event.target.name]: event.target.value }
      const updatedGlow = Object.assign({}, prevGlow, updatedField)
      return updatedGlow
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert, match } = props
    createGlows({ glow }, user, match.params.id)
      .then((response) => {
        setCreatedGlowId(response.data.glow.id)
        return msgAlert({
          heading: 'Successfully Created',
          message: 'Created Glow:' + ' ' + response.data.glow.message + ' - ' + response.data.glow.name,
          variant: 'success'
        })
      })
      .catch(error => {
        setGlow({ message: '', name: '' })
        msgAlert({
          heading: 'Create Glow Failed with error: ' + error.message,
          message: messages.createGlowsFailure,
          variant: 'danger'
        })
      })
  }
  if (createdGlowId) {
    return (
      <Link to={'/boards/:id/glows'}></Link>
    )
  }
  return (
    <div className="col-6 form-group">
      <h3>Create A New glow</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          cols="55"
          rows="5"
          placeholder="Glow Message Here"
          value={glow.message}
          onChange={handleChange}
          name="message"
        >
        </textarea>
        <input
          className="form-control"
          placeholder="Author Name Here"
          value={glow.name}
          onChange={handleChange}
          name="name"
        />
        <button className="btn btn-outline-secondary" type="submit">Create</button>
      </form>
    </div>
  )
}

export default GlowCreate
