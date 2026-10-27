import {
  managerStats,
  revenueBreakdown,
  staffBookings,
  staffShifts,
  tableStatus,
  topStarters,
} from '../data/restaurant'

function ManagerDashboard() {
  return (
    <main className="manager-dashboard">
      <header className="manager-header">
        <div>
          <span className="eyebrow">Admin overview</span>
          <h1>Manager dashboard</h1>
          <p>Monitor bookings, revenue, tables, starters, and staff shifts for today&apos;s service.</p>
        </div>
        <a className="secondary-button" href="/manager-login">
          Logout
        </a>
      </header>

      <section className="manager-stat-grid">
        {managerStats.map((stat) => (
          <article className="manager-stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>

      <section className="manager-grid">
        <article className="manager-panel manager-bookings-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Control center</span>
              <h2>Booking management</h2>
            </div>
            <button type="button">Export</button>
          </div>
          <div className="manager-booking-list">
            {staffBookings.map((booking) => (
              <div className="manager-booking-row" key={`${booking.guest}-${booking.time}`}>
                <div>
                  <strong>{booking.guest}</strong>
                  <span>{booking.phone}</span>
                </div>
                <span>{booking.time}</span>
                <span>{booking.guests} guests</span>
                <em className={`status-pill ${booking.status.toLowerCase().replace(' ', '-')}`}>
                  {booking.status}
                </em>
                <button type="button">Edit</button>
              </div>
            ))}
          </div>
        </article>

        <aside className="manager-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Revenue</span>
              <h2>Today&apos;s income</h2>
            </div>
          </div>
          <div className="revenue-list">
            {revenueBreakdown.map((item) => (
              <div className="revenue-item" key={item.label}>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
                <div className="revenue-bar">
                  <span style={{ width: `${item.percent}%` }}></span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <article className="manager-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Menu control</span>
              <h2>Top starter preorders</h2>
            </div>
          </div>
          <div className="top-starter-list">
            {topStarters.map((starter) => (
              <div className="top-starter-row" key={starter.item}>
                <div>
                  <strong>{starter.item}</strong>
                  <span>{starter.orders} orders</span>
                </div>
                <em>{starter.revenue}</em>
              </div>
            ))}
          </div>
        </article>

        <aside className="manager-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Staff</span>
              <h2>Shift status</h2>
            </div>
          </div>
          <div className="shift-list">
            {staffShifts.map((staff) => (
              <div className="shift-row" key={staff.name}>
                <div>
                  <strong>{staff.name}</strong>
                  <span>{staff.role} · {staff.shift}</span>
                </div>
                <em className={`status-pill ${staff.status.toLowerCase()}`}>{staff.status}</em>
              </div>
            ))}
          </div>
        </aside>

        <article className="manager-panel table-summary-panel">
          <div className="panel-title-row">
            <div>
              <span className="eyebrow">Tables</span>
              <h2>Capacity summary</h2>
            </div>
          </div>
          <div className="manager-table-strip">
            {tableStatus.map((table) => (
              <div className={`table-status-card ${table.status.toLowerCase()}`} key={table.table}>
                <strong>{table.table}</strong>
                <span>{table.seats} seats</span>
                <em>{table.status}</em>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default ManagerDashboard
