const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = blogs => {
  let max = 0
  let index = 0

  for (let i = 0; i < blogs.length; i++)
  {
    if(blogs[i].likes > max)
    {
      max = blogs[i].likes
      index = i
    }
}
return blogs[index]
}

const mostBlogs = blogs => {
  const matchingAuthors = lodash.groupBy(blogs, 'author')
  const matchingAuthorsList = lodash.map(matchingAuthors, (blogs, author) => ({
    author: author,
    blogs: blogs.length,
  }))


  return lodash.maxBy(matchingAuthorsList, 'blogs')
}

const mostLikes = blogs => {
  const allAuthors = lodash.groupBy(blogs, 'author')
  //lodash takes values then keys (callback of map)
  const likes = lodash.map(allAuthors, (blogs, author) => {
    return {
      author: author,
      likes: lodash.sumBy(blogs, 'likes')
    }
  })
  
  return lodash.maxBy(likes, 'likes')
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
