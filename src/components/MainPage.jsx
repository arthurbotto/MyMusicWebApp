import { AuthAPI } from '../api/auth'

export default function MainPage() {
  const user = AuthAPI.me()
  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <section>
        <h2>Your Library</h2>
        <p>No songs yet — add some soon!</p>
      </section>
    </div>
  )
}