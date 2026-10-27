import { reviews } from '../data/restaurant'

function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="section-heading">
        <span className="eyebrow">Guest notes</span>
        <h2>What diners say</h2>
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.name}>
            <span>★★★★★</span>
            <p>{review.text}</p>
            <strong>{review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Reviews
