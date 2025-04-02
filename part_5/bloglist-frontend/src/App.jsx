import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({
    message: null,
    error: false,
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogappuser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({message: `Welcome ${user.name}`, error: false})
      setTimeout(() => {
        setMessage({message: null, error: false})
      }, 5000)
    }
    catch (error) {
      setMessage({
        message: 'wrong username or password',
        error: true,
      })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault()

    const blogObject = {
      title, author, url
    }

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

    setMessage({message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, error: false})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }
  catch (error) {
    setMessage({message: `error adding blog`, error: true})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} 
        name="Username"/>
      </div>
      <div>
        password
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}
        name="Password" />
      </div>
      <button type = "submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message.message} error={message.error} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappuser")
     setUser(null)
  setTitle('')
  setAuthor('')
  setUrl('')
  }

  return (
    <div>
      <Notification message={message.message} error={message.error} />
      <p>{user?.name} logged in</p>
      <button type="submit" onClick={logout}>Logout</button>
      <h2>blogs</h2>
      <BlogForm
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App