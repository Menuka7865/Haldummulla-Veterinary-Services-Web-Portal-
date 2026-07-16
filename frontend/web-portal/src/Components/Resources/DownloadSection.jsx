function DownloadSection({ downloads }) {
  return (
    <section className="my-8 sm:my-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-5 border-l-4 border-teal-600 pl-3">
        Quick Download Resources
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {downloads.map(d => (
          <div
            key={d.id}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col items-center gap-3 text-center"
          >
            <div className="text-2xl sm:text-3xl">📄</div>
            <p className="text-xs sm:text-sm font-medium leading-snug">{d.title}</p>
            <button className="w-full bg-white border border-teal-600 text-teal-600 py-2 px-3 rounded-md text-xs sm:text-sm hover:bg-teal-600 hover:text-white transition-colors cursor-pointer">
              PDF Download
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DownloadSection;