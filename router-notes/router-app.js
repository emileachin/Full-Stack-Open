import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'
  
  const App = () => {
  
    const padding = {
      padding: 5
    }
  
    return (
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/notes">notes</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
  
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
  
        <div>
          <i>Note app, Department of Computer Science 2024</i>
        </div>
      </Router>
    )
  }

ReactDOM.createRoot(document.getElementById('root')).render(<App />)