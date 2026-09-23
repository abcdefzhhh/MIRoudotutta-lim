import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('siperpus_admin_token') || null
  })

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('siperpus_admin_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return null
  })

  // Configure Axios default header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username,
        password,
      })

      const { data } = response
      if (data.success && data.user) {
        // Enforce role boundary: only admin_web allowed on web admin panel
        if (data.user.role !== 'admin_web') {
          return {
            success: false,
            message: 'Akses ditolak. Akun pustakawan khusus digunakan pada aplikasi Mobile SIPERPUS.',
          }
        }

        const authToken = data.access_token
        const authUser = data.user

        setToken(authToken)
        setUser(authUser)

        localStorage.setItem('siperpus_admin_token', authToken)
        localStorage.setItem('siperpus_admin_user', JSON.stringify(authUser))

        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

        return { success: true, message: data.message || 'Login berhasil.' }
      }

      return {
        success: false,
        message: data.message || 'Kredensial tidak valid.',
      }
    } catch (error) {
      console.error('Login error:', error)
      const msg =
        error.response?.data?.errors?.username?.[0] ||
        error.response?.data?.message ||
        'Gagal login. Pastikan server backend aktif dan data akun benar.'
      return {
        success: false,
        message: msg,
      }
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout')
      }
    } catch (err) {
      console.warn('Logout API error:', err)
    } finally {
      setToken(null)
      setUser(null)
      localStorage.removeItem('siperpus_admin_token')
      localStorage.removeItem('siperpus_admin_user')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const isAuthenticated = Boolean(token && user && user.role === 'admin_web')

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
