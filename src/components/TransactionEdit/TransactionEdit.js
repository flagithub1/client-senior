import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import TransactionForm from './../TransactionForm/TransactionForm'

class TransactionEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      transaction: {
        payment: '',
        pickup: '',
        dropoff: ''
      },
      updated: false
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

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedTransaction = Object.assign(this.state.transaction, updatedField)

    this.setState({ transaction: editedTransaction })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/transactions/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { transaction: this.state.transaction },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { transaction, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/transactions/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <TransactionForm
          transaction={transaction}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/transactions/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default TransactionEdit
