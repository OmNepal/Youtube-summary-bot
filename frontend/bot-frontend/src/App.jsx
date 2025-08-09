import { useMemo, useState } from 'react'
import './App.css'

function extractYoutubeId(rawUrl) {
  if (!rawUrl) return '';
  try {
    const url = new URL(rawUrl);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').split('?')[0];
    }
    if (url.hostname.includes('youtube.com')) {
      const vid = url.searchParams.get('v');
      if (vid) return vid;
      const paths = url.pathname.split('/').filter(Boolean);
      const watchIndex = paths.findIndex((p) => p === 'watch');
      if (watchIndex >= 0) return url.searchParams.get('v') || '';
      const embedIndex = paths.findIndex((p) => p === 'embed' || p === 'shorts');
      if (embedIndex >= 0 && paths[embedIndex + 1]) return paths[embedIndex + 1];
    }
    return '';
  } catch {
    return '';
  }
}

function App() {
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const videoId = useMemo(() => extractYoutubeId(url), [url])
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setSummary('')

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a valid YouTube URL.')
      return;
    }

    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: trimmed })
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail || 'Failed to get summary')
      }
      const s = (data?.summary || '').trim()
      setSummary(s)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">YouTube Summary Bot</h1>
        <p className="subtitle">Paste a YouTube link to get a concise, AI-generated summary.</p>
      </header>

      <main className="content">
        <section className="card input-card">
          <form onSubmit={handleSubmit} className="url-form">
            <label htmlFor="urlInput" className="visually-hidden">YouTube URL</label>
            <input
              id="urlInput"
              name="url"
              type="url"
              inputMode="url"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="url-input"
              aria-invalid={!!error}
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <span className="spinner" aria-hidden /> : 'Get Summary'}
            </button>
          </form>
          {error && <div className="alert" role="alert">{error}</div>}

          {videoId && (
            <div className="preview">
              <img src={thumbnailUrl} alt="Video thumbnail" className="thumbnail" />
              <div className="preview-meta">
                <a href={url} target="_blank" rel="noreferrer" className="video-link">
                  Preview video
                </a>
                <span className="video-id">ID: {videoId}</span>
              </div>
            </div>
          )}
        </section>

        <section className="card output-card">
          <div className="card-header">
            <h2>Summary</h2>
            <div className="actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handleCopy}
                disabled={!summary}
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>

          {!summary && !loading && (
            <p className="placeholder">Your summary will appear here.</p>
          )}

          {loading && (
            <div className="skeleton">
              <div className="skeleton-line" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          )}

          {summary && !loading && (
            <div className="summary-text" aria-live="polite">{summary}</div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p className="hint">
          Tip: You can paste links in formats like `youtu.be/` or `youtube.com/watch?v=`.
        </p>
      </footer>
    </div>
  )
}

export default App
