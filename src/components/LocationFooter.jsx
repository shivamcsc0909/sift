function LocationFooter() {
  return (
    <footer className="footer" id="footer-location">
      <div className="footer-brand-block">
        <a className="brand footer-brand" href="/#home" aria-label="Masala Table home">
          <span>MT</span>
          Masala Table
        </a>
        <p>Indian dining and table reservations for family dinners, office lunches, and weekend plans.</p>
        <small>Demo restaurant booking system. Static data only.</small>
      </div>

      <div className="footer-column">
        <span className="eyebrow">Visit</span>
        <h3>Gwalior</h3>
        <p>Jiwaji Ganj, Gwalior, Madhya Pradesh 474001</p>
        <a href="/#location">View location</a>
      </div>

      <div className="footer-column">
        <span className="eyebrow">Contact</span>
        <h3>Reservations</h3>
        <p>Phone: +91 98765 43210</p>
        <p>Email: hello@masalatable.in</p>
        <p>WhatsApp: +91 98765 43210</p>
      </div>

      <div className="footer-column">
        <span className="eyebrow">Hours</span>
        <h3>Open daily</h3>
        <p>Lunch: 11:30 AM - 3:30 PM</p>
        <p>Dinner: 7:00 PM - 11:00 PM</p>
        <p>Preorder closes 30 min before arrival.</p>
      </div>

      <div className="footer-column">
        <span className="eyebrow">Links</span>
        <h3>Explore</h3>
        <a href="/#booking">Book Table</a>
        <a href="/#menu">Menu</a>
        <a href="/#gallery">Gallery</a>
        <a href="/staff-login">Staff Login</a>
        <a href="/manager-login">Manager Login</a>
      </div>

      <div className="footer-credit">
        <span>Developed by</span>
        <a href="https://nexvoratech.com/" target="_blank" rel="noreferrer">
          Nexvora Tech
        </a>
      </div>
    </footer>
  )
}

export default LocationFooter
