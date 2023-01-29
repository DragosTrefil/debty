import { useEffect } from "react"
import { useState } from "react"
import {projectAuth} from "../firebase/config"
import {useAuthContext} from "./useAuthContext"




export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()


    const login = async(email,password) => {

        setError(null)
        setIsPending(true)


        //sign user out
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email,password)

            //dispatch logout event
            dispatch({type: 'LOG_IN', payload: res.user})


            //update state
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


    return {login, isPending, error}
}

