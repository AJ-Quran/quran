import { useEffect, useState } from 'react'

export default function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    document.title = title
  }, [title])

  return [title, setTitle]
}
