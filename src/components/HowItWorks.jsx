const steps = [
  {
    title: 'Choose dining details',
    text: 'Guests select date, time, party size, and seating preference from a simple mobile-first form.',
  },
  {
    title: 'Preorder favourites',
    text: 'Suggested Indian dishes can be added before arrival for faster service and better kitchen planning.',
  },
  {
    title: 'Team prepares table',
    text: 'Staff and admin screens show the booking snapshot, preorder notes, and available tables.',
  },
]

function HowItWorks() {
  return (
    <section className="section steps-section">
      <div className="section-heading">
        <span className="eyebrow">Simple flow</span>
        <h2>From booking to table-ready</h2>
      </div>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
