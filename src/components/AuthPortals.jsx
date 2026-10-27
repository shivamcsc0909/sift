import { dashboardStats } from '../data/restaurant'

function LoginCard({ type, title, description, fields }) {
  return (
    <article className="login-card">
      <div>
        <span className="eyebrow">{type}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          <input name={field.name} type={field.type} placeholder={field.placeholder} />
        </label>
      ))}
      <a className="primary-button" href={type === 'Staff portal' ? '/staff-login' : '/manager-login'}>
        Open login page
      </a>
    </article>
  )
}

function AuthPortals() {
  return (
    <section className="section portals-section" id="login">
      <div className="section-heading">
        <span className="eyebrow">Restaurant access</span>
        <h2>Staff and admin login</h2>
        <p>
          Demo login screens for restaurant teams to manage table status, preorder preparation, and daily booking flow.
        </p>
      </div>

      <div className="portal-layout">
        <LoginCard
          type="Staff portal"
          title="Floor team login"
          description="For hosts and service staff checking arrivals, table readiness, and preorder notes."
          fields={[
            { name: 'staffId', label: 'Staff ID', type: 'text', placeholder: 'STAFF-102' },
            { name: 'staffPin', label: 'PIN', type: 'password', placeholder: 'Enter PIN' },
          ]}
        />
        <LoginCard
          type="Admin portal"
          title="Manager login"
          description="For managers reviewing bookings, revenue, menu visibility, and staff assignments."
          fields={[
            { name: 'adminEmail', label: 'Email', type: 'email', placeholder: 'manager@masalatable.in' },
            { name: 'adminPassword', label: 'Password', type: 'password', placeholder: 'Enter password' },
          ]}
        />

        <aside className="dashboard-preview">
          <span className="eyebrow">Live demo snapshot</span>
          <h3>Today at Masala Table</h3>
          <div className="stat-grid">
            {dashboardStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <ul>
            <li>7:00 PM - Sharma family - Window side - Starter platter</li>
            <li>8:15 PM - Priya Nair - Family area - Veg thali</li>
            <li>9:00 PM - Walk-in hold - Outdoor seating</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default AuthPortals
