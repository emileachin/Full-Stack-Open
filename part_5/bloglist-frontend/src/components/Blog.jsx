import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, removedBlog }) => {
  const [displayVisible, setDisplayVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setDisplayVisible(!displayVisible)
  }

  const handleLikes = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    updateLikes(updatedBlog)
  }

  const removeBlog = async () => {
    const id = blog.id

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      removedBlog(id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <p>{blog.title} {blog.author}</p>
      <div>
        <button onClick={toggleVisibility}>{displayVisible ? 'hide' : 'view'}</button>
      </div>
      {displayVisible && (
        <div>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
          <button onClick={handleLikes}>like</button>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button onClick={removeBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog