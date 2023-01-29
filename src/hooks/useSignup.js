import { useEffect } from "react"
import { useState } from "react"
import { projectAuth } from "../firebase/config.js"
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, username) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            

            if(!res) {
                throw new Error('signup failed')
            }

            // attach username to user
            await res.user.updateProfile({displayName: username})

            //dispatch login action
            dispatch({type: 'LOG_IN', payload: res.user})

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        }catch(err) {
            if (!isCancelled) {
             console.log(err)
             setError(err.message)
             setIsPending(false)
             }
         }
        
        
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    },[])


   return  {error,isPending,signup}
}