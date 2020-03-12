import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Transactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: []

    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/transactions`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ transactions: res.data.movies }))
      .catch(console.error)
  }

  render () {
    const transactions = this.state.transactions.map(transaction => (
      <li key={transaction.id}>
        <Link to={`/transactions/${Transactions._id}`}>{transaction.payment}</Link>
      </li>
    ))

    return (
      <div>
        <h4>Transactions</h4>
        <ul>
          {transactions}
        </ul>
      </div>
    )
  }
}

export default Transactions
