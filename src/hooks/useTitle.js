import { useEffect, useState } from 'react'

function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    document.title = title
  }, [title])

  return [title, setTitle]
}

export default useTitle
