import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Home from '../Home/Home'
// import TransactionForm from '../TransactionForm/TransactionForm'
import Transactions from '../Transactions/Transactions'
import Transaction from '../Transaction/Transaction'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import TransactionEdit from './../TransactionEdit/TransactionEdit'
import TransactionCreate from './../TransactionCreate/TransactionCreate'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

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

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
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
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/transactions' render={() => (
            <Transactions user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute exact user={user} path='/transactions/:id' render={({ match }) => (
            <Transaction user={user} msgAlert={this.msgAlert} match={match} />
          )} />
          <AuthenticatedRoute exact user={user} path='/transactions-create' render={() => (
            <TransactionCreate user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute exact user={user} path='/transactions/:id/edit' render={({ match }) => (
            <TransactionEdit user={user} msgAlert={this.msgAlert} match={match} />
          )} />
          <Route exact path="/" component={Home} />

        </main>
      </Fragment>
    )
  }
}

export default App
