function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 px-6 sm:px-10 pt-12 sm:pt-16 pb-10 flex flex-col lg:flex-row justify-between items-center gap-8">
      <div className="max-w-full lg:max-w-[500px] text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-[38px] text-teal-900 mb-3 font-bold">
          Educational Resources
        </h1>
        <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-7">
          Access guides, articles, videos, and veterinary information to
          improve animal health, livestock management, and farm productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <input
            type="text"
            placeholder="Search resources..."
            className="px-4 py-2.5 border border-gray-300 rounded-lg w-full sm:w-64 text-sm"
          />
          <select className="px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm bg-white">
            <option>All Categories</option>
            <option>Dairy Farming</option>
            <option>Livestock Management</option>
            <option>Vaccination & Prevention</option>
            <option>Animal Health</option>
          </select>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=420&h=260&fit=crop"
        alt="Farm animals"
        className="rounded-xl w-full max-w-[380px] h-[220px] sm:h-[260px] object-cover"
      />
    </div>
  );
}

export default HeroSection;