function ResourceCategories({ categories }) {
  return (
    <section className="my-8 sm:my-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
        Resource Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex gap-3.5 items-start"
          >
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl shrink-0"
              style={{ background: cat.color }}
            >
              🐄
            </div>
            <div>
              <h4
                className="mb-2.5 text-sm sm:text-[15px] font-semibold"
                style={{ color: cat.iconColor }}
              >
                {cat.title}
              </h4>
              {cat.items.map(item => (
                <p
                  key={item}
                  className="my-1 text-xs sm:text-sm text-gray-600 flex items-center gap-1.5"
                >
                  <span className="text-teal-600">✓</span> {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResourceCategories;