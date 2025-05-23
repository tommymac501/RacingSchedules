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

export const racingSeries: RacingSeries[] = [
  {
    id: "stock-cup",
    name: "Cup Series",
    type: "STOCK",
    description: "Premier stock car racing championship in the United States",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: "/src/assets/cup_series.png"
  },
  {
    id: "stock-nationwide",
    name: "NASCAR Xfinity Series",
    type: "STOCK",
    description: "Second-tier NASCAR stock car racing series",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: "/src/assets/nationwide_series.png"
  },
  {
    id: "stock-truck",
    name: "Truck Series",
    type: "STOCK",
    description: "Pickup truck racing series in the United States",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: "/src/assets/truck_series.png"
  },
  {
    id: "arca",
    name: "ARCA Menards Series",
    type: "STOCK",
    description: "Development racing league for stock cars",
    badgeClass: "nascar-badge",
    headerClass: "nascar-header",
    color: "#ffd659",
    imageSrc: "/src/assets/arca_series.png"
  },
  {
    id: "indycar",
    name: "IndyCar Series",
    type: "INDYCAR",
    description: "Premier American open-wheel racing series",
    badgeClass: "indycar-badge",
    headerClass: "indycar-header",
    color: "#00a6ed",
    imageSrc: "/src/assets/indycar_series.png"
  },
  {
    id: "f1",
    name: "Formula 1",
    type: "F1",
    description: "Highest class of international open-wheel racing",
    badgeClass: "f1-badge",
    headerClass: "f1-header",
    color: "#e10600",
    imageSrc: "/src/assets/f1_series.png"
  },
  {
    id: "world-of-outlaws",
    name: "World of Outlaws",
    type: "OUTLAWS",
    description: "Premier sprint car racing series on dirt tracks",
    badgeClass: "outlaws-badge",
    headerClass: "outlaws-header",
    color: "#1a1a1a",
    imageSrc: "/src/assets/world_of_outlaws.png"
  }
];

export const getSeriesInfo = (seriesId: string): RacingSeries | undefined => {
  return racingSeries.find(series => series.id === seriesId);
};
