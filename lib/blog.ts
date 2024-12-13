// Mock blog data
const blogPosts = [
  {
    slug: 'introducing-pacmanui',
    title: 'Introducing PacmanUI: A Modern React Component Library',
    description: 'A comprehensive introduction to PacmanUI and its core features.',
    date: 'March 15, 2024',
    readTime: '5 min',
  },
  {
    slug: 'component-installation',
    title: 'Component-by-Component Installation: A New Approach',
    description: 'Learn how to install and use individual components from PacmanUI.',
    date: 'March 10, 2024',
    readTime: '4 min',
  },
  {
    slug: 'accessibility-guide',
    title: 'Building Accessible Components with PacmanUI',
    description: 'A comprehensive guide to accessibility features in PacmanUI.',
    date: 'March 5, 2024',
    readTime: '7 min',
  }
]

export function getAllBlogPosts() {
  return blogPosts
}

export function searchBlogPosts(query: string) {
  const searchTerm = query.toLowerCase()
  return blogPosts.filter(post => {
    const searchContent = `
      ${post.title}
      ${post.description}
    `.toLowerCase()
    return searchContent.includes(searchTerm)
  })
}
