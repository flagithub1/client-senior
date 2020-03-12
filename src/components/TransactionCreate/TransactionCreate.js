import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import TransactionForm from './../TransactionForm/TransactionForm'
import apiUrl from '../../apiConfig'

class TransactionCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transaction: {
        payment: '',
        pickup: '',
        dropoff: ''
      },
      createdTransactionId: null
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedTransaction = Object.assign(this.state.Transaction, updatedField)

    this.setState({ transaction: editedTransaction })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/transactions`,
      method: 'POST',
      data: { transaction: this.state.transaction },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ createdTransactionId: res.data.transaction._id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { createdTransactionId, transaction } = this.state

    if (createdTransactionId) {
      return <Redirect to={`/transactions/${createdTransactionId}`} />
    }

    return (
      <div>
        <TransactionForm
          transaction={transaction}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </div>
    )
  }
}

export default TransactionCreate
