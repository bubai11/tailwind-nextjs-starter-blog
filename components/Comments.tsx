'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
    </div>
  )
}
