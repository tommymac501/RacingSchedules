import { useLocation } from "wouter";

const ThisWeekPreview = () => {
  const [, navigate] = useLocation();

  const handleViewAllClick = () => {
    navigate("/this-week");
  };

  return (
    <section className="py-8 bg-gradient-to-r from-secondary to-dark text-white" id="this-week-preview">
      <div className="container-racing">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Big Race Weekend Coming Up!</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">The biggest weekend in motorsports is nearly here! Three iconic races on the same day.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indycar/10 rounded-lg p-5 text-center hover:bg-indycar/20 transition-all cursor-pointer border border-indycar/40">
            <div className="text-indycar font-bold mb-2">INDIANAPOLIS 500</div>
            <div className="text-xl font-semibold mb-3">The Greatest Spectacle in Racing</div>
            <div className="text-gray-300">Sunday, 12:45 PM ET on NBC</div>
          </div>
          
          <div className="bg-f1/10 rounded-lg p-5 text-center hover:bg-f1/20 transition-all cursor-pointer border border-f1/40">
            <div className="text-f1 font-bold mb-2">MONACO GRAND PRIX</div>
            <div className="text-xl font-semibold mb-3">F1's Crown Jewel</div>
            <div className="text-gray-300">Sunday, 9:00 AM ET on ESPN</div>
          </div>
          
          <div className="bg-nascar/10 rounded-lg p-5 text-center hover:bg-nascar/20 transition-all cursor-pointer border border-nascar/40">
            <div className="text-nascar font-bold mb-2 text-black">MEMORIAL DAY 600</div>
            <div className="text-xl font-semibold mb-3">America's Longest Race</div>
            <div className="text-gray-300">Sunday, 6:00 PM ET on FOX</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={handleViewAllClick}
            className="bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-5 rounded transition-colors inline-flex items-center gap-2"
          >
            <span>View All This Week's Races</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThisWeekPreview;
