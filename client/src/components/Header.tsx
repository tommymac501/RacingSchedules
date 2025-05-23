import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-secondary text-white sticky top-0 z-50 shadow-md">
      <div className="container-racing py-3 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="logo flex items-center text-2xl font-bold text-white no-underline mb-3 sm:mb-0">
          <span className="mr-2 text-3xl">🏁</span>
          Racing<span className="text-primary">Hub</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`text-white font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/this-week" 
                className={`text-white font-medium hover:text-primary transition-colors ${location === '/this-week' ? 'text-primary' : ''}`}
              >
                This Week
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`text-white font-medium hover:text-primary transition-colors ${location === '/about' ? 'text-primary' : ''}`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
