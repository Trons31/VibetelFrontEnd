'use client';

interface Props {
  currentPage: number;
  totalPages: number;
  nameData:string;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const PaginationTable = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
  nameData
}: Props) => {
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

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  const showingFrom = (currentPage - 1) * itemsPerPage + 1;
  const showingTo = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>

      <div className="flex justify-end mt-5 mb-2 md:hidden" >
        <div className="flex gap-4 items-center">
          <p className="text-xs text-gray-600 sm:text-sm">Mostrar</p>
          <select
            disabled={totalPages === 0}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mr-1 block w-full shadow-sm shadow-gray-400 whitespace-pre rounded-lg border p-1 pr-10 text-xs outline-none focus:shadow sm:text-sm"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center md:px-4 py-4">
        <div className="hidden md:flex gap-4 items-center">
          <p className="text-xs text-gray-600 sm:text-sm">Mostrar</p>
          <select
            disabled={totalPages === 0}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mr-1 block w-full shadow-sm shadow-gray-400 whitespace-pre rounded-lg border p-1 pr-10 text-xs outline-none focus:shadow sm:text-sm"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`mx-1 px-3 py-1 text-xs md:text-sm rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === 1}
          >
            Atrás
          </button>
          {visiblePages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`mx-1 px-3 py-1 text-xs md:text-sm rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`mx-1 px-3 py-1 text-xs md:text-sm rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>

        <div className="hidden md:block" >
          <p className="text-sm text-gray-600 sm:text-sm">
            Mostrando {showingFrom} a {showingTo} de {totalItems} {nameData}
          </p>
        </div>

        <div className="block md:hidden" >
          <p className="text-xs text-gray-600 sm:text-sm">
            {showingTo} de {totalItems}
          </p>
        </div>
      </div>
    </>
  );
};
