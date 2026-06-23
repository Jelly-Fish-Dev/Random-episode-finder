import { useState, useEffect, useCallback } from 'react'
import type { TVShowDetails, Episode } from '../types/tmdb'
import { useTMDB } from './useTMDB'

export function useShowLoader() {
  const [selectedShow, setSelectedShow] = useState<TVShowDetails | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(false)
  const { getShowDetails, getSeasonDetails } = useTMDB()

  const loadShow = useCallback(async (showId: number) => {
    setLoading(true)
    setEpisodes([])
    setSelectedShow(null)

    const details = await getShowDetails(showId)
    if (!details) { setLoading(false); return }
    setSelectedShow(details)

    const seasonNumbers = details.seasons
      .filter((s) => s.season_number > 0)
      .map((s) => s.season_number)

    const seasonData = await Promise.all(
      seasonNumbers.map((n) => getSeasonDetails(showId, n))
    )

    setEpisodes(seasonData.filter(Boolean).flatMap((s) => s!.episodes))
    setLoading(false)
  }, [getShowDetails, getSeasonDetails])

  useEffect(() => {
    const handlePopState = () => {
      const id = new URLSearchParams(window.location.search).get('show')
      if (id) {
        loadShow(Number(id))
      } else {
        setSelectedShow(null)
        setEpisodes([])
      }
    }
    window.addEventListener('popstate', handlePopState)
    handlePopState()
    return () => window.removeEventListener('popstate', handlePopState)
  }, [loadShow])

  return { selectedShow, episodes, loading, loadShow }
}
