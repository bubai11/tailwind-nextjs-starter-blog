import Link from './Link'
import categories from '@/data/categories'

const CategoryList = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(categories).map(([key, category]) => (
        <Link
          key={key}
          href={`/categories/${key.toLowerCase()}`}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoryList 