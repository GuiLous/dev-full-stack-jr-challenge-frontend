/* eslint-disable camelcase */
import ptBR from 'date-fns/locale/pt-BR'
import Avatar from 'react-avatar'
import { format, formatDistanceToNow } from 'date-fns'

interface HeaderPostProps {
  nick_name: string
  bio: string
  updated_at: Date
}
export function HeaderPost({ nick_name, bio, updated_at }: HeaderPostProps) {
  const publishedDateFormatted = format(
    updated_at,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  )

  const publishedDateRelativeNow = formatDistanceToNow(updated_at, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar name={nick_name} size="60" round="10%" />

        <div className="flex flex-col">
          <strong className="leading-relaxed text-gray-100">{nick_name}</strong>
          <span className="text-sm leading-relaxed text-gray-400">{bio}</span>
        </div>
      </div>

      <time
        title={publishedDateFormatted}
        dateTime={updated_at.toISOString()}
        className="text-sm text-gray-400"
      >
        {publishedDateRelativeNow}
      </time>
    </header>
  )
}
