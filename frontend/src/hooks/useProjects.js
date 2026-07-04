import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'

function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProjects()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.$values ?? [])
        setProjects(data)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}

export default useProjects
