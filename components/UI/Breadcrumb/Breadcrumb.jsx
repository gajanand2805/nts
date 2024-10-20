// components/Breadcrumb.js
import Link from 'next/link'
import { GoChevronRight } from 'react-icons/go'

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="text-base">
      <ol className="inline-flex items-center gap-1 p-0 list-none">
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className="flex items-center gap-1">
            {crumb.path ? (
              <Link href={crumb.path}>
                <a className="text-customGray hover:underline">{crumb.label}</a>
              </Link>
            ) : (
              <span className="font-semibold text-Blue">{crumb.label}</span>
            )}
            {index < crumbs.length - 1 && <GoChevronRight />}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
