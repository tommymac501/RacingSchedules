import { useEffect } from "react";
import Hero from "@/components/Hero";
import SeriesGrid from "@/components/SeriesGrid";
import ThisWeekPreview from "@/components/ThisWeekPreview";

const HomePage = () => {
  useEffect(() => {
    document.title = "RaceTimes - Ultimate Racing Schedule Tracker";
  }, []);

  return (
    <>
      <Hero />
      <SeriesGrid />
      <ThisWeekPreview />
    </>
  );
};

export default HomePage;
