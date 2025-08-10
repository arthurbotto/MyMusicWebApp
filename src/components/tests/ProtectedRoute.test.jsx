import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import * as Auth from '../../api/auth'

beforeEach(() => localStorage.clear())

test('redirects to /login if not authenticated', () => {
  vi.spyOn(Auth, 'AuthAPI', 'get').mockReturnValue({
    me: () => null
  })

  render(
    <MemoryRouter initialEntries={['/main']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <div>Main Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText(/login page/i)).toBeInTheDocument()
})

test('renders children when authenticated', () => {
  vi.spyOn(Auth, 'AuthAPI', 'get').mockReturnValue({
    me: () => ({ username: 'Arthur' })
  })

  render(
    <MemoryRouter initialEntries={['/main']}>
      <Routes>
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <div>Main Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText(/main page/i)).toBeInTheDocument()
})