import { Navigate } from 'react-router-dom'
import { AuthAPI } from '../api/auth'

export default function ProtectedRoute({ children }) {
  const user = AuthAPI.me()
  return user ? children : <Navigate to="/login" replace />
}