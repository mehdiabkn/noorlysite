import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Animation séquentielle des boutons
    const buttons = document.querySelectorAll('.btn')

    buttons.forEach((button, index) => {
      button.style.opacity = '0'
      button.style.transform = 'translateY(20px)'

      setTimeout(() => {
        button.style.transition = 'all 0.5s ease'
        button.style.opacity = '1'
        button.style.transform = 'translateY(0)'
      }, 600 + (index * 100))
    })

    // Effet de clic sur les boutons
    buttons.forEach(button => {
      const handleClick = (e) => {
        const ripple = document.createElement('span')
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + 'px'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'
        ripple.classList.add('ripple')

        button.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      }

      button.addEventListener('click', handleClick)
    })
  }, [])

  return (
    <div className="container">
      <div className="card">
        {/* Icône coeur avec animation */}
        <div className="icon-wrapper">
          <div className="circle-bg"></div>
          <svg className="heart-icon" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Titre */}
        <h1 className="title">Bienvenue sur Noorly</h1>

        {/* Message */}
        <p className="subtitle">Votre voyage spirituel commence maintenant</p>

        {/* Boutons */}
        <div className="buttons-container">
          {/* Bouton App Store */}
          <a
            href="https://apps.apple.com/fr/app/noorly-coran-quotidien/id6755007429"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <svg className="apple-icon" viewBox="0 0 24 24" fill="white">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Télécharger sur l'App Store
          </a>

          {/* Bouton Email */}
          <a
            href="mailto:samy.aberkane0@gmail.com?subject=Expert%20Tiktok&body=Bonjour%2C%0A%0AJe%20suis%20int%C3%A9ress%C3%A9%20par%20l'offre.%0AVoici%20les%20comptes%20TikTok%20que%20vous%20pouvez%20consulter%20pour%20voir%20mes%20performances%3A%0A%0A"
            className="btn btn-secondary"
          >
            <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Devenir Expert TikTok
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
