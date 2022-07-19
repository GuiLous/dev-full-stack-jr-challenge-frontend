/* eslint-disable camelcase */
import { createContext, ReactNode, useEffect, useState } from 'react'

import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '../services/apiClient'

type User = {
  email: string
  nick_name: string
  bio: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credential: SignInCredentials) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
  loggedUser: User | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  authChannel.postMessage('signOut')

  Router.reload()
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedUser, setLoggedUser] = useState<User>()
  const isAuthenticated = !!loggedUser

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          authChannel.close()
          window.location.replace('http://localhost:3000/')
          break
        case 'signIn':
          window.location.replace('http://localhost:3000/feed')
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get(`/users/profile`)
        .then((response) => {
          const { email, nick_name, bio } = response.data
          setLoggedUser({ email, nick_name, bio })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })

      const { token, refresh_token, user } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setCookie(undefined, 'nextauth.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      setLoggedUser({
        email: user?.email,
        nick_name: user?.nick_name,
        bio: user?.bio,
      })

      // eslint-disable-next-line dot-notation
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      authChannel.postMessage('signIn')
      Router.push('/feed')
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signOut, loggedUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
