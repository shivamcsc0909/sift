import { useState } from 'react'

const loginConfig = {
  staff: {
    eyebrow: 'Floor team access',
    title: 'Floor team login',
    description: 'Demo portal for hosts and service staff to track arrivals, table status, and preorder notes.',
    idLabel: 'Staff ID',
    idPlaceholder: 'STAFF-102',
    passwordLabel: 'PIN',
    passwordPlaceholder: '1234',
    demoId: 'STAFF-102',
    demoPassword: '1234',
    stats: ['12 arrivals due', '5 tables being cleaned', '9 preorders ready'],
  },
  manager: {
    eyebrow: 'Admin access',
    title: 'Manager login',
    description: 'Demo portal for managers to review bookings, staff assignments, revenue, and menu operations.',
    idLabel: 'Manager email',
    idPlaceholder: 'manager@masalatable.in',
    passwordLabel: 'Password',
    passwordPlaceholder: 'admin123',
    demoId: 'manager@masalatable.in',
    demoPassword: 'admin123',
    stats: ['Rs. 18,420 preorder value', '42 total bookings', '8 tables available'],
  },
}

function LoginPage({ role }) {
  const config = loginConfig[role] ?? loginConfig.staff
  const [form, setForm] = useState({ id: '', password: '' })
  const [status, setStatus] = useState('idle')

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function submitLogin(event) {
    event.preventDefault()
    if (!form.id || !form.password) {
      setStatus('error')
      return
    }

    if (role === 'staff') {
      window.location.href = '/staff-dashboard'
      return
    }

    window.location.href = '/manager-dashboard'
  }

  function fillDemoLogin() {
    setForm({ id: config.demoId, password: config.demoPassword })
    setStatus('idle')
  }

  return (
    <main className="login-page">
      <a className="back-link" href="/">
        Back to website
      </a>
      <section className="login-shell">
        <div className="login-story">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
          <div className="login-stat-list">
            {config.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>

        <form className="login-form-panel" onSubmit={submitLogin}>
          <div>
            <h2>Sign in</h2>
            <p>Use the dummy credentials button for demo access.</p>
          </div>
          <label>
            {config.idLabel}
            <input name="id" value={form.id} placeholder={config.idPlaceholder} onChange={updateForm} />
          </label>
          <label>
            {config.passwordLabel}
            <input
              name="password"
              type="password"
              value={form.password}
              placeholder={config.passwordPlaceholder}
              onChange={updateForm}
            />
          </label>
          <div className="login-actions">
            <button className="secondary-button" type="button" onClick={fillDemoLogin}>
              Use dummy login
            </button>
            <button className="primary-button" type="submit">
              Login
            </button>
          </div>
          {status === 'success' && (
            <div className="login-success">
              <strong>Login successful</strong>
              <span>This is a static demo dashboard preview.</span>
            </div>
          )}
          {status === 'error' && <p className="login-error">Enter demo credentials to continue.</p>}
        </form>
      </section>
    </main>
  )
}

export default LoginPage
