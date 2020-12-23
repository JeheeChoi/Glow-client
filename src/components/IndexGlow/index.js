// // import React, { useState, useEffect } from 'react'
// // import { indexGlows } from '../../api/glows'
// // import messages from '../AutoDismissAlert/messages'
// // import { Link } from 'react-router-dom'
// //
// // const GlowIndex = props => {
// //   const [glowArray, setGlowArray] = useState({ message: '', name: '' })
// //
// //   const { user, msgAlert } = props
// //
// //   useEffect(() => {
// //     indexGlows(user)
// //       .then(response => {
// //         setGlowArray(response.data.glows)
// //       })
// //       .then(() => {
// //         msgAlert({
// //           heading: 'Index Glows Success',
// //           message: 'See all the glows on this board!',
// //           variant: 'success'
// //         })
// //       })
// //       .catch(error => {
// //         msgAlert({
// //           heading: 'Index Glows Failed with error: ' + error.message,
// //           message: messages.indexGlowsFailure,
// //           variant: 'danger'
// //         })
// //       })
// //   }, [])
//   if (!glowArray) {
//     return (
//       'Loading...'
//     )
//   } else if (glowArray.length === 0) {
//     return (
//       'No Glows to display yet'
//     )
//   } else {
//     return (
//       <div className="index-glows-container">
//         {glowArray.map(glow => (
//           <div
//             onClick={() => {
//               console.log(glow)
//             }}
//             className="index-glow-detail"
//             key={glow.id}
//           >
//             <p>{glow.message}</p>
//             <p>{glow.name}</p>
//             <Link to={`/glows/${glow.id}`}>See More</Link>
//           </div>
//         ))}
//         <div>
//           <h2>Create Glow</h2>
//           <Link to={'/glows/'}><button>Add glow</button></Link>
//
//         </div>
//       </div>
//     )
//   }
// }
//
// export default GlowIndex
