import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './index.scss'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import BoardCreate from './components/CreateBoard'
import BoardIndex from './components/IndexBoard'
import BoardShow from './components/ShowBoard'
// import BoardUpdate from './components/UpdateBoard'
// import GlowCreate from './components/CreateGlow'
import GlowShow from './components/ShowGlow'
// import GlowIndex from './components/IndexGlow'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/home' render={(props) => (
            <Fragment>
              <BoardCreate {...props} msgAlert={this.msgAlert} user={user} />
              <BoardIndex {...props} msgAlert={this.msgAlert} user={user} />
            </Fragment>
          )} />
          <AuthenticatedRoute user={user} path='/boards/:id' render={(props) => {
            console.log('this is props from app.js - boardshow: ', props)
            return (
              <BoardShow {...props} msgAlert={this.msgAlert} user={user} />
            )
          }} />
          {/* }<AuthenticatedRoute user={user} path='/boards/:id/update' render={(props) => (
            <BoardUpdate {...props} msgAlert={this.msgAlert} user={user} />
          )} /> */}
          {/* }<AuthenticatedRoute user={user} path='/boards/:id/glows' render={(props) => (
            <GlowCreate {...props} msgAlert={this.msgAlert} user={user} />
          )} /> */}
          <AuthenticatedRoute user={user} path='/boards/:id/glows/:id' render={(props) => (
            <GlowShow {...props} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
