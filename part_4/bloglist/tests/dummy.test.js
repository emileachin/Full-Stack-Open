const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
})

describe('top likes', () => {
    const blogList = [
        {
          _id: '3',
          title: 'Go To Flowers',
          author: 'Elly Pole',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        },
        {
            _id: '2',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 2,
            __v: 0
          },
          {
            _id: '1',
            title: 'Morning View',
            author: 'Emi Chin',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 9,
            __v: 0
          }
      ]

      test("when list has multiple items, the blog with the most likes is ", () => {
        const result = listHelper.favoriteBlog(blogList)
        assert.deepStrictEqual(result, {
            _id: '1',
            title: 'Morning View',
            author: 'Emi Chin',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 9,
            __v: 0
        })
      })
})

describe('most blogs', () => {
  const blogList = [
    {
      _id: '3',
      title: 'Go To Flowers',
      author: 'Elly Pole',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
        _id: '2',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 2,
        __v: 0
      },
      {
        _id: '1',
        title: 'Morning View',
        author: 'Emi Chin',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 9,
        __v: 0
      },
      {
        _id: '4',
        title: 'Whatever is it',
        author: 'Emi Chin',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
        __v: 0
      }
  ]

  test("when list has multiple items, the author with the most blogs is ", () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, {
      author: "Emi Chin",
      blogs: 2
    })
  })
})

describe('most likes', () => {
  const blogList = [
    {
      _id: '3',
      title: 'Go To Flowers',
      author: 'Elly Pole',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
        _id: '2',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 2,
        __v: 0
      },
      {
        _id: '1',
        title: 'Morning View',
        author: 'Emi Chin',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 9,
        __v: 0
      },
      {
        _id: '4',
        title: 'Whatever is it',
        author: 'Emi Chin',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
        __v: 0
      }
  ]

  test('when list has multiple authors, the authors with the most likes is ', () => {
    const result = listHelper.mostLikes(blogList)
    assert.deepStrictEqual(result, {
      author: 'Emi Chin',
      likes: 10
    })
  })
})