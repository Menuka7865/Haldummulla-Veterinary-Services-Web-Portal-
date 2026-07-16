function FeaturedResources({ items }) {
  return (
    <section className="my-8 sm:my-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
        Featured Resources
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col gap-1"
          >
            <span className="text-3xl">{item.icon}</span>
            <h3 className="text-teal-600 mt-3 mb-2 text-base sm:text-[17px] font-semibold">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1">
              {item.description}
            </p>
            <button className="mt-4 self-start bg-teal-600 text-white border-none py-2.5 px-4 rounded-lg text-sm cursor-pointer hover:bg-teal-700 transition-colors">
              {item.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedResources;