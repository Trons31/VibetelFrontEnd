
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const getVisiblePageNumbers = () => {
    const maxVisiblePages = 3;
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePageNumbers();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        disabled={currentPage === 1}
      >
        Atrás
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};
