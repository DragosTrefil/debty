import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';


//styles
import styles from './Signup.module.css';

import React from 'react'

export default function Signup() {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [email, setEmail] = useState('')
const {signup, isPending, error} = useSignup()


const handleSubmit = (e) => {
  e.preventDefault()
  signup(email, password,username)
}



  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>SIgn Up</h2>
      <label>
        <span>Preffered Username:</span>
        <input type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
         />
      </label>
      <label>
        <span>Email:</span>
        <input type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
       />
      </label>
      
      <label>
        <span>Password:</span>
        <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        values={password}
         />
      </label>
      {!isPending &&<button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>


  )
}
