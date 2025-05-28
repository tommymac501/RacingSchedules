import { useEffect } from "react";
import { useParams } from "wouter";
import RaceSchedule from "@/components/RaceSchedule";
import { getSeriesInfo } from "@/lib/racing";

const SchedulePage = () => {
  const params = useParams<{ seriesId: string }>();
  const seriesId = params.seriesId;
  const seriesInfo = getSeriesInfo(seriesId);

  useEffect(() => {
    document.title = seriesInfo 
      ? `${seriesInfo.name} Schedule - RaceTimes`
      : "Race Schedule - RaceTimes";
  }, [seriesInfo]);

  return (
    <RaceSchedule seriesId={seriesId} />
  );
};

export default SchedulePage;
