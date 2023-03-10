import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

import TransactionTotals from './TransactionTotals'



export default function TransactionForm({uid}) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const {addDocument, response} = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount
        })
    }

    useEffect(() => {
        if(response.success) {
            setName('')
            setAmount('')
        }
    },[response.success])


  return (
    <div>
      <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
            <span>Transaction name: </span>
            <input
             type="text"
             required
             onChange={(e) => setName(e.target.value)}
             value={name}
             />
        </label>

        <label>
            <span>Amount €: </span>
            <input type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
             />
        </label>
        <button>Submit Transaction</button>
      </form>
      
      </>
    </div>
  )
}
