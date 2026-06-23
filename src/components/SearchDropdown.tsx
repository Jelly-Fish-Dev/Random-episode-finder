import type { TVShow } from '../types/tmdb'
import { posterUrl } from '../hooks/useTMDB'

interface Props {
  results: TVShow[]
  onSelect: (show: TVShow) => void
}

const year = (dateStr: string) => dateStr?.slice(0, 4) ?? '—'

export function SearchDropdown({ results, onSelect }: Props) {
  return (
    <div className="search-dropdown">
      {results.map((show) => (
        <div
          key={show.id}
          className="search-dropdown-item"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(show)}
        >
          {show.poster_path
            ? <img src={posterUrl(show.poster_path, 'w92')!} alt={show.name} />
            : <div className="poster-placeholder" />}
          <div className="show-info">
            <span className="show-name">{show.name}</span>
            <span className="show-year">{year(show.first_air_date)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
