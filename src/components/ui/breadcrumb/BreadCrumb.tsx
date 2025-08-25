import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  breadcrumbStart: string;
  urlStart: string;

  breadcrumbCurrent: string;
  urlCurrent: string;
}

export const BreadCrumb = ({ breadcrumbStart, urlStart, breadcrumbCurrent, urlCurrent }: Props) => {
  return (
    <nav className="flex mt-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href={urlStart} className="inline-flex items-center text-xs md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400">
            {breadcrumbStart}
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward size={17} />
            <Link href={urlCurrent} className="ms-1 text-xs md:text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400">{breadcrumbCurrent}</Link>
          </div>
        </li>
      </ol>
    </nav>
  )
}
