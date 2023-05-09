import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/clientApp'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectUser, setUser } from '../redux/features/AuthSlice/AuthSlice'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(setUser(null))
      }
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  return {
    user,
    isLoading,
  }
}

export default useAuth
