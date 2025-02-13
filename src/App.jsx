import { useState } from 'react'

export default function PollyGlot(){
  const [text, setText] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [translationText, setTranslationText] = useState('')
  const [showTranslation, setShowTranslation] = useState(false)

  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleTranslation = async () => {
    const data = `${selectedLanguage} ${text}`
    await fetchTranslation(data)
    setShowTranslation(true)
  }

  const handleRestart = (event) => {
    setShowTranslation(false)
    setText('')
  }

  async function fetchTranslation(data) {
    const messages = [
      {
        role: "user",
        content: data
      }
    ]

    try {
      const url = 'https://claude-api-worker.claude-api-worker.workers.dev/'

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages)
      })

      const data = await response.json()

      setTranslationText(data);

    } catch (error) {
      console.error('Translation error:', error);
      setTranslationText('Translation failed. Please try again.');
    }
  }

  return (
    <main>
      <header>
        <img className="header-background" src="/assets/worldmap.png" />
        <div className="logo">
          <img src="/assets/parrot.png" />
          <div className="logo-text">
            <h1>PollyGlot</h1>
            <p>Perfect Translation Every Time</p>
          </div>
        </div>
      </header>
      <section className="translate">
        <div className="input-text">
          <h1>Text to Translate 👇</h1>
          <textarea 
            className="input-textarea" 
            value={text} 
            onChange={handleTextChange}
            placeholder="Enter text to translate..."
          />
        </div>
        {!showTranslation && (
          <div className="language-selector">
            <h1>Select Language 👇</h1>
            <div className="language-group">
              <div className="language-option">
                <input 
                  type="radio" 
                  id="spanish" 
                  name="language" 
                  value="Spanish" 
                  checked={selectedLanguage === 'Spanish'} 
                  onChange={handleLanguageChange}
                />
                <label htmlFor="spanish">Spanish 🇪🇸</label>
              </div>
              <div className="language-option">
                <input 
                  type="radio" 
                  id="french" 
                  name="language" 
                  value="French" 
                  checked={selectedLanguage === 'French'} 
                  onChange={handleLanguageChange}
                />
                <label htmlFor="french">French 🇫🇷</label>
              </div>
              <div className="language-option">
                <input 
                  type="radio" 
                  id="japanese" 
                  name="language" 
                  value="Japanese" 
                  checked={selectedLanguage === 'Japanese'} 
                  onChange={handleLanguageChange}
                />
                <label htmlFor="japanese">Japanese 🇯🇵</label>
              </div>
            </div>
            <button 
              className="translate-button" 
              onClick={handleTranslation}
              disabled={!text || !selectedLanguage}
            >
            Translate
            </button>
          </div>
        )}
        {showTranslation && (
          <div className="translation">
            <h1>Your Translation 👇</h1>
            <textarea 
            className="input-textarea" 
            value={translationText} 
            readOnly
          />
          <button
            className="start-over-button"
            onClick={handleRestart}
          >
            Start Over
          </button>
          </div>
        )} 
      </section>
    </main>
  )
}


