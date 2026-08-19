function VideoSection({ videos }) {
  return (
    <section className="my-8 sm:my-10">
      <h2 className="flex items-center text-lg sm:text-xl font-semibold mb-5 pl-1">
        <span className="bg-teal-600 w-2.5 h-2.5 rounded-sm inline-block mr-2.5"></span>
        Learn Through Videos
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {videos.map((v, i) => (
            <a
              key={v._id}
              href={v.videoUrl || '#!'}
              target={v.videoUrl ? '_blank' : '_self'}
              rel="noreferrer"
              className={`flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                i < videos.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-10 h-[30px] bg-gray-200 rounded flex items-center justify-center shrink-0 text-gray-500">
                ▶
              </div>
              <span className="flex-1 text-sm truncate text-gray-800 font-medium group-hover:text-teal-600">{v.title}</span>
              <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                {v.duration}
              </span>
            </a>
          ))}
        </div>
        <div className="bg-teal-50 border border-emerald-100 rounded-xl p-7 sm:p-8 flex flex-col items-center gap-4">
          <div className="text-4xl sm:text-5xl">🖥️</div>
          <button className="bg-teal-600 text-white border-none py-3 px-6 rounded-lg cursor-pointer text-sm hover:bg-teal-700 transition-colors">
            Watch Videos
          </button>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;