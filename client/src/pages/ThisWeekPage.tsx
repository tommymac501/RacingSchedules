import { useEffect } from "react";
import RaceSchedule from "@/components/RaceSchedule";

const ThisWeekPage = () => {
  useEffect(() => {
    document.title = "This Week's Races - Racing Hub";
  }, []);

  return (
    <RaceSchedule seriesId="all" thisWeekOnly={true} />
  );
};

export default ThisWeekPage;
