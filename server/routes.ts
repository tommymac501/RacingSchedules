import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getRacesBySeriesId, getAllRaces, getThisWeekRaces } from "./services/raceData";
import { getRaceDetails, getTopThreeRacesThisWeek } from "./services/xaiService";
import { Race } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Define API routes
  const apiRouter = express.Router();
  
  // Get this week's races across all series
  apiRouter.get("/races/this-week", async (req, res) => {
    try {
      const races = await getThisWeekRaces();
      return res.json(races);
    } catch (error) {
      console.error("Error fetching this week's races:", error);
      return res.status(500).json({ message: "Failed to fetch race data" });
    }
  });
  
  // Get races for a specific series
  apiRouter.get("/races/:seriesId", async (req, res) => {
    try {
      const { seriesId } = req.params;
      
      // If seriesId is "all", return all races
      let races: Race[];
      if (seriesId === "all") {
        races = await getAllRaces();
      } else {
        races = await getRacesBySeriesId(seriesId);
      }
      
      return res.json(races);
    } catch (error) {
      console.error("Error fetching race data:", error);
      return res.status(500).json({ message: "Failed to fetch race data" });
    }
  });

  // Get race details from X.ai
  apiRouter.post("/race-details", async (req, res) => {
    try {
      const { raceName } = req.body;
      
      if (!raceName) {
        return res.status(400).json({ message: "Race name is required" });
      }

      const details = await getRaceDetails(raceName);
      return res.json({ details });
    } catch (error) {
      console.error("Error fetching race details:", error);
      return res.status(500).json({ message: "Failed to fetch race details" });
    }
  });

  // Get top three races for the current week from X.ai
  apiRouter.get("/top-three-races", async (req, res) => {
    try {
      const topRaces = await getTopThreeRacesThisWeek();
      return res.json({ races: topRaces });
    } catch (error) {
      console.error("Error fetching top three races:", error);
      return res.status(500).json({ message: "Failed to fetch top races" });
    }
  });
  
  // Mount API routes
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}