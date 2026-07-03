import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const submitContact = (data) => api.post('/contact', data)
export const getProjects = () => api.get('/projects')
export const getProjectById = (id) => api.get(`/projects/${id}`)

export default api
