import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About - RaceTimes";
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container-racing">
        <h1 className="text-4xl font-bold mb-8 text-center">About RaceTimes</h1>
        
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            Welcome to RaceTimes, your ultimate destination for tracking racing schedules across
            multiple series. We're passionate about motorsports and created this platform to help
            fans never miss another green flag.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            RaceTimes aims to provide motorsports enthusiasts with a comprehensive, easy-to-use
            tool for tracking race schedules across NASCAR, IndyCar, Formula 1, and other racing series.
            We believe that fans should have all the information they need about upcoming races in one place.
          </p>
          
          <h2>Features</h2>
          <ul>
            <li>Comprehensive race schedules for major racing series</li>
            <li>Detailed race information including location, time, and broadcast details</li>
            <li>Automatic conversion to your local time zone</li>
            <li>Weather forecasts for race day</li>
            <li>Weekly view of upcoming races across all series</li>
          </ul>
          
          <h2>Supported Racing Series</h2>
          <p>
            We currently support the following racing series:
          </p>
          <ul>
            <li>NASCAR Cup Series</li>
            <li>NASCAR Xfinity Series</li>
            <li>NASCAR Truck Series</li>
            <li>ARCA Menards Series</li>
            <li>IndyCar Series</li>
            <li>Formula 1</li>
            <li>World of Outlaws</li>
          </ul>
          
          <p>
            More series will be added in the future based on user feedback and demand.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Contact us at
            <a href="mailto:info@racinghub.com" className="text-primary mx-1">info@racinghub.com</a>
            or follow us on social media for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
