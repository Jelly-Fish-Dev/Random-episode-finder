import { useState, useCallback } from 'react'
import type { ShowSearchResponse, TVShowDetails, SeasonDetails } from '../types/tmdb'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string

async function apiFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`)
  const data = await res.json() as T
  console.log(path, data)
  return data
}

export function useTMDB() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchShows = useCallback(async (query: string): Promise<ShowSearchResponse | null> => {
    if (!query.trim()) return null
    setLoading(true)
    setError(null)
    try {
      return await apiFetch<ShowSearchResponse>('/search/tv', { query })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getShowDetails = useCallback(async (showId: number): Promise<TVShowDetails | null> => {
    setLoading(true)
    setError(null)
    try {
      return await apiFetch<TVShowDetails>(`/tv/${showId}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load show')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getSeasonDetails = useCallback(async (showId: number, seasonNumber: number): Promise<SeasonDetails | null> => {
    setLoading(true)
    setError(null)
    try {
      return await apiFetch<SeasonDetails>(`/tv/${showId}/season/${seasonNumber}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load season')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { searchShows, getShowDetails, getSeasonDetails, loading, error }
}

export const posterUrl = (path: string | null, size = 'w342') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null
