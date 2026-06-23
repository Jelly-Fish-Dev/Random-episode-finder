export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  popularity: number
  genre_ids: number[]
}

export interface ShowSearchResponse {
  page: number
  results: TVShow[]
  total_pages: number
  total_results: number
}

export interface SeasonSummary {
  id: number
  name: string
  season_number: number
  episode_count: number
  air_date: string | null
  poster_path: string | null
  overview: string
}

export interface TVShowDetails extends TVShow {
  number_of_seasons: number
  number_of_episodes: number
  seasons: SeasonSummary[]
  last_air_date: string | null
}

export interface Episode {
  id: number
  name: string
  episode_number: number
  season_number: number
  overview: string
  still_path: string | null
  air_date: string | null
  runtime: number | null
  vote_average: number
}

export interface SeasonDetails {
  id: number
  name: string
  season_number: number
  air_date: string | null
  overview: string
  poster_path: string | null
  episodes: Episode[]
}
