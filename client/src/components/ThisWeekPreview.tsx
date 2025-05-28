import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface TopRace {
  name: string;
  series: string;
  datetime: string;
  network: string;
  description: string;
  significance: string;
}

const ThisWeekPreview = () => {
  const [, navigate] = useLocation();
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [raceDetails, setRaceDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch top three races for this week
  const { data: topRacesData, isLoading: isLoadingRaces } = useQuery({
    queryKey: ["/api/top-three-races"],
    queryFn: () => fetch("/api/top-three-races").then(res => res.json()),
  });

  const handleViewAllClick = () => {
    navigate("/this-week");
  };

  const handleGetDetails = async (raceName: string) => {
    setIsLoading(true);
    setSelectedRace(raceName);
    try {
      const response = await fetch("/api/race-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raceName }),
      });
      
      const data = await response.json();
      setRaceDetails(data.details);
    } catch (error) {
      console.error("Failed to fetch race details:", error);
      setRaceDetails("Sorry, unable to fetch race details at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedRace(null);
    setRaceDetails("");
  };

  const getSeriesColor = (series: string) => {
    const lowerSeries = series.toLowerCase();
    if (lowerSeries.includes('nascar') || lowerSeries.includes('cup') || lowerSeries.includes('xfinity') || lowerSeries.includes('truck')) {
      return 'nascar';
    } else if (lowerSeries.includes('formula') || lowerSeries.includes('f1')) {
      return 'f1';
    } else if (lowerSeries.includes('indycar')) {
      return 'indycar';
    } else if (lowerSeries.includes('motogp')) {
      return 'motogp';
    }
    return 'accent';
  };

  const topRaces: TopRace[] = topRacesData?.races || [];

  return (
    <section className="py-8 bg-gradient-to-r from-secondary to-dark text-white" id="this-week-preview">
      <div className="container-racing">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">This Week's Top Racing Events</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">The biggest races happening this week across all major motorsport series.</p>
        </div>
        
        {isLoadingRaces ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-300">Finding this week's biggest races...</p>
          </div>
        ) : topRaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRaces.slice(0, 3).map((race, index) => {
              const seriesColor = getSeriesColor(race.series);
              return (
                <div 
                  key={index}
                  className={`bg-${seriesColor}/10 rounded-lg p-5 text-center hover:bg-${seriesColor}/20 transition-all border border-${seriesColor}/40`}
                >
                  <div className={`text-${seriesColor} font-bold mb-2 ${seriesColor === 'nascar' ? 'text-black' : ''}`}>
                    {race.series.toUpperCase()}
                  </div>
                  <div className="text-xl font-semibold mb-3">{race.name}</div>
                  <div className="text-sm text-gray-300 mb-2">{race.description}</div>
                  <div className="text-gray-300 mb-4">{race.datetime} on {race.network}</div>
                  <button 
                    onClick={() => handleGetDetails(race.name)}
                    className={`bg-${seriesColor} hover:bg-${seriesColor}/80 ${seriesColor === 'nascar' ? 'text-black' : 'text-white'} font-semibold py-2 px-4 rounded transition-colors`}
                  >
                    Race Summary
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-300">No major races scheduled for this week.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={handleViewAllClick}
            className="bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-5 rounded transition-colors inline-flex items-center gap-2"
          >
            <span>View All This Week's Races</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Race Details Modal */}
        {selectedRace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedRace} Details</h3>
                  <button 
                    onClick={closeDetails}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2 text-gray-600">Gathering your race summary</p>
                  </div>
                ) : (
                  <div className="text-gray-800">
                    <div className="whitespace-pre-wrap">{raceDetails}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThisWeekPreview;
