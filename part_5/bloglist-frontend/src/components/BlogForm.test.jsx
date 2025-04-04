import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'

describe('BlogForm', () => {
  test('calls createBlog with correct details when a new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('input[name="Title"]')
    const author = container.querySelector('input[name="Author"]')
    const url = container.querySelector('input[name="URL"]')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'https://testurl.com')

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
  })
})