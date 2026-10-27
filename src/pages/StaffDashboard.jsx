import { preorderQueue, staffBookings, staffStats, tableStatus } from '../data/restaurant'

function StaffDashboard() {
  return (
    <main className="staff-dashboard">
      <header className="staff-header">
        <div>
          <span className="eyebrow">Floor team</span>
          <h1>Staff dashboard</h1>
          <p>Track today&apos;s bookings, table readiness, and starter preorders from one place.</p>
        </div>
        <a className="secondary-button" href="/staff-login">
          Logout
        </a>
      </header>

      <section className="staff-stat-grid">
        {staffStats.map((stat) => (
          <article className={`staff-stat-card ${stat.tone}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="staff-dashboard-grid">
        <article className="staff-panel bookings-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Service list</span>
              <h2>Today&apos;s bookings</h2>
            </div>
            <button type="button">Filter</button>
          </div>

          <div className="booking-table">
            <div className="booking-table-head">
              <span>Guest</span>
              <span>Time</span>
              <span>Table</span>
              <span>Status</span>
            </div>
            {staffBookings.map((booking) => (
              <div className="booking-table-row" key={`${booking.guest}-${booking.time}`}>
                <div>
                  <strong>{booking.guest}</strong>
                  <small>
                    {booking.guests} guests · {booking.seating}
                  </small>
                  <small>{booking.phone}</small>
                </div>
                <span>{booking.time}</span>
                <span>{booking.table}</span>
                <em className={`status-pill ${booking.status.toLowerCase().replace(' ', '-')}`}>
                  {booking.status}
                </em>
              </div>
            ))}
          </div>
        </article>

        <aside className="staff-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Tables</span>
              <h2>Table status</h2>
            </div>
          </div>
          <div className="table-status-grid">
            {tableStatus.map((table) => (
              <div className={`table-status-card ${table.status.toLowerCase()}`} key={table.table}>
                <strong>{table.table}</strong>
                <span>{table.seats} seats</span>
                <em>{table.status}</em>
              </div>
            ))}
          </div>
        </aside>

        <article className="staff-panel preorder-panel-dashboard">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Kitchen queue</span>
              <h2>Starter preorders</h2>
            </div>
          </div>
          <div className="queue-list">
            {preorderQueue.map((order) => (
              <div className="queue-item" key={`${order.guest}-${order.item}`}>
                <div>
                  <strong>{order.item}</strong>
                  <span>{order.guest} · {order.time}</span>
                </div>
                <em className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</em>
              </div>
            ))}
          </div>
        </article>

        <aside className="staff-panel timeline-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Next up</span>
              <h2>Upcoming timeline</h2>
            </div>
          </div>
          <ol className="timeline-list">
            <li>
              <strong>7:30 PM</strong>
              <span>Priya Nair arrival · Window side</span>
            </li>
            <li>
              <strong>8:15 PM</strong>
              <span>Kabir Sharma group · Prepare T-12</span>
            </li>
            <li>
              <strong>9:00 PM</strong>
              <span>Ritika Jain · Outdoor seating hold</span>
            </li>
          </ol>
        </aside>
      </section>
    </main>
  )
}

export default StaffDashboard
