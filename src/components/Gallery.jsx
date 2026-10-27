import { gallery } from '../data/restaurant'

function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading">
        <span className="eyebrow">Ambience</span>
        <h2>Food and moments</h2>
      </div>
      <div className="gallery-grid">
        {gallery.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.tag}</span>
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Gallery
