import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const reviews = [
    { text: "Sans Noorly c'est triste mais je ne lis presque jamais le Coran", author: "Leila B." },
    { text: "Ça permet de lire beaucoup sans s'en rendre compte Barakallahufikum", author: "Mariam A." },
    { text: "Super pratique pour sauvegarder son avancement sur sa lecture du coran", author: "Selma A." },
    { text: "Top le widget pour les noms d'Allah", author: "Assia Z." }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="welcome-container">
      {/* Logo Noorly en haut */}
      <h1 className="logo">Noorly</h1>

      {/* Image de couverture */}
      <div className="cover-image">
        <img src="/1024.png" alt="Noorly" className="app-icon" />
      </div>

      {/* Slogan principal */}
      <p className="main-slogan">
        Invitez la parole d'Allah sur l'écran que vous consultez le plus
      </p>

      {/* Bouton Apple noir */}
      <a
        href="https://apps.apple.com/fr/app/noorly-coran-quotidien/id6755007429"
        target="_blank"
        rel="noopener noreferrer"
        className="apple-button"
      >
        <svg className="apple-icon" viewBox="0 0 24 24" fill="white">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Commencer
      </a>

      {/* Bouton experts TikTok */}
      <a
        href="mailto:mohammed@noorly.app?subject=Expert%20TikTok%20-%20Candidature&body=Bonjour%2C%0A%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20une%20collaboration%20en%20tant%20qu'expert%20TikTok.%0A%0AMon%20profil%20TikTok%20%3A%20%0AMes%20statistiques%20%3A%20%0A%0AMerci%20!"
        className="expert-button"
      >
        On recherche des experts TikTok, c'est ton cas ?
      </a>

      {/* Section avis en bas */}
      <div className="reviews-section">
        {/* Étoiles dorées */}
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="star" viewBox="0 0 24 24" fill="#FFD700">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        {/* Avis avec transition */}
        <div className="review-carousel">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`review ${index === currentReviewIndex ? 'active' : ''}`}
            >
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">— {review.author} —</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
