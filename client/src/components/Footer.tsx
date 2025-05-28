import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-10 pb-6 mt-10">
      <div className="container-racing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              Race<span className="text-primary">Times</span>
            </div>
            <p className="text-gray-400 mb-4">Your one-stop destination for all racing schedules and information. Never miss another green flag!</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors block">Home</Link></li>
              <li><Link href="/this-week" className="text-gray-400 hover:text-white transition-colors block">This Week</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors block">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors block">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2">
              Racing Series
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">

              <li><Link href="/series/stock-cup" className="text-gray-400 hover:text-white transition-colors block">Cup Series</Link></li>
              <li><Link href="/series/stock-nationwide" className="text-gray-400 hover:text-white transition-colors block">Nationwide Series</Link></li>
              <li><Link href="/series/indycar" className="text-gray-400 hover:text-white transition-colors block">IndyCar</Link></li>
              <li><Link href="/series/f1" className="text-gray-400 hover:text-white transition-colors block">Formula 1</Link></li>
              <li><Link href="/series/world-of-outlaws" className="text-gray-400 hover:text-white transition-colors block">World of Outlaws</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 relative pb-2">
              Newsletter
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary"></span>
            </h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on race schedules and special events.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="bg-dark border-0 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary" />
              <button type="submit" className="bg-primary hover:bg-red-700 text-white px-4 rounded-r transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RacingHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
