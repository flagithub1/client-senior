import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class Transaction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transaction: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/transactions/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ transaction: res.data.transaction }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/transactions/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { transaction, deleted } = this.state

    if (!transaction) {
      return <p></p>
    }

    if (deleted) {
      return <Redirect to={

        { pathname: '/', state: { msg: 'Transaction succesfully deleted!' } }
      } />
    }
    return (
      <div>
        <h4>{transaction.payment}</h4>
        <p>Picked up: {transaction.pickup}</p>
        <p>Dropped off: {transaction.dropoff}</p>
        <button onClick={this.destroy}>Delete Transaction</button>
        <Link to={`/transactions/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/transactions">Here are all your transactions</Link>
      </div>
    )
  }
}

export default Transaction
