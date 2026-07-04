import { Component } from 'react'
import { Outlet } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: '2rem', color: 'red', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {String(this.state.error)}
          {'\n\n'}
          {this.state.error?.stack}
        </pre>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  )
}

export default App
