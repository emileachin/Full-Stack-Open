import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <p>title:</p>
      <input
        name="Title"
        value={title}
        type="text"
        onChange={({ target }) => setTitle(target.value)}
      />
      <p>author:</p>
      <input
        name="Author"
        value={author}
        type="text"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <p>url:</p>
      <input
        name="URL"
        value={url}
        type="text"
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm