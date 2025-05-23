import { InsertRace } from "@shared/schema";

// Fixed race data for Cup Series
export const getCupSeriesRaces = (): InsertRace[] => {
  return [
    {
      seriesId: "stock-cup",
      name: "Memorial Day 600",
      location: "Charlotte Motor Speedway, Concord, North Carolina",
      coords: "35.3522,-80.6831",
      weather: "Partly cloudy, 75°F",
      date: "2025-05-25",
      time: "6:00 PM ET",
      channel: "Amazon Prime",
      practiceTimes: "Fri, 4:00 PM ET",
      qualifyingTimes: "Sat, 1:00 PM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-cup",
      name: "Cracker Barrel 400",
      location: "Nashville Superspeedway, Lebanon, Tennessee",
      coords: "36.0875,-86.6642",
      weather: "Clear, 78°F",
      date: "2025-06-01",
      time: "5:00 PM ET",
      channel: "NBC",
      practiceTimes: "Fri, 3:00 PM ET",
      qualifyingTimes: "Sat, 1:30 PM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-cup",
      name: "Iowa Corn 350",
      location: "Iowa Speedway, Newton, Iowa",
      coords: "41.6749,-93.0127",
      weather: "Partly cloudy, 76°F",
      date: "2025-06-15",
      time: "3:30 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 5:00 PM ET",
      qualifyingTimes: "Sat, 12:30 PM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-cup",
      name: "USA Today 301",
      location: "New Hampshire Motor Speedway, Loudon, New Hampshire",
      coords: "43.3609,-71.4631",
      weather: "Sunny, 72°F",
      date: "2025-06-22",
      time: "2:30 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 4:30 PM ET",
      qualifyingTimes: "Sat, 11:30 AM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-cup",
      name: "Chicago Street Race",
      location: "Chicago Street Course, Chicago, Illinois",
      coords: "41.8781,-87.6298",
      weather: "Clear, 82°F",
      date: "2025-06-29",
      time: "4:30 PM ET",
      channel: "NBC",
      practiceTimes: "Sat, 11:00 AM ET",
      qualifyingTimes: "Sat, 2:30 PM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-cup",
      name: "Quaker State 400",
      location: "Atlanta Motor Speedway, Hampton, Georgia",
      coords: "33.3862,-84.3159",
      weather: "Partly cloudy, 85°F",
      date: "2025-07-06",
      time: "3:00 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 5:30 PM ET",
      qualifyingTimes: "Sat, 12:00 PM ET",
      seriesName: "Cup Series",
      headerClass: "nascar-header"
    }
  ];
};

// Fixed race data for Nationwide Series
export const getNationwideSeriesRaces = (): InsertRace[] => {
  return [
    {
      seriesId: "stock-nationwide",
      name: "Charlotte 300",
      location: "Charlotte Motor Speedway, Concord, North Carolina",
      coords: "35.3522,-80.6831",
      weather: "Scattered clouds, 73°F",
      date: "2025-05-24",
      time: "1:00 PM ET",
      channel: "FS1",
      practiceTimes: "Fri, 3:00 PM ET",
      qualifyingTimes: "Sat, 10:00 AM ET",
      seriesName: "Nationwide Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-nationwide",
      name: "Tennessee Lottery 250",
      location: "Nashville Superspeedway, Lebanon, Tennessee",
      coords: "36.0875,-86.6642",
      weather: "Clear, 77°F",
      date: "2025-05-31",
      time: "3:30 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 1:30 PM ET",
      qualifyingTimes: "Sat, 11:00 AM ET",
      seriesName: "Nationwide Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-nationwide",
      name: "Iowa 250",
      location: "Iowa Speedway, Newton, Iowa",
      coords: "41.6749,-93.0127",
      weather: "Mostly sunny, 74°F",
      date: "2025-06-14",
      time: "4:00 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 2:00 PM ET",
      qualifyingTimes: "Sat, 12:00 PM ET",
      seriesName: "Nationwide Series",
      headerClass: "nascar-header"
    }
  ];
};

// Fixed race data for Truck Series
export const getTruckSeriesRaces = (): InsertRace[] => {
  return [
    {
      seriesId: "stock-truck",
      name: "North Carolina Education Lottery 200",
      location: "Charlotte Motor Speedway, Concord, North Carolina",
      coords: "35.3522,-80.6831",
      weather: "Clear, 72°F",
      date: "2025-05-24",
      time: "8:30 PM ET",
      channel: "FS1",
      practiceTimes: "Fri, 2:00 PM ET",
      qualifyingTimes: "Fri, 3:30 PM ET",
      seriesName: "Truck Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "stock-truck",
      name: "Nashville 200",
      location: "Nashville Superspeedway, Lebanon, Tennessee",
      coords: "36.0875,-86.6642",
      weather: "Partly cloudy, 79°F",
      date: "2025-05-31",
      time: "8:00 PM ET",
      channel: "FS1",
      practiceTimes: "Fri, 4:00 PM ET",
      qualifyingTimes: "Fri, 5:30 PM ET",
      seriesName: "Truck Series",
      headerClass: "nascar-header"
    }
  ];
};

// Fixed race data for ARCA Menards Series
export const getARCARaces = (): InsertRace[] => {
  return [
    {
      seriesId: "arca",
      name: "General Tire 150",
      location: "Charlotte Motor Speedway, Concord, North Carolina",
      coords: "35.3522,-80.6831",
      weather: "Partly cloudy, 75°F",
      date: "2025-05-24",
      time: "6:00 PM ET",
      channel: "FS1",
      practiceTimes: "Fri, 12:30 PM ET",
      qualifyingTimes: "Fri, 2:00 PM ET",
      seriesName: "ARCA Menards Series",
      headerClass: "nascar-header"
    },
    {
      seriesId: "arca",
      name: "ARCA Nashville 150",
      location: "Nashville Superspeedway, Lebanon, Tennessee",
      coords: "36.0875,-86.6642",
      weather: "Clear, 76°F",
      date: "2025-05-30",
      time: "6:00 PM ET",
      channel: "FS1",
      practiceTimes: "Fri, 1:00 PM ET",
      qualifyingTimes: "Fri, 3:00 PM ET",
      seriesName: "ARCA Menards Series",
      headerClass: "nascar-header"
    }
  ];
};

// Fixed race data for World of Outlaws
export const getWorldOfOutlawsRaces = (): InsertRace[] => {
  return [
    {
      seriesId: "world-of-outlaws",
      name: "World of Outlaws at Atomic Speedway",
      location: "Atomic Speedway, Chillicothe, Ohio",
      coords: "39.1836,-83.0029",
      weather: "Clear, 72°F",
      date: "2025-05-25",
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
      location: "Eldora Speedway, New Weston, Ohio",
      coords: "40.3195,-84.6331",
      weather: "Partly cloudy, 75°F",
      date: "2025-06-07",
      time: "7:30 PM ET",
      channel: "DIRTVision",
      practiceTimes: "Fri, 6:00 PM ET",
      qualifyingTimes: "Sat, 7:00 PM ET",
      seriesName: "World of Outlaws",
      headerClass: "outlaws-header"
    }
  ];
};

// Fixed race data for Formula 1
export const getF1Races = (): InsertRace[] => {
  return [
    {
      seriesId: "f1",
      name: "Monaco Grand Prix",
      location: "Circuit de Monaco, Monte Carlo, Monaco",
      coords: "43.7347,7.4206",
      weather: "Clear, 70°F",
      date: "2025-05-25",
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
      location: "Circuit Gilles Villeneuve, Montreal, Canada",
      coords: "45.5017,-73.5291",
      weather: "Cloudy, 65°F",
      date: "2025-06-08",
      time: "2:00 PM ET",
      channel: "ESPN",
      practiceTimes: "Fri, 1:30 PM ET",
      qualifyingTimes: "Sat, 4:00 PM ET",
      seriesName: "Formula 1",
      headerClass: "f1-header"
    }
  ];
};

// Fixed race data for IndyCar Series
export const getIndyCarRaces = (): InsertRace[] => {
  return [
    {
      seriesId: "indycar",
      name: "107th Indianapolis 500",
      location: "Indianapolis Motor Speedway, Indianapolis, Indiana",
      coords: "39.7903,-86.2394",
      weather: "Partly cloudy, 77°F",
      date: "2025-05-25",
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
      location: "Detroit Street Circuit, Detroit, Michigan",
      coords: "42.3314,-83.0458",
      weather: "Sunny, 75°F",
      date: "2025-06-01",
      time: "3:00 PM ET",
      channel: "USA Network",
      practiceTimes: "Fri, 3:30 PM ET",
      qualifyingTimes: "Sat, 12:45 PM ET",
      seriesName: "IndyCar Series",
      headerClass: "indycar-header"
    }
  ];
};