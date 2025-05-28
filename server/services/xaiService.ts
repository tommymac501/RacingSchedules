import OpenAI from "openai";

const openai = new OpenAI({ 
  baseURL: "https://api.x.ai/v1", 
  apiKey: process.env.XAI_API_RACING_KEY 
});

/**
 * Gets detailed race schedule information using X.ai
 */
export async function getRaceDetails(raceName: string): Promise<string> {
  try {
    const prompt = `What is the schedule for ${raceName}, return as a list`;

    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "No details available";
  } catch (error) {
    console.error("Failed to get race details from X.ai:", error);
    throw new Error("Failed to fetch race details");
  }
}

/**
 * Gets the top three biggest upcoming races for the next 7 days using authentic SportsRadar API data
 */
export async function getTopThreeRacesThisWeek(): Promise<any[]> {
  try {
    // Import the race data service  
    const { getThisWeekRaces } = await import('./raceData');
    
    // Get actual upcoming races from our authentic SportsRadar data
    const upcomingRaces = await getThisWeekRaces();
    
    console.log(`Found ${upcomingRaces.length} authentic upcoming races:`, upcomingRaces.map(r => `${r.name} on ${r.date}`));
    
    if (upcomingRaces.length === 0) {
      return [];
    }

    // Define race importance ranking based on series prestige
    const seriesImportance = {
      'f1': 10,
      'indycar': 9,
      'stock-cup': 8,
      'stock-nationwide': 6,
      'stock-truck': 5,
      'motogp': 7,
      'arca': 4,
      'world-of-outlaws': 5
    };

    // Sort races by importance and select top 3
    const sortedRaces = upcomingRaces
      .map(race => ({
        ...race,
        importance: seriesImportance[race.seriesId as keyof typeof seriesImportance] || 3
      }))
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 3);

    // Format races for display with authentic data
    return sortedRaces.map(race => ({
      name: race.name,
      series: race.seriesId.replace('stock-', 'NASCAR ').replace('-', ' ').toUpperCase(),
      datetime: `${race.date} at ${race.time || 'TBD'}`,
      network: race.channel || 'TBD',
      description: `${race.name} at ${race.location}`,
      significance: `Upcoming ${race.seriesId.includes('f1') ? 'Formula 1' : race.seriesId.includes('indycar') ? 'IndyCar' : race.seriesId.includes('nascar') || race.seriesId.includes('stock') ? 'NASCAR' : 'motorsport'} race`
    }));
  } catch (error) {
    console.error("Failed to get upcoming races:", error);
    return [];
  }
}