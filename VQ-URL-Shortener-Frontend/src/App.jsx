import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  const handleButtonClick = async () => {
    setIsLoading(true)
    const response = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ originalUrl: inputText }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    setApiResponse(data)
    setIsLoading(false)
  }

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="dark:bg-gray-800 p-10 min-h-screen flex flex-col items-center justify-center">
      <input
        className="input input-bordered"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <button
        className={`btn btn-primary mt-4 ${isLoading ? 'loading' : ''}`}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Submit
      </button>
      {apiResponse && (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">API Response</h2>
            <div>
              <p><a href={apiResponse.actualUrl}>{apiResponse.actualUrl}</a></p>
              <CopyToClipboard text={apiResponse.actualUrl}>
                <button>Copy to clipboard</button>
              </CopyToClipboard>
            </div>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default App