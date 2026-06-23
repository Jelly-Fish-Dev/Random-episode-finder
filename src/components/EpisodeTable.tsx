import type { Episode } from '../types/tmdb'
import { posterUrl } from '../hooks/useTMDB'

interface Props {
  episodes: Episode[]
}

const episodeCode = (season: number, episode: number) =>
  `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`

export function EpisodeTable({ episodes }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Episode</th>
          <th>Screenshot</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((ep) => (
          <tr key={ep.id}>
            <td>{episodeCode(ep.season_number, ep.episode_number)}</td>
            <td>
              {ep.still_path
                ? <img src={posterUrl(ep.still_path, 'w300')!} alt={ep.name} width={150} />
                : '—'}
            </td>
            <td>{ep.name}</td>
            <td>{ep.overview || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
