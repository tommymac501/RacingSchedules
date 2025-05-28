import { useLocation } from "wouter";
import flagImage from "@assets/flag-1645262_1280_1748188759618.jpg";

const Hero = () => {
  const [, navigate] = useLocation();

  const handleExplore = () => {
    const seriesSection = document.getElementById("series-grid-section");
    if (seriesSection) {
      seriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 md:py-24 text-center text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black" id="hero-section">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/70">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ 
            backgroundImage: `url(${flagImage})`
          }}
        />
      </div>
      <div className="container-racing relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg relative">
          <div className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain" style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" fill="white">
                <g>
                  <!-- Left checkered flag -->
                  <rect x="20" y="20" width="60" height="40" fill="white" stroke="white" stroke-width="2"/>
                  <rect x="20" y="20" width="12" height="8" fill="black"/>
                  <rect x="44" y="20" width="12" height="8" fill="black"/>
                  <rect x="68" y="20" width="12" height="8" fill="black"/>
                  <rect x="32" y="28" width="12" height="8" fill="black"/>
                  <rect x="56" y="28" width="12" height="8" fill="black"/>
                  <rect x="20" y="36" width="12" height="8" fill="black"/>
                  <rect x="44" y="36" width="12" height="8" fill="black"/>
                  <rect x="68" y="36" width="12" height="8" fill="black"/>
                  <rect x="32" y="44" width="12" height="8" fill="black"/>
                  <rect x="56" y="44" width="12" height="8" fill="black"/>
                  <rect x="20" y="52" width="12" height="8" fill="black"/>
                  <rect x="44" y="52" width="12" height="8" fill="black"/>
                  <rect x="68" y="52" width="12" height="8" fill="black"/>
                  <line x1="20" y1="20" x2="20" y2="80" stroke="white" stroke-width="3"/>
                  
                  <!-- Right checkered flag -->
                  <rect x="120" y="30" width="60" height="40" fill="white" stroke="white" stroke-width="2"/>
                  <rect x="120" y="30" width="12" height="8" fill="black"/>
                  <rect x="144" y="30" width="12" height="8" fill="black"/>
                  <rect x="168" y="30" width="12" height="8" fill="black"/>
                  <rect x="132" y="38" width="12" height="8" fill="black"/>
                  <rect x="156" y="38" width="12" height="8" fill="black"/>
                  <rect x="120" y="46" width="12" height="8" fill="black"/>
                  <rect x="144" y="46" width="12" height="8" fill="black"/>
                  <rect x="168" y="46" width="12" height="8" fill="black"/>
                  <rect x="132" y="54" width="12" height="8" fill="black"/>
                  <rect x="156" y="54" width="12" height="8" fill="black"/>
                  <rect x="120" y="62" width="12" height="8" fill="black"/>
                  <rect x="144" y="62" width="12" height="8" fill="black"/>
                  <rect x="168" y="62" width="12" height="8" fill="black"/>
                  <line x1="120" y1="30" x2="120" y2="90" stroke="white" stroke-width="3"/>
                </g>
              </svg>
            `)}")`
          }}></div>
          <span className="relative z-10">Your Ultimate Racing Schedule Tracker</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">Stay up-to-date with all your favorite racing series. Never miss a green flag again!</p>
        <button 
          onClick={handleExplore}
          className="bg-primary hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition-all transform hover:scale-105 inline-flex items-center gap-2"
        >
          <span>Explore Series</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
