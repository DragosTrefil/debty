import styles from './NavBar.module.css';
import {Link} from 'react-router-dom'
import React from 'react'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function NavBar() {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}>Debty</li>
            {!user && (
              <>
              <li><Link to="/login">Log-In</Link></li>
              <li><Link to="/signup">Sign-Up</Link></li>
              </>
            )}

            {user && (
              <>
              <li>hello, {user.displayName}</li>
              <li><button className="btn" onClick={logout}>Log-Out</button></li>
              </>
            )}  
        </ul>
    </nav>
  )
}
