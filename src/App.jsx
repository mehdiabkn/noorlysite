import { useEffect, useState } from 'react'
import './App.css'

// Fonction pour tracker les événements
const trackEvent = async (action) => {
  try {
    await fetch('http://localhost:3001/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action })
    })
  } catch (error) {
    console.error('Erreur tracking:', error)
  }
}

function App() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const reviews = [
    { text: "Sans Noorly c'est triste mais je ne lis presque jamais le Coran", author: "Leila B." },
    { text: "Ça permet de lire beaucoup sans s'en rendre compte Barakallahufikum", author: "Mariam A." },
    { text: "Super pratique pour sauvegarder son avancement sur sa lecture du coran", author: "Selma A." },
    { text: "Top le widget pour les noms d'Allah", author: "Assia Z." }
  ]

  useEffect(() => {
    // Tracker la visite de la page
    trackEvent('page_visit')

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const emailBody = `Bonjour,

Je suis intéressé(e) par une collaboration en tant qu'expert TikTok pour Noorly.

Le.s compte.s sur lesquels j'ai fait des vues:
-

Mon numéro de téléphone:

Merci !`

  const mailtoLink = `mailto:noorly.app@outlook.fr?subject=${encodeURIComponent('Expert TikTok - Candidature')}&body=${encodeURIComponent(emailBody)}`

  const copyEmail = () => {
    navigator.clipboard.writeText('noorly.app@outlook.fr')
    setEmailCopied(true)
    trackEvent('copy_email')
    setTimeout(() => setEmailCopied(false), 2000)
  }

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
        onClick={() => trackEvent('click_commencer')}
      >
        <svg className="apple-icon" viewBox="0 0 24 24" fill="white">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        Commencer
      </a>

      {/* Bouton experts TikTok */}
      <button
        onClick={() => {
          trackEvent('click_expert_tiktok')
          setIsModalOpen(true)
        }}
        className="expert-button"
      >
        On recherche des experts TikTok, c'est ton cas ?
      </button>

      {/* Modale TikTok */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>

            <h2 className="modal-title">On recherche des pros de TikTok </h2>

            <div className="modal-body">
              <div className="modal-section">
                <h3>📋 Ce qu'on recherche</h3>
                <p>Des créateurs de contenu TikTok, <strong>pas de nombre d'abonnés minimal</strong>, juste du bon contenu !</p>
              </div>

              <div className="modal-section">
                <h3>💰 Rémunération</h3>
                <p>Environ <strong>1€ par 1000 vues</strong></p>
                <p className="modal-limit">Limité à 100€ par jour</p>
              </div>

              <div className="modal-section">
                <h3>💳 Paiement</h3>
                <p>PayPal ou virement bancaire</p>
              </div>

              <div className="modal-section modal-cta">
                <h3>📧 Pour postuler</h3>
                <p>Donne-nous quelques comptes TikTok sur lesquels tu as bien chiffré, laisse-nous ton tel et on revient vers toi !</p>
                <a
                  href={mailtoLink}
                  className="modal-apply-button"
                  onClick={() => trackEvent('click_postuler')}
                >
                  Postuler maintenant
                </a>

                <div className="email-copy-section">
                  <p className="email-copy-text">Ou contacte-nous par email :</p>
                  <div className="email-display">
                    <span className="email-address">noorly.app@outlook.fr</span>
                    <button
                      className="copy-button"
                      onClick={copyEmail}
                    >
                      {emailCopied ? '✓ Copié !' : '📋 Copier'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
