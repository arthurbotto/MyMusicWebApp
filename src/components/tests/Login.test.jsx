import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import * as Auth from '../../api/auth'
import Login from '../Login'

// Reset localStorage per test
beforeEach(() => localStorage.clear())

vi.mock('../../api/auth', async () => {
  const actual = await vi.importActual('../../api/auth')
  return {
    ...actual,
    AuthAPI: {
      ...actual.AuthAPI,
      login: vi.fn(actual.AuthAPI.login) // spy passthrough
    }
  }
})

test('renders login form and submit disabled initially', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  const btn = screen.getByRole('button', { name: /login/i })
  expect(btn).toBeDisabled()
})

test('shows error for invalid credentials', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )

  await userEvent.type(screen.getByPlaceholderText(/email/i), 'no@user.com')
  await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpw')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))

  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
})
