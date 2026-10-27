function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="/#home" aria-label="Masala Table home">
        <span>MT</span>
        Masala Table
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="/#menu">Menu</a>
        <a href="/#gallery">Gallery</a>
        <a href="/#location">Location</a>
        <a href="/staff-login">Staff</a>
        <a href="/manager-login">Manager</a>
      </nav>
      <a className="nav-cta" href="/#booking">
        Book Table
      </a>
    </header>
  )
}

export default Navbar
