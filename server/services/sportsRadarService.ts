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
          headerClass: "nascar-header"
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
          headerClass: "nascar-header"
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
          headerClass: "nascar-header"
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
    
    // Get the F1 season schedule using the specific stage ID
    const response = await axios.get(
      'https://api.sportradar.com/formula1/trial/v2/en/sport_events/sr%3Astage%3A1189123/schedule.json',
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': SPORTSRADAR_API_KEY
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
        const scheduledTime = new Date(stage.scheduled);
        
        // SportsRadar F1 API doesn't provide weather or temperature data
        // Set to null so the UI handles it appropriately

        const race: InsertRace = {
          seriesId: 'f1',
          name: stage.description || 'Formula 1 Grand Prix',
          location: venue?.name || 'TBD',
          coords: venue && venue.coordinates ? `${venue.coordinates.latitude},${venue.coordinates.longitude}` : null,
          weather: null,
          date: scheduledTime.toISOString().split('T')[0],
          time: scheduledTime.toLocaleTimeString('en-US', { 
            timeZone: 'America/New_York',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short'
          }),
          channel: null, // SportsRadar doesn't provide broadcast info for F1
          practiceTimes: null,
          qualifyingTimes: null,
          seriesName: 'Formula 1',
          headerClass: 'f1-header'
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
    
    // Get the IndyCar season schedule using the specific stage ID
    const response = await axios.get(
      'https://api.sportradar.com/indycar/trial/v2/en/sport_events/sr%3Astage%3A1122936/schedule.json',
      {
        headers: {
          'accept': 'application/json',
          'x-api-key': SPORTSRADAR_API_KEY
        },
        timeout: 15000
      }
    );

    const data = response.data;
    
    if (!data.stages || !Array.isArray(data.stages)) {
      throw new Error('Invalid IndyCar data structure from SportsRadar');
    }

    const races: InsertRace[] = data.stages.map((stage: any) => {
      const venue = stage.venue;
      const startTime = stage.start_time ? new Date(stage.start_time) : new Date();
      
      // Generate race name from venue if not provided
      let raceName = stage.name;
      if (!raceName && venue?.name) {
        raceName = venue.name.includes('Grand Prix') 
          ? venue.name 
          : `${venue.city_name || venue.name} IndyCar Race`;
      }
      
      const race: InsertRace = {
        seriesId: 'indycar',
        name: raceName || 'IndyCar Race',
        location: venue ? `${venue.name}, ${venue.city_name}, ${venue.country_name}` : 'TBD',
        coords: venue && venue.coordinates ? `${venue.coordinates.latitude},${venue.coordinates.longitude}` : null,
        weather: null,
        date: startTime.toISOString().split('T')[0],
        time: startTime.toLocaleTimeString('en-US', { 
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short'
        }),
        channel: 'NBC',
        practiceTimes: null,
        qualifyingTimes: null,
        seriesName: 'IndyCar Series',
        headerClass: 'indycar-header'
      };
      
      return race;
    });

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