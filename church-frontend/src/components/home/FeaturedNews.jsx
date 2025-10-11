import React from 'react';
const FeaturedNews = ({ news }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Latest News</h2>
        <p className="text-lg text-gray-600">Stay updated with our parish activities and announcements</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Read More →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default FeaturedNews;
