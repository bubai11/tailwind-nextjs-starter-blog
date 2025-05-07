import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import categories from '@/data/categories'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category
  const categoryObj = categories[category.charAt(0).toUpperCase() + category.slice(1)]
  return genPageMetadata({
    title: categoryObj.name,
    description: categoryObj.description,
  })
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category
  const categoryKey = category.charAt(0).toUpperCase() + category.slice(1)
  const categoryObj = categories[categoryKey]
  
  const filteredPosts = allBlogs.filter((post) => 
    post.category?.toLowerCase() === category.toLowerCase()
  )

  const sortedPosts = sortPosts(filteredPosts)
  const posts = allCoreContent(sortedPosts)
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return (
    <ListLayout
      posts={posts}
      title={categoryObj.name}
      initialDisplayPosts={initialDisplayPosts}
      pagination={{
        currentPage: pageNumber,
        totalPages: totalPages
      }}
      description={categoryObj.description}
      showDivider={false}
    />
  )
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category.toLowerCase(),
  }))
} 