import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'

function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}

export default useProjects
