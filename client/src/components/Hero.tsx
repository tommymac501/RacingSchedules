import { useLocation } from "wouter";

const Hero = () => {
  const [, navigate] = useLocation();

  const handleExplore = () => {
    const seriesSection = document.getElementById("series-grid-section");
    if (seriesSection) {
      seriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 md:py-24 text-center text-white" id="hero-section">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/70">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url('https://pixabay.com/get/g97c3625d72347219ae2b2f7c722b413cdf10876254a438dc532b280b4729f248ea4c84c42ba0923d9c2ea39e59f3f92da24f2a0b56ec3d6edf58b10658840f61_1280.jpg')`,
            filter: 'brightness(0.6)'
          }}
        />
      </div>
      <div className="container-racing relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Your Ultimate Racing Schedule Tracker</h1>
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
