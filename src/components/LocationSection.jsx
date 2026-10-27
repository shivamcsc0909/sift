function LocationSection() {
  return (
    <section className="section location-section" id="location">
      <div className="section-heading">
        <span className="eyebrow">Find us</span>
        <h2>Easy to reach in Gwalior</h2>
        <p>Real Google Maps location for the demo restaurant, with nearby landmarks and daily dining hours.</p>
      </div>
      <div className="location-layout">
        <div className="map-card real-map-card" aria-label="Google Map for Masala Table Gwalior">
          <iframe
            title="Masala Table Gwalior Google Map"
            src="https://www.google.com/maps?q=Jiwaji%20Ganj%20Gwalior%20Madhya%20Pradesh&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="location-details-card">
          <h3>Masala Table, Gwalior</h3>
          <p>Jiwaji Ganj, Gwalior, Madhya Pradesh 474001</p>
          <div className="location-chips">
            <span>Near Jiwaji Ganj</span>
            <span>Valet parking</span>
            <span>Family seating</span>
          </div>
          <div className="hours-list">
            <span>Lunch: 11:30 AM - 3:30 PM</span>
            <span>Dinner: 7:00 PM - 11:00 PM</span>
            <span>Phone: +91 98765 43210</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
