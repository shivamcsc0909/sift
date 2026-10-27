import { dishes } from '../data/restaurant'

function FeaturedMenu() {
  return (
    <section className="section" id="menu">
      <div className="section-heading">
        <span className="eyebrow">Popular picks</span>
        <h2>Featured dishes</h2>
      </div>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.name}>
            <img src={dish.image} alt={dish.name} />
            <div>
              <span>{dish.tag}</span>
              <h3>{dish.name}</h3>
              <strong>{dish.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedMenu
