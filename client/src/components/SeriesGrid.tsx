import { useLocation } from "wouter";
import { racingSeries } from "@/lib/racing";

const SeriesGrid = () => {
  const [, navigate] = useLocation();

  const handleSeriesClick = (seriesId: string) => {
    navigate(`/series/${seriesId}`);
  };

  return (
    <section className="py-16 bg-white" id="series-grid-section">
      <div className="container-racing">
        <h2 className="text-3xl font-bold text-center mb-12 relative">
          <span className="relative inline-block">
            Select Your Racing Series
            <span className="absolute bottom-0 left-1/2 w-24 h-1 bg-primary transform -translate-x-1/2 translate-y-4"></span>
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {racingSeries.map((series) => (
            <div
              key={series.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer relative"
              onClick={() => handleSeriesClick(series.id)}
            >
              <img src={series.imageSrc} alt={series.name} className="w-full h-36 object-cover" />
              <div className={`series-badge ${series.badgeClass}`}>{series.type}</div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold mb-2">{series.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{series.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeriesGrid;
