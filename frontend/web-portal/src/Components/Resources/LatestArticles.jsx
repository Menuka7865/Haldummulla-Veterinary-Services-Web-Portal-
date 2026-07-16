function LatestArticles({ articles }) {
  return (
    <section className="my-8 sm:my-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map(a => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <img src={a.image} alt={a.title} className="w-full h-40 sm:h-44 object-cover" />
            <div className="p-4">
              <h4 className="mb-2 text-sm sm:text-[15px] leading-snug font-medium">{a.title}</h4>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">{a.excerpt}</p>
              <a href="#!" className="text-teal-600 text-xs sm:text-sm no-underline font-medium">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestArticles;