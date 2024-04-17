import { useState, useEffect } from 'react'

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(url, options)
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        const resData = await res.json()
        setData(resData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      setData(false)
      setError(false)
      setLoading(false)
    }
  }, [])

  return { data, error, loading }
}
