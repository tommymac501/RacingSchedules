import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useLocation } from "wouter";
import { getSeriesInfo } from "@/lib/racing";
import WeatherIcon from "./WeatherIcon";

type RaceScheduleProps = {
  seriesId: string;
  thisWeekOnly?: boolean;
};

const RaceSchedule = ({ seriesId, thisWeekOnly = false }: RaceScheduleProps) => {
  const [, navigate] = useLocation();
  const [title, setTitle] = useState("Race Schedule");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
  const { data: races, isLoading, error } = useQuery({
    queryKey: [thisWeekOnly ? "/api/races/this-week" : `/api/races/${seriesId}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (thisWeekOnly) {
      setTitle("This Week's Races");
    } else {
      const seriesInfo = getSeriesInfo(seriesId);
      if (seriesInfo) {
        setTitle(`${seriesInfo.name} Schedule`);
      }
    }
  }, [seriesId, thisWeekOnly]);

  const handleBackClick = () => {
    navigate("/");
  };

  const toggleCardFlip = (raceId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(raceId)) {
        newSet.delete(raceId);
      } else {
        newSet.add(raceId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "Date TBD";
      const date = DateTime.fromISO(dateString);
      if (!date.isValid) {
        // Try parsing as different format
        const altDate = DateTime.fromFormat(dateString, "yyyy-MM-dd");
        if (altDate.isValid) {
          return altDate.toFormat("EEEE, MMMM d, yyyy");
        }
        return dateString; // Return as-is if can't parse
      }
      return date.toFormat("EEEE, MMMM d, yyyy");
    } catch (error) {
      return dateString; // Return as-is if error
    }
  };

  const formatTime = (timeString: string) => {
    try {
      // If timeString is already formatted or doesn't need parsing, return as is
      if (!timeString || !timeString.includes(":")) {
        return timeString;
      }
      
      // Parse ET time and convert to user's local time
      const parts = timeString.split(" ");
      if (parts.length < 2) return timeString;
      
      const [time, meridiem] = parts;
      const timeParts = time.split(":");
      if (timeParts.length < 2) return timeString;
      
      // Create DateTime in ET
      const [hour, minute] = timeParts.map(Number);
      if (isNaN(hour) || isNaN(minute)) return timeString;
      
      const etHour = meridiem === "PM" && hour !== 12 
        ? hour + 12 
        : (meridiem === "AM" && hour === 12 ? 0 : hour);
        
      const etDateTime = DateTime.now()
        .setZone("America/New_York")
        .set({ hour: etHour, minute, second: 0, millisecond: 0 });
        
      // Convert to local time
      const localDateTime = etDateTime.toLocal();
      
      // Format times
      const etFormatted = etDateTime.toFormat("h:mm a 'ET'");
      const localFormatted = localDateTime.toFormat("h:mm a");
      
      return `${etFormatted} (${localFormatted})`;
    } catch (error) {
      return timeString;
    }
  };

  return (
    <section className="py-12 px-4 bg-gray-50" id="race-schedule">
      <div className="container-racing">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button 
            onClick={handleBackClick}
            className="bg-secondary hover:bg-dark text-white font-medium px-5 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            <span>Back to Series</span>
          </button>
        </div>

        {/* Schedule Content */}
        <div id="schedule-content">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                <div className="mt-4 text-gray-600 font-medium">Loading race schedule...</div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-red-500 mb-4">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              <p className="text-xl text-gray-700">Error loading race data</p>
              <p className="mt-2 text-gray-500">Please try again later</p>
            </div>
          )}

          {/* Race Cards Grid */}
          {!isLoading && !error && races && races.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {races.map((race: any) => (
                <div key={race.id} className="relative">
                  <div className={`transition-transform duration-700 transform-style-preserve-3d ${flippedCards.has(race.id) ? 'rotate-y-180' : ''}`}>
                    
                    {/* Front Side - Original Race Card */}
                    <div className={`backface-hidden bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all`}>
                      <div className={race.headerClass}>
                        <h3 className="text-xl font-bold mb-1">{race.name}</h3>
                        <div className="text-sm opacity-90">{race.seriesName}</div>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-3 mb-4">
                          <div className="font-semibold text-secondary">Location:</div>
                          <div>
                            <a 
                              href={`https://maps.google.com/?q=${race.coords}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-accent hover:underline inline-flex items-center gap-1"
                            >
                              {race.location}
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                <path d="M15 3h6v6"/>
                                <path d="M10 14 21 3"/>
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              </svg>
                            </a>
                          </div>
                          
                          <div className="font-semibold text-secondary">Weather:</div>
                          <div className="flex items-center gap-2">
                            <WeatherIcon weather={race.weather} />
                            <span>{race.weather}</span>
                          </div>
                          
                          <div className="font-semibold text-secondary">Date:</div>
                          <div>{formatDate(race.date)}</div>
                          
                          <div className="font-semibold text-secondary">Green Flag:</div>
                          <div>{formatTime(race.time)}</div>
                          
                          <div className="font-semibold text-secondary">Broadcast:</div>
                          <div>{race.channel}</div>
                        </div>
                        
                        <div 
                          className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleCardFlip(race.id)}
                        >
                          <div className="text-success font-semibold flex items-center gap-2 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>RACE DETAILS</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Detailed Race Information */}
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl overflow-hidden shadow-md`}>
                      <div className="h-full overflow-y-auto">
                        <div className={race.headerClass}>
                        <h3 className="text-xl font-bold mb-1">Race Details</h3>
                        <div className="text-sm opacity-90">{race.seriesName}</div>
                      </div>
                      
                        <div className="p-5 pt-0">
                          <div className="grid gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="font-semibold text-secondary">Name:</span>
                            <span className="text-right">{race.raceData?.name || race.name}</span>
                          </div>
                          
                          {race.raceData?.number && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Race Number:</span>
                              <span>{race.raceData.number}</span>
                            </div>
                          )}
                          
                          {race.raceData && typeof race.raceData === 'object' && (race.raceData as any).distance && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Distance:</span>
                              <span>{(race.raceData as any).distance} miles</span>
                            </div>
                          )}
                          
                          {race.raceData && typeof race.raceData === 'object' && (race.raceData as any).laps && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Laps:</span>
                              <span>{(race.raceData as any).laps}</span>
                            </div>
                          )}
                          
                          {race.raceData?.chase_race !== undefined && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Chase Race?</span>
                              <span>{race.raceData.chase_race ? "Yes" : "No"}</span>
                            </div>
                          )}
                          
                          {race.raceData?.stage_1_laps && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Stage 1:</span>
                              <span>{race.raceData.stage_1_laps} laps</span>
                            </div>
                          )}
                          
                          {race.raceData?.stage_2_laps && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Stage 2:</span>
                              <span>{race.raceData.stage_2_laps} laps</span>
                            </div>
                          )}
                          
                          {race.raceData?.stage_3_laps && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-secondary">Stage 3:</span>
                              <span>{race.raceData.stage_3_laps} laps</span>
                            </div>
                          )}
                          
                          {/* F1-specific details */}
                          {race.seriesId === 'f1' && race.raceData && (
                            <>
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Date & Time:</span>
                                <span className="text-right">{race.raceData.date_time ? 
                                  DateTime.fromISO(race.raceData.date_time).toFormat("EEEE, MMMM d, yyyy h:mm a") 
                                  : "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Location:</span>
                                <span className="text-right">{race.raceData.location || "Unavailable"}</span>
                              </div>
                              
                              {race.raceData.url && (
                                <div className="flex justify-between">
                                  <span className="font-semibold text-secondary">Official URL:</span>
                                  <a href={race.raceData.url} target="_blank" rel="noopener noreferrer" 
                                     className="text-accent hover:underline text-right">Visit</a>
                                </div>
                              )}
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Laps:</span>
                                <span>{race.raceData.laps || "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Right Curves:</span>
                                <span>{race.raceData.right_curves ?? 0}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Left Curves:</span>
                                <span>{race.raceData.left_curves ?? 0}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Length:</span>
                                <span>{race.raceData.length ? `${race.raceData.length}m` : "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Time Zone:</span>
                                <span>{race.raceData.timezone || "Unavailable"}</span>
                              </div>
                            </>
                          )}
                          
                          {/* IndyCar-specific details */}
                          {race.seriesId === 'indycar' && race.raceData && (
                            <>
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Date & Time:</span>
                                <span className="text-right">{race.raceData.date_time ? 
                                  DateTime.fromISO(race.raceData.date_time).toFormat("EEEE, MMMM d, yyyy h:mm a") 
                                  : "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Location:</span>
                                <span className="text-right">{race.raceData.location || "Unavailable"}</span>
                              </div>
                              
                              {race.raceData.url && (
                                <div className="flex justify-between">
                                  <span className="font-semibold text-secondary">Official URL:</span>
                                  <a href={race.raceData.url} target="_blank" rel="noopener noreferrer" 
                                     className="text-accent hover:underline text-right">Visit</a>
                                </div>
                              )}
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Laps:</span>
                                <span>{race.raceData.laps || "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Right Curves:</span>
                                <span>{race.raceData.right_curves ?? 0}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Left Curves:</span>
                                <span>{race.raceData.left_curves ?? 0}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Length:</span>
                                <span>{race.raceData.length ? `${race.raceData.length}m` : "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Time Zone:</span>
                                <span>{race.raceData.timezone || "Unavailable"}</span>
                              </div>
                            </>
                          )}
                          
                          {/* NASCAR-specific details */}
                          {(race.seriesId === 'stock-cup' || race.seriesId === 'stock-xfinity' || race.seriesId === 'stock-truck') && (
                            <>
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Qualifying:</span>
                                <span className="text-right">{race.raceData?.qualifying_start_time || "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Network:</span>
                                <span>{race.raceData?.broadcast?.network || race.raceData?.broadcast || "Unavailable"}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="font-semibold text-secondary">Previous Winner:</span>
                                <span className="text-right">{race.raceData?.prior_winner?.full_name || race.raceData?.prior_winner || "Unavailable"}</span>
                              </div>
                            </>
                          )}
                          </div>
                          
                          <button 
                            onClick={() => toggleCardFlip(race.id)}
                            className="w-full mt-6 bg-secondary hover:bg-dark text-white font-medium py-3 px-4 rounded transition-colors"
                          >
                            Return
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Races Message */}
          {!isLoading && !error && (!races || races.length === 0) && (
            <div className="text-center py-16 text-gray-500 text-xl">
              {(seriesId === "arca" || seriesId === "world-of-outlaws" || seriesId === "motogp") ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-primary mb-4">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <p className="text-primary font-semibold">Coming Soon</p>
                  <p className="mt-2 text-base">This series will be available soon. Stay tuned!</p>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                    <line x1="8" x2="16" y1="14" y2="14"/>
                    <line x1="8" x2="16" y1="18" y2="18"/>
                  </svg>
                  <p>No upcoming races found for this series.</p>
                  <p className="mt-2 text-base">Please check back later or select another series.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RaceSchedule;
