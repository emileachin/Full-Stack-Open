import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({
    message: null,
    error: false,
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setMessage({message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, error: false})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }

  const updateLikes = async (blogObject) => {
    const id = blogObject.id
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    setMessage({message: `you liked ${updatedBlog.title} by ${updatedBlog.author}`, error: false})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }

  const removedBlog = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message.message} error={message.error} />
        <h2>Log in to application</h2>
        <LoginForm username={username} password={password}/>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappuser")
    setUser(null)
  }

  return (
    <div>
      <Notification message={message.message} error={message.error} />
      <p>{user?.name} logged in</p>
      <button type="submit" onClick={logout}>Logout</button>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
        </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateLikes={updateLikes} removedBlog={removedBlog}/>
      )}
    </div>
  )
}

export default App