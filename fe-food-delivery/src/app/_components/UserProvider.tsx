'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type UserData = {
  userId: string
}
type AunthContextType = {
  user: UserData | null
  tokenChecker: (_token: string) => Promise<void>
}

export const AuthContex = createContext<AunthContextType>(
  {} as AunthContextType
)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post(
        'https://fooddelivery-2r6v.onrender.com/verify',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUser({ userId: response.data.destructToken.userId })
    } catch (err) {
      //   router.push('/login')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      tokenChecker(token)
    } else {
      //   router.push('/login')
    }
  }, [])
  return (
    <AuthContex.Provider value={{ user, tokenChecker }}>
      {children}
    </AuthContex.Provider>
  )
}
export const useAuth = () => useContext<AunthContextType>(AuthContex)
