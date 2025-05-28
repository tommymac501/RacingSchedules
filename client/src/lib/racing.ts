// Racing Series Data

export interface RacingSeries {
  id: string;
  name: string;
  type: string;
  description: string;
  badgeClass: string;
  headerClass: string;
  color: string;
  imageSrc: string;
}

import cupSeriesImage from "@assets/image_1747920009014.png";
import xfinitySeriesImage from "@assets/image_1747919610007.png";
import truckSeriesImage from "@assets/image_1747919799820.png";
import arcaSeriesImage from "@assets/image_1747919906097.png";
import indycarSeriesImage from "@assets/image_1748007448124.png";
import f1SeriesImage from "@assets/image_1748007994874.png";
import motogpSeriesImage from "@assets/image_1748099160585.png";
import outlawsSeriesImage from "@assets/image_1747919431358.png";

export const racingSeries: RacingSeries[] = [
  {
    id: "stock-cup",
    name: "Cup Series",
    type: "STOCK",
    description: "Premier stock car racing championship in the United States",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: cupSeriesImage
  },
  {
    id: "stock-nationwide",
    name: "NASCAR Xfinity Series",
    type: "STOCK",
    description: "Second-tier NASCAR stock car racing series",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: xfinitySeriesImage
  },
  {
    id: "stock-truck",
    name: "Truck Series",
    type: "STOCK",
    description: "Pickup truck racing series in the United States",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: truckSeriesImage
  },
  {
    id: "arca",
    name: "ARCA Menards Series",
    type: "STOCK",
    description: "Development racing league for stock cars",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: arcaSeriesImage
  },
  {
    id: "indycar",
    name: "IndyCar Series",
    type: "INDYCAR",
    description: "Premier American open-wheel racing series",
    badgeClass: "indycar-badge",
    headerClass: "indycar-header",
    color: "#00a6ed",
    imageSrc: indycarSeriesImage
  },
  {
    id: "f1",
    name: "Formula 1",
    type: "F1",
    description: "Highest class of international open-wheel racing",
    badgeClass: "f1-badge",
    headerClass: "f1-header",
    color: "#e10600",
    imageSrc: f1SeriesImage
  },
  {
    id: "motogp",
    name: "MotoGP",
    type: "MOTOGP",
    description: "Premier motorcycle racing championship",
    badgeClass: "motogp-badge",
    headerClass: "motogp-header",
    color: "#ff6900",
    imageSrc: motogpSeriesImage
  },
  {
    id: "world-of-outlaws",
    name: "World of Outlaws",
    type: "OUTLAWS",
    description: "Premier sprint car racing series on dirt tracks",
    badgeClass: "outlaws-badge",
    headerClass: "outlaws-header",
    color: "#1a1a1a",
    imageSrc: outlawsSeriesImage
  }
];

export const getSeriesInfo = (seriesId: string): RacingSeries | undefined => {
  return racingSeries.find(series => series.id === seriesId);
};
