import { Race, InsertRace, Series, InsertSeries, User, InsertUser } from "@shared/schema";
import { DateTime } from "luxon";

// Define the storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Series methods
  getAllSeries(): Promise<Series[]>;
  getSeriesById(id: number): Promise<Series | undefined>;
  getSeriesBySeriesId(seriesId: string): Promise<Series | undefined>;
  createSeries(series: InsertSeries): Promise<Series>;
  
  // Race methods
  getAllRaces(): Promise<Race[]>;
  getRaceById(id: number): Promise<Race | undefined>;
  getRacesBySeriesId(seriesId: string): Promise<Race[]>;
  getThisWeekRaces(): Promise<Race[]>;
  createRace(race: InsertRace): Promise<Race>;
  deleteRace(id: number): Promise<void>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private series: Map<number, Series>;
  private races: Map<number, Race>;
  private userId: number;
  private seriesId: number;
  private raceId: number;
  
  async deleteRace(id: number): Promise<void> {
    if (this.races.has(id)) {
      this.races.delete(id);
    }
  }

  constructor() {
    this.users = new Map();
    this.series = new Map();
    this.races = new Map();
    this.userId = 1;
    this.seriesId = 1;
    this.raceId = 1;
    
    // Initialize with default data
    this.initDefaultData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Series methods
  async getAllSeries(): Promise<Series[]> {
    return Array.from(this.series.values());
  }
  
  async getSeriesById(id: number): Promise<Series | undefined> {
    return this.series.get(id);
  }
  
  async getSeriesBySeriesId(seriesId: string): Promise<Series | undefined> {
    return Array.from(this.series.values()).find(
      (series) => series.seriesId === seriesId
    );
  }
  
  async createSeries(insertSeries: InsertSeries): Promise<Series> {
    const id = this.seriesId++;
    const series: Series = { 
      ...insertSeries, 
      id,
      description: insertSeries.description || null,
      badgeClass: insertSeries.badgeClass || null,
      headerClass: insertSeries.headerClass || null,
      color: insertSeries.color || null,
      imageSrc: insertSeries.imageSrc || null
    };
    this.series.set(id, series);
    return series;
  }
  
  // Race methods
  async getAllRaces(): Promise<Race[]> {
    return Array.from(this.races.values());
  }
  
  async getRaceById(id: number): Promise<Race | undefined> {
    return this.races.get(id);
  }
  
  async getRacesBySeriesId(seriesId: string): Promise<Race[]> {
    return Array.from(this.races.values())
      .filter((race) => race.seriesId === seriesId)
      .sort((a, b) => {
        const dateA = DateTime.fromISO(a.date);
        const dateB = DateTime.fromISO(b.date);
        return dateA.valueOf() - dateB.valueOf();
      });
  }
  
  async getThisWeekRaces(): Promise<Race[]> {
    const now = DateTime.now().startOf('day');
    const oneWeekFromNow = now.plus({ days: 7 }).endOf('day');
    
    // For debugging
    console.log(`Looking for races between ${now.toISO()} and ${oneWeekFromNow.toISO()}`);
    
    const filteredRaces = Array.from(this.races.values())
      .filter((race) => {
        const raceDate = DateTime.fromISO(race.date);
        const isInRange = raceDate >= now && raceDate <= oneWeekFromNow;
        
        // For debugging
        if (isInRange) {
          console.log(`Found race in range: ${race.name} on ${race.date}`);
        }
        
        return isInRange;
      })
      .sort((a, b) => {
        const dateA = DateTime.fromISO(a.date);
        const dateB = DateTime.fromISO(b.date);
        return dateA.valueOf() - dateB.valueOf();
      });
    
    // For debugging
    console.log(`Found ${filteredRaces.length} races this week`);
    
    return filteredRaces;
  }
  
  async createRace(insertRace: InsertRace): Promise<Race> {
    const id = this.raceId++;
    const now = new Date();
    const race: Race = { 
      ...insertRace, 
      id, 
      coords: insertRace.coords || null,
      weather: insertRace.weather || null,
      channel: insertRace.channel || null,
      practiceTimes: insertRace.practiceTimes || null,
      qualifyingTimes: insertRace.qualifyingTimes || null,
      seriesName: insertRace.seriesName || null,
      headerClass: insertRace.headerClass || null,
      raceData: insertRace.raceData || null,
      createdAt: now
    };
    this.races.set(id, race);
    return race;
  }
  
  // Initialize with default data
  private initDefaultData() {
    // Create series
    const seriesData: InsertSeries[] = [
      {
        seriesId: "stock-cup",
        name: "Cup Series",
        type: "STOCK",
        description: "Premier stock car racing championship in the United States",
        badgeClass: "nascar-badge",
        headerClass: "nascar-header",
        color: "#ffd659",
        imageSrc: "/src/assets/cup_series.png"
      },
      {
        seriesId: "stock-nationwide",
        name: "Nationwide Series",
        type: "STOCK",
        description: "Second-tier nationwide stock car racing series",
        badgeClass: "nascar-badge",
        headerClass: "nascar-header",
        color: "#ffd659",
        imageSrc: "/src/assets/nationwide_series.png"
      },
      {
        seriesId: "stock-truck",
        name: "Truck Series",
        type: "STOCK",
        description: "Pickup truck racing series in the United States",
        badgeClass: "nascar-badge",
        headerClass: "nascar-header",
        color: "#ffd659",
        imageSrc: "/src/assets/truck_series.png"
      },
      {
        seriesId: "arca",
        name: "ARCA Menards Series",
        type: "STOCK",
        description: "Development racing league for stock cars",
        badgeClass: "nascar-badge",
        headerClass: "nascar-header",
        color: "#ffd659",
        imageSrc: "/src/assets/arca_series.png"
      },
      {
        seriesId: "indycar",
        name: "IndyCar Series",
        type: "INDYCAR",
        description: "Premier American open-wheel racing series",
        badgeClass: "indycar-badge",
        headerClass: "indycar-header",
        color: "#00a6ed",
        imageSrc: "/src/assets/indycar_series.png"
      },
      {
        seriesId: "f1",
        name: "Formula 1",
        type: "F1",
        description: "Highest class of international open-wheel racing",
        badgeClass: "f1-badge",
        headerClass: "f1-header",
        color: "#e10600",
        imageSrc: "https://pixabay.com/get/gcb9837941816cd904ca8575f918b72b324756e55c1bfafcca5afdd408aa4511403c916ebb1a26055c3e0acfee815c864bb497b0bc988ef314c34f522d79b1635_1280.jpg"
      },
      {
        seriesId: "world-of-outlaws",
        name: "World of Outlaws",
        type: "OUTLAWS",
        description: "Premier sprint car racing series on dirt tracks",
        badgeClass: "outlaws-badge",
        headerClass: "outlaws-header",
        color: "#1a1a1a",
        imageSrc: "/src/assets/world_of_outlaws.png"
      }
    ];
    
    seriesData.forEach(series => this.createSeries(series));
    
    // Create some races for each series
    const now = DateTime.now();
    console.log(`Current date: ${now.toISO()}`);
    
    // Stock car races
    const nascarCupRaces: InsertRace[] = [
      {
        seriesId: "stock-cup",
        name: "Memorial Day 600",
        location: "Charlotte Motor Speedway, North Carolina",
        coords: "35.3522,-80.6831",
        weather: "Partly cloudy, 75°F",
        date: now.plus({ days: 2 }).toISODate()!,
        time: "6:00 PM ET",
        channel: "Amazon Prime",
        practiceTimes: "Fri, 4:00 PM ET",
        qualifyingTimes: "Sat, 1:00 PM ET",
        seriesName: "Cup Series",
        headerClass: "nascar-header"
      },
      {
        seriesId: "stock-cup",
        name: "Illinois 300",
        location: "World Wide Technology Raceway, Madison, IL",
        coords: "38.6506,-90.1367",
        weather: "Sunny, 82°F",
        date: now.plus({ days: 12 }).toISODate()!,
        time: "3:30 PM ET",
        channel: "USA Network",
        practiceTimes: "Fri, 5:30 PM ET",
        qualifyingTimes: "Sat, 12:00 PM ET",
        seriesName: "Cup Series",
        headerClass: "nascar-header"
      },
      {
        seriesId: "stock-cup",
        name: "Sonoma 350",
        location: "Sonoma Raceway, California",
        coords: "38.1610,-122.4547",
        weather: "Clear, 68°F",
        date: now.plus({ days: 19 }).toISODate()!,
        time: "4:00 PM ET",
        channel: "TNT",
        practiceTimes: "Fri, 6:30 PM ET",
        qualifyingTimes: "Sat, 5:00 PM ET",
        seriesName: "Cup Series",
        headerClass: "nascar-header"
      }
    ];
    
    // Stock car nationwide races
    const nascarNationwideRaces: InsertRace[] = [
      {
        seriesId: "stock-nationwide",
        name: "Charlotte 300",
        location: "Charlotte Motor Speedway, North Carolina",
        coords: "35.3522,-80.6831",
        weather: "Scattered clouds, 73°F",
        date: now.plus({ days: 1 }).toISODate()!,
        time: "1:00 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 3:00 PM ET",
        qualifyingTimes: "Sat, 10:00 AM ET",
        seriesName: "Nationwide Series",
        headerClass: "nascar-header"
      },
      {
        seriesId: "stock-nationwide",
        name: "Portland 147",
        location: "Portland International Raceway, Oregon",
        coords: "45.5967,-122.6874",
        weather: "Light rain, 62°F",
        date: now.plus({ days: 11 }).toISODate()!,
        time: "4:30 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 7:00 PM ET",
        qualifyingTimes: "Sat, 12:30 PM ET",
        seriesName: "Nationwide Series",
        headerClass: "nascar-header"
      }
    ];
    
    // Truck Series races
    const truckSeriesRaces: InsertRace[] = [
      {
        seriesId: "stock-truck",
        name: "North Carolina Education Lottery 200",
        location: "Charlotte Motor Speedway, North Carolina",
        coords: "35.3522,-80.6831",
        weather: "Clear, 72°F",
        date: now.plus({ days: 3 }).toISODate()!,
        time: "8:30 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 2:00 PM ET",
        qualifyingTimes: "Fri, 3:30 PM ET",
        seriesName: "Truck Series",
        headerClass: "nascar-header"
      },
      {
        seriesId: "stock-truck",
        name: "Toyota 200",
        location: "World Wide Technology Raceway, Madison, IL",
        coords: "38.6513,-90.1505",
        weather: "Sunny, 78°F",
        date: now.plus({ days: 12 }).toISODate()!,
        time: "1:30 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 4:00 PM ET",
        qualifyingTimes: "Sat, 10:00 AM ET",
        seriesName: "Truck Series",
        headerClass: "nascar-header"
      }
    ];
    
    // ARCA Menards Series races
    const arcaRaces: InsertRace[] = [
      {
        seriesId: "arca",
        name: "General Tire 150",
        location: "Charlotte Motor Speedway, North Carolina",
        coords: "35.3522,-80.6831",
        weather: "Partly cloudy, 75°F",
        date: now.plus({ days: 4 }).toISODate()!,
        time: "6:00 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 12:30 PM ET",
        qualifyingTimes: "Fri, 2:00 PM ET",
        seriesName: "ARCA Menards Series",
        headerClass: "nascar-header"
      },
      {
        seriesId: "arca",
        name: "Zinsser SmartCoat 200",
        location: "Mid-Ohio Sports Car Course, Lexington, OH",
        coords: "40.6906,-82.6389",
        weather: "Sunny, 72°F",
        date: now.plus({ days: 17 }).toISODate()!,
        time: "1:00 PM ET",
        channel: "FS1",
        practiceTimes: "Fri, 3:30 PM ET",
        qualifyingTimes: "Sat, 10:00 AM ET",
        seriesName: "ARCA Menards Series",
        headerClass: "nascar-header"
      }
    ];
    
    // IndyCar Series races
    const indycarRaces: InsertRace[] = [
      {
        seriesId: "indycar",
        name: "107th Indianapolis 500",
        location: "Indianapolis Motor Speedway, Indiana",
        coords: "39.7903,-86.2394",
        weather: "Partly cloudy, 77°F",
        date: now.plus({ days: 1 }).toISODate()!,
        time: "12:45 PM ET",
        channel: "NBC",
        practiceTimes: "Fri, 11:00 AM ET",
        qualifyingTimes: "Sat, 2:00 PM ET",
        seriesName: "IndyCar Series",
        headerClass: "indycar-header"
      },
      {
        seriesId: "indycar",
        name: "Detroit Grand Prix",
        location: "Detroit Street Circuit, Michigan",
        coords: "42.3314,-83.0458",
        weather: "Sunny, 75°F",
        date: now.plus({ days: 11 }).toISODate()!,
        time: "3:00 PM ET",
        channel: "USA Network",
        practiceTimes: "Fri, 3:30 PM ET",
        qualifyingTimes: "Sat, 12:45 PM ET",
        seriesName: "IndyCar Series",
        headerClass: "indycar-header"
      }
    ];
    
    // Formula 1 races
    const f1Races: InsertRace[] = [
      {
        seriesId: "f1",
        name: "Monaco Grand Prix",
        location: "Circuit de Monaco, Monte Carlo",
        coords: "43.7347,7.4206",
        weather: "Clear, 70°F",
        date: now.plus({ days: 4 }).toISODate()!,
        time: "9:00 AM ET",
        channel: "ESPN",
        practiceTimes: "Fri, 7:30 AM ET",
        qualifyingTimes: "Sat, 10:00 AM ET",
        seriesName: "Formula 1",
        headerClass: "f1-header"
      },
      {
        seriesId: "f1",
        name: "Canadian Grand Prix",
        location: "Circuit Gilles Villeneuve, Montreal",
        coords: "45.5017,-73.5291",
        weather: "Cloudy, 65°F",
        date: now.plus({ days: 18 }).toISODate()!,
        time: "2:00 PM ET",
        channel: "ESPN",
        practiceTimes: "Fri, 1:30 PM ET",
        qualifyingTimes: "Sat, 4:00 PM ET",
        seriesName: "Formula 1",
        headerClass: "f1-header"
      }
    ];
    
    // World of Outlaws races
    const worldOfOutlawsRaces: InsertRace[] = [
      {
        seriesId: "world-of-outlaws",
        name: "World of Outlaws at Atomic Speedway",
        location: "Atomic Speedway, Chillicothe, OH",
        coords: "39.1836,-83.0029",
        weather: "Clear, 72°F",
        date: now.plus({ days: 3 }).toISODate()!,
        time: "7:00 PM ET",
        channel: "DIRTVision",
        practiceTimes: "Fri, 5:00 PM ET",
        qualifyingTimes: "Sat, 6:00 PM ET",
        seriesName: "World of Outlaws",
        headerClass: "outlaws-header"
      },
      {
        seriesId: "world-of-outlaws",
        name: "World of Outlaws at Eldora Speedway",
        location: "Eldora Speedway, New Weston, OH",
        coords: "40.3195,-84.6331",
        weather: "Partly cloudy, 75°F",
        date: now.plus({ days: 6 }).toISODate()!,
        time: "7:30 PM ET",
        channel: "DIRTVision",
        practiceTimes: "Fri, 6:00 PM ET",
        qualifyingTimes: "Sat, 7:00 PM ET",
        seriesName: "World of Outlaws",
        headerClass: "outlaws-header"
      }
    ];
    
    // Add all races
    const allRaces = [
      ...nascarCupRaces,
      ...nascarNationwideRaces,
      ...truckSeriesRaces,
      ...arcaRaces,
      ...indycarRaces,
      ...f1Races,
      ...worldOfOutlawsRaces
    ];
    
    allRaces.forEach(race => this.createRace(race));
  }
}

export const storage = new MemStorage();
