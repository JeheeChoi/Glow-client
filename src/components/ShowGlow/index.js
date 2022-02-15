// import React, { useState, useEffect } from 'react'
// import { showGlows, deleteGlows } from '../../api/glows'
// import messages from '../AutoDismissAlert/messages'
// import { Redirect, Link } from 'react-router-dom'
// import { Modal, Button } from 'react-bootstrap'
// import './index.scss'
//
// const GlowShow = props => {
//   const [glowDetail, setGlowDetail] = useState({ message: '', name: '' })
//   const [deleted, setDeleted] = useState(false)
//   // Show glow message detail modal
//   const [viewGlowModalShow, setViewGlowModalShow] = useState(false)
//
//   const { user, msgAlert, match } = props
//
//   useEffect(() => {
//     showGlows(user, match.params.id)
//       .then(response => {
//         setGlowDetail(response.data.glow)
//         setViewGlowModalShow(true)
//       })
//       .then(() => {
//         msgAlert({
//           heading: 'Show Glows Success',
//           message: 'See the glow detail info!',
//           variant: 'success'
//         })
//       })
//       .catch(error => {
//         msgAlert({
//           heading: 'Show Glow Failed with error: ' + error.message,
//           message: messages.showGlowFailure,
//           variant: 'danger'
//         })
//       })
//   }, [])
//
//   const destroyGlow = () => {
//     deleteGlows(user, match.params.id)
//       .then(() => setDeleted(true))
//       // .then(() => props.history.push(`/boards/${match.params.id}`))
//       .then(response => {
//         msgAlert({
//           heading: 'Delete Glow Success',
//           message: 'See others glows on the board!',
//           variant: 'success'
//         })
//       })
//       .then(() => history.push(`/boards/${glowDetail.board_id}`))
//       .catch(error => {
//         msgAlert({
//           heading: 'Delete Glow Failed with error: ' + error.message,
//           message: messages.deleteGlowsFailure,
//           variant: 'danger'
//         })
//       })
//   }
//
//   if (deleted) {
//     return (
//       <Redirect to={`/boards/${match.params.id}`}/>
//     )
//   }
//   return (
//     <div className="showglow-container">
//       <div className="col-9">
//         {glowDetail ? (
//           <Modal
//             show={viewGlowModalShow}
//             {...props}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//           >
//             <Modal.Body>
//               <h4>{glowDetail.message}</h4>
//               <p>From {glowDetail.name}</p>
//             </Modal.Body>
//             <Modal.Footer>
//               <div className="glow-buttons">
//                 <Link to={`/boards/${glowDetail.board_id}`}><Button variant="btn btn-secondary" onClick={() => setViewGlowModalShow(false)}>Close</Button></Link>
//                 {user.id === glowDetail.owner &&
//                 <Button variant="info" onClick={destroyGlow}>Delete</Button>
//                 }
//               </div>
//             </Modal.Footer>
//           </Modal>
//         ) : 'Loading... '}
//       </div>
//     </div>
//   )
// }
//
// export default GlowShow
