import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog Component', () => {
  const blog = {
    title: 'Test title',
    author: 'Lea Author',
    url: 'https://example.com',
    likes: 5,
    user: {
      username: 'leaauthor',
      name: 'Lea User'
    }
  }

  const mockHandler = vi.fn()

  beforeEach(() => {
    render(<Blog blog={blog} user={blog.user} updateLikes={mockHandler} removedBlog={mockHandler} />)
  })

  test('renders title and author, but not url/likes', () => {
    expect(screen.getByText('Test title Lea Author')).toBeDefined()
    expect(screen.queryByText('https://example.com')).toBeNull()
    expect(screen.queryByText('likes: 5')).toBeNull()
  })

  test('renders url and likes after clicking the button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://example.com')).toBeDefined()
    expect(screen.getByText('likes: 5')).toBeDefined()
  })

  test('clicking like twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})