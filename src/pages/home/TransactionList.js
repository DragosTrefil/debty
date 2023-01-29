import React from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import  {TransactionTotals}  from './TransactionTotals'
//styles
import styles from './Home.module.css'
import { useState } from 'react'




export default function TransactionList({transactions}) {
  const {deleteDocument, response} = useFirestore('transactions')
  //const [amount, name] = transactions
  let [totalAmount, setTotalAmount] = useState(0)
  //let [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)
  let [transOnHold, setTransOnHold] = useState([])

/*   const deleteTrans = (arr, id) => {
    return arr.filter(obj => obj.id !== id)
    
}
 */
const idAlreadyInList = new Error('id already in list')
const idNotInList = new Error('id not in list')

/* const deleteTrans = (data) => {
   
} */

//console.log(transactions)
/* const handleDeleteFromHold = (array, id) => {
  if(transOnHold.indexOf(id) === id){   
    setTransOnHold(transOnHold.filter((t) =>t.id !== id))                               
   }
   const index = array.indexOf(id)
   array.splice(index, 1)
   setTotalAmount(Math.round(totalAmount -= Number(amount))) 
   setError(false)
   console.log(array)
} */

/* const handleAddtoHold = (id) => {
  if (!transOnHold.includes(id)) {
    setTransOnHold(transOnHold =>[...transOnHold, id])
    setTotalAmount(Math.round(totalAmount += Number(amount)))
    setError(false)
    console.log(transOnHold)
  }
} */

  return (
    <>
    <ul className={styles.transactions}>
        {transactions.map((transaction) => (
            <li key={transaction.id}>
                <p className={styles.name}>{transaction.name}</p>
                <p className={styles.amount}>{transaction.amount}€</p>
                <div className={styles.btnlist}>
                <button className={styles.button} onClick={() => deleteDocument(transaction.id)}>x</button>
                <button className={styles.button}
                disabled={transOnHold.includes(transaction.id)} 
                onClick={() => {
                  if (!transOnHold.includes(transaction.id)) {
                  setTransOnHold(transOnHold =>[...transOnHold, transaction.id])
                  setTotalAmount(Math.round(totalAmount += Number(transaction.amount)))
                  setError(false)
                  console.log(transOnHold)
                }}}
                
                >+</button>
               
                <button className={styles.button}
                disabled={totalAmount <= 0 || !transOnHold.includes(transaction.id) }
                 onClick={() => {
                  
                  const index = transOnHold.indexOf(transaction.id)
                  transOnHold.splice(index,1)
                  setTotalAmount(Math.round(totalAmount -= Number(transaction.amount))) 
                  setError(false)
                  console.log(transOnHold)
                 }
                  }

                 >-</button>
                </div>
            </li>
            
        ))}
    </ul>

    <div style={{  margin: '0, auto 20px',
            display:'block,',
            color: '#fff',
            padding: '20px',
            background: '#1f9751',
            borderRadius: '10px',
            width: '50%',
            marginLeft: '200px',
            textAlign: 'center',
            }}>
        
        
        
        <h3>Transaction Amount</h3>
        <span>TOTAL: {totalAmount} €</span>
        <br/>
        
        <button style={{
          
          color: '#fff',
          border: '2px solid #fff',
          padding: '6px, 12px',
          backgroundColor: 'transparent',
          fontSize: '1em',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          width: '50%',
          alignContent: 'center',
          marginLeft: '70px'
         
        }} onClick={() => {
          setTotalAmount(0)
          setTransOnHold([])
        }}>Reset</button>
        
        { error && <p>Transaction already removed</p>}
        
        
        
        
        </div>            

    
 </>
  )
}
