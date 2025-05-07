import { allBlogs } from 'contentlayer/generated'
import categories from '@/data/categories'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

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

  return (
    <ListLayout
      posts={filteredPosts}
      title={categoryObj.name}
      initialDisplayPosts={filteredPosts}
      description={categoryObj.description}
    />
  )
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category.toLowerCase(),
  }))
} 