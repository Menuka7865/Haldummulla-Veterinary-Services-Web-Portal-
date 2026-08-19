import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

function FeaturedResources({ items }) {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <>
      <section className="my-8 sm:my-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col gap-1 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-teal-600 mt-3 mb-2 text-base sm:text-[17px] font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                {item.description}
              </p>
              <button
                onClick={() => setSelectedResource(item)}
                className="mt-4 self-start bg-teal-600 text-white border-none py-2.5 px-4 rounded-lg text-sm cursor-pointer hover:bg-teal-700 transition-colors"
              >
                {item.buttonLabel || 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Resource Details Modal Popup */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in"
          onClick={() => setSelectedResource(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100 p-6 sm:p-8 relative transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4 mb-6 pr-8">
              <div className="bg-teal-50 w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl text-4xl shadow-inner border border-teal-100">
                {selectedResource.icon || '📄'}
              </div>
              <div>
                <span className="inline-block text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 mb-2">
                  Featured Resource
                </span>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedResource.title}
                </h3>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">
                  Resource Overview
                </h4>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  {/* Render fullContent with proper line breaks */}
                  {(selectedResource.fullContent || selectedResource.description).split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedResource(null)}
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

export default FeaturedResources;