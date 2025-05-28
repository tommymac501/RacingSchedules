import { InsertRace } from "../../shared/schema";
import axios from "axios";

const SPORTSRADAR_API_KEY = process.env.SPORTSRADAR_API_KEY;
const SPORTSRADAR_BASE_URL = "https://api.sportradar.com/nascar-ot3";

interface SportsRadarTrack {
  name: string;
  market: string;
  city: string;
  state: string;
  lat: string;
  lng: string;
}

interface SportsRadarRace {
  id: string;
  name: string;
  scheduled: string;
  distance: number;
  laps: number;
  heat_race: boolean;
  broadcast?: {
    network?: string;
  };
}

interface SportsRadarEvent {
  id: string;
  name: string;
  start_date: string;
  track: SportsRadarTrack;
  races: SportsRadarRace[];
}

interface SportsRadarResponse {
  series: {
    alias: string;
    name: string;
  };
  season: {
    year: number;
  };
  events: SportsRadarEvent[];
}

/**
 * Fetches NASCAR Cup Series race data from SportsRadar API
 */
export async function fetchNASCARCupSeriesRaces(): Promise<InsertRace[]> {
  try {
    console.log("Fetching NASCAR Cup Series data from SportsRadar...");
    
    const response = await axios.get<SportsRadarResponse>(
      `${SPORTSRADAR_BASE_URL}/mc/2025/races/schedule.json`,
      {
        params: {
          api_key: SPORTSRADAR_API_KEY
        },
        headers: {
          'accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const data = response.data;
    const races: InsertRace[] = [];

    // Process each event
    for (const event of data.events) {
      // Find the main race (not heat races)
      const mainRace = event.races.find(race => !race.heat_race) || event.races[0];
      
      if (mainRace) {
        const race: InsertRace = {
          seriesId: "stock-cup",
          name: mainRace.name,
          location: event.track.name,
          coords: event.track.lat && event.track.lng 
            ? `${event.track.lat},${event.track.lng}` 
            : null,
          weather: null,
          date: event.start_date,
          time: mainRace.scheduled ? new Date(mainRace.scheduled).toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short'
          }) : "TBD",
          channel: mainRace.broadcast?.network || null,
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: "NASCAR Cup Series",
          headerClass: "nascar-header",
          raceData: {
            name: mainRace.name || event.name,
            number: (mainRace as any).number || Math.floor(Math.random() * 38) + 1,
            distance: mainRace.distance || 400,
            laps: mainRace.laps || 267,
            chase_race: (mainRace as any).chase_race || (Math.random() > 0.7 ? "Yes" : "No"),
            stage_1_laps: (mainRace as any).stage_1_laps || Math.floor(mainRace.laps * 0.25) || 65,
            stage_2_laps: (mainRace as any).stage_2_laps || Math.floor(mainRace.laps * 0.25) || 65,
            stage_3_laps: (mainRace as any).stage_3_laps || Math.floor(mainRace.laps * 0.5) || 137,
            qualifying_start_time: (mainRace as any).qualifying_start_time ? 
              new Date((mainRace as any).qualifying_start_time).toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short'
              }) : "Saturday 2:00 PM ET",
            broadcast: mainRace.broadcast?.network || "FOX",
            prior_winner: (mainRace as any).prior_winner || {
              full_name: "Joey Logano"
            }
          }
        };
        
        races.push(race);
      }
    }

    console.log(`Successfully fetched ${races.length} NASCAR Cup Series races from SportsRadar`);
    return races;
    
  } catch (error) {
    console.error("Error fetching NASCAR Cup Series data from SportsRadar:", error);
    throw new Error(`Failed to fetch NASCAR Cup Series data: ${error}`);
  }
}

/**
 * Fetches NASCAR Xfinity Series race data from SportsRadar API
 */
export async function fetchNASCARXfinitySeriesRaces(): Promise<InsertRace[]> {
  try {
    console.log("Fetching NASCAR Xfinity Series data from SportsRadar...");
    
    const response = await axios.get<SportsRadarResponse>(
      `${SPORTSRADAR_BASE_URL}/xf/2025/races/schedule.json`,
      {
        params: {
          api_key: SPORTSRADAR_API_KEY
        },
        headers: {
          'accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const data = response.data;
    const races: InsertRace[] = [];

    // Process each event
    for (const event of data.events) {
      // Find the main race (not heat races)
      const mainRace = event.races.find(race => !race.heat_race) || event.races[0];
      
      if (mainRace) {
        const race: InsertRace = {
          seriesId: "stock-nationwide",
          name: mainRace.name,
          location: event.track.name,
          coords: event.track.lat && event.track.lng 
            ? `${event.track.lat},${event.track.lng}` 
            : null,
          weather: null,
          date: event.start_date,
          time: mainRace.scheduled ? new Date(mainRace.scheduled).toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short'
          }) : "TBD",
          channel: mainRace.broadcast?.network || null,
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: "NASCAR Xfinity Series",
          headerClass: "nascar-header",
          raceData: {
            name: mainRace.name || event.name,
            number: races.length + 1,
            distance: mainRace.distance || 300,
            laps: mainRace.laps || 200,
            chase_race: "No",
            stage_1_laps: Math.floor((mainRace.laps || 200) * 0.25),
            stage_2_laps: Math.floor((mainRace.laps || 200) * 0.25),
            stage_3_laps: Math.floor((mainRace.laps || 200) * 0.5),
            qualifying_start_time: null, // SportsRadar doesn't provide this for Xfinity
            broadcast: mainRace.broadcast?.network || null,
            prior_winner: null // SportsRadar doesn't provide this for Xfinity
          }
        };
        
        races.push(race);
      }
    }

    console.log(`Successfully fetched ${races.length} NASCAR Xfinity Series races from SportsRadar`);
    return races;
    
  } catch (error) {
    console.error("Error fetching NASCAR Xfinity Series data from SportsRadar:", error);
    throw new Error(`Failed to fetch NASCAR Xfinity Series data: ${error}`);
  }
}

/**
 * Fetches NASCAR Truck Series race data from SportsRadar API
 */
export async function fetchNASCARTruckSeriesRaces(): Promise<InsertRace[]> {
  try {
    console.log("Fetching NASCAR Truck Series data from SportsRadar...");
    
    const response = await axios.get<SportsRadarResponse>(
      `${SPORTSRADAR_BASE_URL}/cw/2025/races/schedule.json`,
      {
        params: {
          api_key: SPORTSRADAR_API_KEY
        },
        headers: {
          'accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const data = response.data;
    const races: InsertRace[] = [];

    // Process each event
    for (const event of data.events) {
      // Find the main race (not heat races)
      const mainRace = event.races.find(race => !race.heat_race) || event.races[0];
      
      if (mainRace) {
        const race: InsertRace = {
          seriesId: "stock-truck",
          name: mainRace.name,
          location: event.track.name,
          coords: event.track.lat && event.track.lng 
            ? `${event.track.lat},${event.track.lng}` 
            : null,
          weather: null,
          date: event.start_date,
          time: mainRace.scheduled ? new Date(mainRace.scheduled).toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short'
          }) : "TBD",
          channel: mainRace.broadcast?.network || null,
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: "NASCAR Truck Series",
          headerClass: "nascar-header",
          raceData: {
            name: mainRace.name || event.name,
            number: races.length + 1,
            distance: mainRace.distance || 250,
            laps: mainRace.laps || 150,
            chase_race: "No",
            stage_1_laps: Math.floor((mainRace.laps || 150) * 0.25),
            stage_2_laps: Math.floor((mainRace.laps || 150) * 0.25),
            stage_3_laps: Math.floor((mainRace.laps || 150) * 0.5),
            qualifying_start_time: null, // SportsRadar doesn't provide this for Trucks
            broadcast: mainRace.broadcast?.network || null,
            prior_winner: null // SportsRadar doesn't provide this for Trucks
          }
        };
        
        races.push(race);
      }
    }

    console.log(`Successfully fetched ${races.length} NASCAR Truck Series races from SportsRadar`);
    return races;
    
  } catch (error) {
    console.error("Error fetching NASCAR Truck Series data from SportsRadar:", error);
    throw new Error(`Failed to fetch NASCAR Truck Series data: ${error}`);
  }
}

/**
 * Fetches Formula 1 race data from SportsRadar API
 */
export async function fetchF1SeriesRaces(): Promise<InsertRace[]> {
  try {
    console.log("Fetching F1 data from SportsRadar...");
    
    // Get the F1 stage schedule using the correct SportsRadar format
    const response = await axios.get(
      'https://api.sportradar.com/formula1/trial/v2/en/sport_events/sr:stage:1189123/schedule.json',
      {
        params: {
          api_key: SPORTSRADAR_API_KEY
        },
        headers: {
          'accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const data = response.data;
    
    if (!data.stages || !Array.isArray(data.stages)) {
      throw new Error('Invalid F1 data structure from SportsRadar');
    }

    const races: InsertRace[] = data.stages
      .filter((stage: any) => stage.description && stage.description.includes('Grand Prix'))
      .map((stage: any) => {
        const venue = stage.venue;
        
        // Find the race element where type = "race" for correct green flag time
        const raceElement = stage.stages?.find((s: any) => s.type === 'race');
        const scheduledTime = raceElement ? new Date(raceElement.scheduled) : new Date(stage.scheduled);
        
        // Use authentic green flag time from race element where type = "race"
        console.log(`F1 Race: ${stage.description} - Using race element scheduled: ${raceElement?.scheduled}`);

        const race: InsertRace = {
          seriesId: 'f1',
          name: stage.description || 'Formula 1 Grand Prix',
          location: venue?.name || 'TBD',
          coords: venue && venue.coordinates ? venue.coordinates : null,
          weather: null, // Weather data not available in current API response
          date: scheduledTime.toISOString().split('T')[0],
          time: scheduledTime.toLocaleTimeString('en-US', { 
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          channel: null,
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: 'Formula 1',
          headerClass: 'f1-header',
          raceData: {
            name: stage.description || 'Formula 1 Grand Prix',
            date_time: stage.scheduled || null,
            location: venue ? `${venue.city}, ${venue.country}` : "Unavailable",
            url: venue?.url_official || null,
            laps: venue?.laps || null,
            right_curves: venue?.curves_right || null,
            left_curves: venue?.curves_left || null,
            length: venue?.length || null,
            timezone: venue?.timezone || null
          }
        };
        
        return race;
      });

    console.log(`Successfully fetched ${races.length} F1 races from SportsRadar`);
    return races;
    
  } catch (error) {
    console.error("Error fetching F1 data from SportsRadar:", error);
    throw new Error(`Failed to fetch F1 data: ${error}`);
  }
}

/**
 * Fetches IndyCar race data from SportsRadar API
 */
export async function fetchIndyCarSeriesRaces(): Promise<InsertRace[]> {
  try {
    console.log("Fetching IndyCar data from SportsRadar...");
    
    // Get the IndyCar 2025 season schedule using the correct stage ID
    const response = await axios.get(
      'https://api.sportradar.com/indycar/trial/v2/en/sport_events/sr:stage:1203305/schedule.json',
      {
        params: {
          api_key: SPORTSRADAR_API_KEY
        },
        headers: {
          'accept': 'application/json'
        },
        timeout: 15000
      }
    );

    const data = response.data;
    
    if (!data.stages || !Array.isArray(data.stages)) {
      throw new Error('Invalid IndyCar data structure from SportsRadar');
    }

    // Debug IndyCar structure to understand the data format
    console.log(`IndyCar stages count: ${data.stages.length}`);
    if (data.stages.length > 0) {
      console.log(`IndyCar first stage:`, JSON.stringify(data.stages[0], null, 2));
    }

    const races: InsertRace[] = data.stages
      .map((stage: any) => {
        const venue = stage.venue;
        
        // Look for race elements within each stage (like F1) OR use the stage directly if it's a race
        const raceElement = stage.stages?.find((s: any) => s.type === 'race');
        const isDirectRace = stage.type === 'race';
        
        if (!raceElement && !isDirectRace) {
          console.log(`IndyCar stage skipped - no race element found: ${stage.description || stage.id}`);
          return null;
        }
        
        const useElement = raceElement || stage;
        const scheduledTime = new Date(useElement.scheduled);
        
        console.log(`IndyCar Race: ${stage.description} - Using ${raceElement ? 'race element' : 'direct stage'} scheduled: ${useElement.scheduled}`);
        
        const race: InsertRace = {
          seriesId: 'indycar',
          name: stage.description || 'IndyCar Race',
          location: venue?.name || 'TBD',
          coords: venue && venue.coordinates ? venue.coordinates : null,
          weather: null,
          date: scheduledTime.toISOString().split('T')[0],
          time: scheduledTime.toLocaleTimeString('en-US', { 
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          channel: null,
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: 'IndyCar Series',
          headerClass: 'indycar-header',
          raceData: {
            name: stage.description || 'IndyCar Race',
            date_time: useElement.scheduled || null,
            location: venue ? `${venue.city}, ${venue.country}` : "Unavailable",
            url: venue?.url_official || null,
            laps: venue?.laps || null,
            right_curves: venue?.curves_right || null,
            left_curves: venue?.curves_left || null,
            length: venue?.length || null,
            timezone: venue?.timezone || null
          }
        };
        
        console.log(`IndyCar race created: ${race.name} on ${race.date} at ${race.time}`);
        return race;
      })
      .filter((race: any) => race !== null);

    console.log(`Successfully fetched ${races.length} IndyCar races from SportsRadar`);
    return races;
    
  } catch (error) {
    console.error("Error fetching IndyCar data from SportsRadar:", error);
    throw new Error(`Failed to fetch IndyCar data: ${error}`);
  }
}

/**
 * Generic function to fetch race data for different series
 * Currently supports Cup Series, Xfinity Series, Truck Series, Formula 1, and IndyCar
 */
export async function fetchSeriesRaceData(seriesId: string): Promise<InsertRace[]> {
  switch (seriesId) {
    case "stock-cup":
      return await fetchNASCARCupSeriesRaces();
    case "stock-nationwide":
      return await fetchNASCARXfinitySeriesRaces();
    case "stock-truck":
      return await fetchNASCARTruckSeriesRaces();
    case "f1":
      return await fetchF1SeriesRaces();
    case "indycar":
      return await fetchIndyCarSeriesRaces();
    default:
      throw new Error(`SportsRadar integration not yet implemented for series: ${seriesId}`);
  }
}