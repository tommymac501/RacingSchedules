import { DateTime } from "luxon";
import { storage } from "../storage";
import { Race, InsertRace } from "@shared/schema";
import { fetchSeriesRaceData } from "./sportsRadarService";
import { 
  getCupSeriesRaces, 
  getNationwideSeriesRaces,
  getTruckSeriesRaces,
  getARCARaces,
  getWorldOfOutlawsRaces,
  getF1Races,
  getIndyCarRaces,
  getMotoGPRaces
} from "./fixedRaceData";

/**
 * Gets all races for a specific series
 * Uses static race data only
 */
export async function getRacesBySeriesId(seriesId: string): Promise<Race[]> {
  // Return empty array for ARCA, World of Outlaws, and MotoGP to show "Coming Soon"
  if (seriesId === "arca" || seriesId === "world-of-outlaws" || seriesId === "motogp") {
    return [];
  }

  // Ensure static data is loaded for this series
  await loadStaticRaceData(seriesId);

  const races = await storage.getRacesBySeriesId(seriesId);
  
  // Check for valid dates first
  const validRaces = races.filter(race => race.date && DateTime.fromISO(race.date).isValid);
  
  // Filter to only show future races (today and beyond)
  const futureRaces = validRaces.filter(race => {
    const raceDate = DateTime.fromISO(race.date);
    const today = DateTime.now().startOf('day');
    return raceDate >= today;
  });
  
  return futureRaces;
}

/**
 * Gets all races across all series
 */
export async function getAllRaces(): Promise<Race[]> {
  // Load static data for all series (excluding Coming Soon series)
  const seriesIds = ["stock-cup", "stock-nationwide", "stock-truck", "f1", "indycar"];
  
  for (const seriesId of seriesIds) {
    await loadStaticRaceData(seriesId);
  }

  const now = DateTime.now();
  const races = await storage.getAllRaces();
  
  // Filter to only show future races and sort by date
  return races
    .filter(race => {
      const raceDate = DateTime.fromISO(race.date);
      return raceDate >= now;
    })
    .sort((a, b) => {
      const dateA = DateTime.fromISO(a.date);
      const dateB = DateTime.fromISO(b.date);
      return dateA.valueOf() - dateB.valueOf();
    });
}

/**
 * Gets races happening in the next 7 days across all series
 * Sorted in the specified order: Cup, Nationwide, Trucks, ARCA, World of Outlaws, F1, IndyCar
 */
export async function getThisWeekRaces(): Promise<Race[]> {
  // Load static data for all series first
  await getAllRaces();

  const races = await storage.getThisWeekRaces();
  
  // Define the series priority order
  const seriesOrder = {
    "stock-cup": 1,
    "stock-nationwide": 2,
    "stock-truck": 3,
    "arca": 4,
    "world-of-outlaws": 5,
    "f1": 6,
    "indycar": 7
  };
  
  // Sort the races by series priority first, then by date
  return races.sort((a, b) => {
    // First sort by series priority
    const seriesPriorityA = seriesOrder[a.seriesId as keyof typeof seriesOrder] || 99;
    const seriesPriorityB = seriesOrder[b.seriesId as keyof typeof seriesOrder] || 99;
    
    if (seriesPriorityA !== seriesPriorityB) {
      return seriesPriorityA - seriesPriorityB;
    }
    
    // If same series, sort by date
    const dateA = DateTime.fromISO(a.date);
    const dateB = DateTime.fromISO(b.date);
    return dateA.valueOf() - dateB.valueOf();
  });
}

/**
 * Loads race data for a specific series using SportsRadar API with fallback to static data
 */
async function loadStaticRaceData(seriesId: string): Promise<void> {
  try {
    // Skip loading data for ARCA and World of Outlaws (Coming Soon series)
    if (seriesId === "arca" || seriesId === "world-of-outlaws") {
      // Clear any existing data for these series
      const existingRaces = await storage.getRacesBySeriesId(seriesId);
      for (const race of existingRaces) {
        if (race.id !== undefined) {
          await storage.deleteRace(race.id);
        }
      }
      return; // Don't load any new data
    }

    // For series with SportsRadar data, always refresh to get latest data
    if (seriesId === "stock-cup" || seriesId === "stock-nationwide" || seriesId === "stock-truck" || seriesId === "f1" || seriesId === "indycar") {
      // Clear existing data to get fresh SportsRadar data
      const existingRaces = await storage.getRacesBySeriesId(seriesId);
      for (const race of existingRaces) {
        if (race.id !== undefined) {
          await storage.deleteRace(race.id);
        }
      }
    } else {
      // For other series, check if we already have static data
      const existingRaces = await storage.getRacesBySeriesId(seriesId);
      if (existingRaces.length > 0) {
        return; // Data already loaded
      }
    }

    let raceData: InsertRace[] = [];
    
    // Try to get live data from SportsRadar for supported series
    if (seriesId === "stock-cup" || seriesId === "stock-nationwide" || seriesId === "stock-truck" || seriesId === "f1" || seriesId === "indycar") {
      try {
        let seriesName = "NASCAR Cup Series";
        if (seriesId === "stock-nationwide") seriesName = "NASCAR Xfinity Series";
        if (seriesId === "stock-truck") seriesName = "NASCAR Truck Series";
        if (seriesId === "f1") seriesName = "Formula 1";
        if (seriesId === "indycar") seriesName = "IndyCar Series";
        
        console.log(`Fetching live ${seriesName} data from SportsRadar...`);
        raceData = await fetchSeriesRaceData(seriesId);
        console.log(`Successfully loaded ${raceData.length} races from SportsRadar for ${seriesId}`);
      } catch (error) {
        console.error(`SportsRadar API failed for ${seriesId}, falling back to static data:`, error);
        if (seriesId === "stock-cup") {
          raceData = getCupSeriesRaces();
        } else if (seriesId === "stock-nationwide") {
          raceData = getNationwideSeriesRaces();
        } else if (seriesId === "stock-truck") {
          raceData = getTruckSeriesRaces();
        } else if (seriesId === "f1") {
          raceData = getF1Races();
        } else if (seriesId === "indycar") {
          raceData = getIndyCarRaces();
        }
      }
    } else {
      // Use static data for other series
      switch (seriesId) {
        case "stock-nationwide":
          raceData = getNationwideSeriesRaces();
          break;
        case "stock-truck":
          raceData = getTruckSeriesRaces();
          break;
        case "arca":
          raceData = getARCARaces();
          break;
        case "world-of-outlaws":
          raceData = getWorldOfOutlawsRaces();
          break;
        case "f1":
          raceData = getF1Races();
          break;
        case "indycar":
          raceData = getIndyCarRaces();
          break;
        case "motogp":
          raceData = getMotoGPRaces();
          break;
        default:
          return; // No data for unknown series
      }
    }
    
    // Add the races to storage
    for (const race of raceData) {
      await storage.createRace(race);
    }
    
  } catch (error: any) {
    console.error(`Failed to load race data for ${seriesId}:`, error);
  }
}