import React, { useState } from 'react';
import { X } from 'lucide-react';

function LatestArticles({ articles }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <>
      <section className="my-8 sm:my-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <div
              key={a._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {a.imageUrl && (
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  className="w-full h-40 sm:h-44 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h4 className="mb-2 text-sm sm:text-[15px] leading-snug font-medium">
                  {a.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 flex-1">
                  {a.excerpt}
                </p>
                <button
                  onClick={() => setSelectedArticle(a)}
                  className="self-start text-teal-600 text-xs sm:text-sm font-medium hover:text-teal-700 transition-colors"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Details Modal Popup */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100 p-6 sm:p-8 relative transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <span className="inline-block text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 mb-3">
                Article
              </span>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                {selectedArticle.title}
              </h3>
              {selectedArticle.imageUrl && (
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-xl shadow-sm"
                />
              )}
            </div>

            {/* Detailed Content */}
            <div className="space-y-6 text-gray-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                {/* Render fullContent with proper line breaks, fallback to excerpt */}
                {(selectedArticle.fullContent || selectedArticle.excerpt).split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LatestArticles;