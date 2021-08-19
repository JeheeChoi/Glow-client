// import React, { useState, useEffect } from 'react'
// import { updateBoards, showBoards } from '../../api/boards'
// import messages from '../AutoDismissAlert/messages'
// import { Redirect } from 'react-router-dom'
// // import { Modal } from 'react-bootstrap'
// import './index.css'
//
// const BoardUpdate = props => {
//   // const [updateModalShow, setUpdateModalShow] = useState(false)
//   const [board, setBoard] = useState({ title: '', topic: '' })
//   const [edited, setEdited] = useState(false)
//
//   const { user, msgAlert, match } = props
//   useEffect(() => {
//     showBoards(user, match.params.id)
//       .then(response => {
//         console.log(response)
//         setBoard(response.data.board)
//       })
//       // .then(() => {
//       //   msgAlert({
//       //     heading: 'Show Board Success',
//       //     message: 'See the matched board here!',
//       //     variant: 'success'
//       //   })
//       // })
//       // .catch(err => {
//       //   msgAlert({
//       //     heading: 'Show Board Failed',
//       //     message: 'Error code: ' + err.messag,
//       //     variant: 'danger'
//       //   })
//       // })
//   }, [])
//   //
//   const handleUpdateChange = event => {
//     event.persist()
//
//     setBoard(prevBoard => {
//       const updatedField = { [event.target.name]: event.target.value }
//       const updatedBoard = Object.assign({}, prevBoard, updatedField)
//       return updatedBoard
//     })
//   }
//
//   const handleUpdateSubmit = event => {
//     event.preventDefault()
//     updateBoards({ board }, user, match.params.id)
//       .then(() => {
//         return msgAlert({
//           heading: 'Successfully updated',
//           message: 'Updated Board:' + ' ' + board.title + ' - ' + board.topic,
//           variant: 'success'
//         })
//       })
//       .then(() => setEdited(true))
//       .catch(error => {
//         msgAlert({
//           heading: 'Update Board Failed with error: ' + error.message,
//           message: messages.updateBoardsFailure,
//           variant: 'danger'
//         })
//       })
//   }
//
//   if (edited) {
//     return (
//       <Redirect to={'/home'}/>
//     )
//   }
//   return (
//     <div className="update-board">
//       {/* <Modal
//         show={updateModalShow}
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Update Board
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleUpdateSubmit}>
//             <input
//               className="form-control"
//               placeholder="New Board Title Here"
//               onChange={handleUpdateChange}
//               name="title"
//               value={board.title}
//             />
//             <input
//               className="form-control"
//               placeholder="New Board Topic Here"
//               onChange={handleUpdateChange}
//               name="topic"
//               value={board.topic}
//             />
//             <button className="btn btn-outline-secondary" type="submit">Update Board</button>
//           </form>
//           <div className="modal-footer">
//             <button className="btn btn-info" onClick={() => setUpdateModalShow(false)}>Close</button>
//             <button className="btn btn-info" onClick={handleUpdateSubmit}>Create</button>
//           </div>
//
//         </Modal.Body>
//       </Modal> */}
//       <div className="col-6 form-group" id="update-board-form">
//         <h3>Update Board Info</h3>
//         <form onSubmit={handleUpdateSubmit}>
//           <input
//             className="form-control"
//             placeholder="New Board Title Here"
//             onChange={handleUpdateChange}
//             name="title"
//             value={board.title}
//           />
//           <input
//             className="form-control"
//             placeholder="New Board Topic Here"
//             onChange={handleUpdateChange}
//             name="topic"
//             value={board.topic}
//           />
//           <button className="btn btn-outline-secondary" type="submit">Update Board</button>
//         </form>
//       </div>
//     </div>
//   )
// }
//
// export default BoardUpdate
