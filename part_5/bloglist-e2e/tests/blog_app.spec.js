const { test, expect, beforeEach, describe } = require('@playwright/test')
import { login, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset') 
    await request.post('/api/users', {
        data: {
            name: 'Lea Chin',
            username: "leachin",
            password: 'leachin'
        }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'leachin', 'leachin')

      await expect(page.getByText('Lea Chin logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'leachin', 'wrong')

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'leachin', 'leachin')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Blog', 'Test Author', 'https://testblog.com')

      await expect(page.getByText('Test Blog Test Author')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Blog', 'Test Author', 'https://testblog.com')
      })

      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, 'Test Blog', 'Test Author', 'https://testblog.com')
  
        await expect(page.getByText('Test Blog Test Author')).toBeVisible()
  
        const blog = await page.getByText('Test Blog Test Author')
        const blogElement = await blog.locator('..')
        await blogElement.locator('button', {name: 'view'}).click()
  
        const likesButton = await page.getByRole('button', { name: 'like' })
        await expect(likesButton).toBeVisible()
        await likesButton.click()
  
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('the user who added the blog can delete it', async ({ page }) => {
          const blog = page.locator('.blog').filter({ hasText: 'Test Blog Test Author' })
          await blog.getByRole('button', { name: 'view' }).click()
  
          page.on('dialog', async (dialog) => {
            await dialog.accept()
          })
          await page.getByRole('button', { name: 'delete' }).click()
  
          await expect(blog.getByText('Test 1 Blog')).not.toBeVisible()
      })
    })
  })
})