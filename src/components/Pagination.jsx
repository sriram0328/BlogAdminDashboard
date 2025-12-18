export default function Pagination({ page, setPage, total }) {
  return (
    <div className="flex gap-1 md:gap-2 mt-6 justify-center overflow-x-auto pb-2">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base whitespace-nowrap ${
            page === i + 1 
              ? "bg-blue-500 text-white shadow-md" 
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
