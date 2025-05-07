import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import CategoryList from '@/components/CategoryList'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <Main>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
            分类
          </h2>
          <CategoryList />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
            最新文章
          </h2>
          {/* Existing posts list */}
        </div>
      </div>
    </Main>
  )
}
