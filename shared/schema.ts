import { pgTable, text, serial, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Racing series schema
export const racingSeries = pgTable("racing_series", {
  id: serial("id").primaryKey(),
  seriesId: varchar("series_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  description: text("description"),
  badgeClass: varchar("badge_class", { length: 50 }),
  headerClass: varchar("header_class", { length: 50 }),
  color: varchar("color", { length: 50 }),
  imageSrc: text("image_src"),
});

export const insertSeriesSchema = createInsertSchema(racingSeries).omit({
  id: true,
});

// Races schema
export const races = pgTable("races", {
  id: serial("id").primaryKey(),
  seriesId: varchar("series_id", { length: 50 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  location: text("location").notNull(),
  coords: varchar("coords", { length: 50 }),
  weather: text("weather"),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  channel: varchar("channel", { length: 50 }),
  practiceTimes: varchar("practice_times", { length: 50 }),
  qualifyingTimes: varchar("qualifying_times", { length: 50 }),
  seriesName: varchar("series_name", { length: 100 }),
  headerClass: varchar("header_class", { length: 50 }),
  raceData: json("race_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRaceSchema = createInsertSchema(races).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSeries = z.infer<typeof insertSeriesSchema>;
export type Series = typeof racingSeries.$inferSelect;

export type InsertRace = z.infer<typeof insertRaceSchema>;
export type Race = typeof races.$inferSelect;
