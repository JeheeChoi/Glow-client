// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { createGlows } from '../../api/glows'
// import messages from '../AutoDismissAlert/messages'
// import './index.css'
//
// const GlowCreate = props => {
//   const [glow, setGlow] = useState({ message: '', name: '' })
//   const [createdGlowId, setCreatedGlowId] = useState(null)
//
//   const handleCreateChange = event => {
//     event.persist()
//     setGlow(prevGlow => {
//       const updatedField = { [event.target.name]: event.target.value }
//       const updatedGlow = Object.assign({}, prevGlow, updatedField)
//       return updatedGlow
//     })
//   }
//
//   const handleCreateSubmit = event => {
//     event.preventDefault()
//     const { user, msgAlert, match } = props
//     createGlows({ glow }, user, match.params.id)
//       .then((response) => {
//         setCreatedGlowId(response.data.glow.id)
//         return msgAlert({
//           heading: 'Successfully Created',
//           message: 'Created Glow:' + ' ' + response.data.glow.message + ' - ' + response.data.glow.name,
//           variant: 'success'
//         })
//       })
//       .then(() => {
//         props.history.push('/home')
//       })
//       .catch(error => {
//         setGlow({ message: '', name: '' })
//         msgAlert({
//           heading: 'Create Glow Failed with error: ' + error.message,
//           message: messages.createGlowsFailure,
//           variant: 'danger'
//         })
//       })
//   }
//   if (createdGlowId) {
//     return (
//       <Link to={'/boards/:id/glows'}></Link>
//     )
//   }
//   return (
//     <div>
//       <br/>
//       <div className="col-6 form-group" id="create-glow-form">
//         <h3>New Glow Message</h3>
//         <form onSubmit={handleCreateSubmit}>
//           <textarea
//             className="form-control"
//             cols="55"
//             rows="5"
//             placeholder="Glow Message Here"
//             value={glow.message}
//             onChange={handleCreateChange}
//             name="message"
//           >
//           </textarea>
//           <input
//             className="form-control"
//             placeholder="Your Name Here"
//             value={glow.name}
//             onChange={handleCreateChange}
//             name="name"
//           />
//           <button className="btn btn-info" type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   )
// }
//
// export default GlowCreate
