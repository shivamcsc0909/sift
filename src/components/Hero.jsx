function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Open today - 11:30 AM to 11:00 PM</span>
        <h1>Reserve a warm Indian dining experience in minutes.</h1>
        <p>
          Pick your date, choose a table, and enjoy regional favourites prepared
          for family dinners, office lunches, and weekend celebrations in Gwalior.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#booking">
            Book a Table
          </a>
          <a className="secondary-button" href="#menu">
            View Menu
          </a>
        </div>
        <div className="trust-row" aria-label="Restaurant highlights">
          <span>4.8 rating</span>
          <span>Pure veg options</span>
          <span>UPI accepted</span>
        </div>
      </div>
      <div className="hero-media" aria-label="Indian thali served on a restaurant table">
        <img className="hero-food-image" src="/hero-thali.svg" alt="Indian thali served on a restaurant table" />
        <div className="table-glow"></div>
        <div className="hero-mini-card">
          <strong>Tonight</strong>
          <span>6 tables available after 7 PM</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
