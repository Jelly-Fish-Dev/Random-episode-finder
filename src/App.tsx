import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchDropdown } from './components/SearchDropdown'
import { EpisodeTable } from './components/EpisodeTable'
import { useSearch } from './hooks/useSearch'
import { useShowLoader } from './hooks/useShowLoader'
import type { TVShow } from './types/tmdb'

function App() {
  const { query, setQuery, results, dropdownOpen, setDropdownOpen, loading, error } = useSearch()
  const { selectedShow, episodes, loading: episodesLoading, loadShow } = useShowLoader()

  const handleShowSelect = (show: TVShow) => {
    setDropdownOpen(false)
    setQuery('')
    history.pushState({}, '', `?show=${show.id}`)
    loadShow(show.id)
  }

  return (
    <div>
      <h1>Random Episode Finder</h1>

      {!selectedShow && (
        <div className="search-wrapper">
          <SearchBar
            value={query}
            placeholder="Search for a show..."
            searchHandler={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          />
          {dropdownOpen && results.length > 0 && (
            <SearchDropdown results={results} onSelect={handleShowSelect} />
          )}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {selectedShow && (
        <div>
          <button onClick={() => history.back()}>← Back</button>
          <h2>{selectedShow.name}</h2>
          {episodesLoading && <p>Loading episodes...</p>}
          {episodes.length > 0 && <EpisodeTable episodes={episodes} />}
        </div>
      )}
    </div>
  )
}

export default App
