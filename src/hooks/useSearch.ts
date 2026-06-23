import { useState, useEffect } from 'react'
import type { TVShow } from '../types/tmdb'
import { useTMDB } from './useTMDB'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TVShow[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { searchShows, loading, error } = useTMDB()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      const data = await searchShows(query)
      if (data) {
        setResults(data.results)
        setDropdownOpen(true)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [query, searchShows])

  return { query, setQuery, results, dropdownOpen, setDropdownOpen, loading, error }
}
