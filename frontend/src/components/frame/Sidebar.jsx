import {
  Home,
  TrendingUp,
  Compass,
  Info,
  Megaphone,
  Code,
  HelpCircle,
  FileText,
  Briefcase,
  Notebook
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Section = ({ title, children }) => (
  <div className="mt-4">
    <p className="px-4 text-xs text-gray-500 uppercase tracking-wide mb-2">
      {title}
    </p>
    {children}
  </div>
);

const Item = ({ icon: Icon, label, to }) => {
  const content = (
    <div className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#1A1A1A] cursor-pointer transition-colors hover:text-orange-500">
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

const Sidebar = () => {

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('https://betterknowit.onrender.com/api/communities');
        const data = await response.data;
        setCommunities(data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };
    fetchCommunities();
  }, []);


  return (
    <aside className="w-[270px] shrink-0 h-screen overflow-y-auto border-r border-[#1A1A1A] hidden md:block fixed left-0">
      <div className="flex gap-2 px-4 py-4">
        <img
          src="/vite.svg"
          className="w-8 h-8"
          alt="reddit"
        />
        <span className="text-lg font-semibold hidden md:block">
          BetterKnowIt
        </span>
      </div>



      <Item icon={Home} label="Home" to="/" />
      <Item icon={TrendingUp} label="Popular" />
      <Item icon={Compass} label="Explore" />

      <Section title="Resources">
        <Item icon={Info} label="About BetterKnowIt" />
        <Item icon={Megaphone} label="Advertise" />
        <Item icon={Code} label="Developer Platform" />
        <Item icon={HelpCircle} label="Help" />
        <Item icon={FileText} label="Blog" />
        <Item icon={Briefcase} label="Careers" />
        <Item icon={HelpCircle} label="Profile" to="/profile" />
      </Section>



      <Section title="My Communities" >
        <div className="max-h-[340px] overflow-y-auto scrollbar-none">
          {communities.map((community) => (
            <Link key={community._id} to={`/community/${community._id}`}>
              <Item icon={Notebook} label={community.community_name} />
            </Link>
          ))}
        </div>
      </Section>

      <div className="mt-6 px-4 text-xs text-gray-500 space-y-2 text-white">
        <p>BetterKonwIt Rules</p>
        <p>Privacy Policy</p>
        <p>User Agreement</p>
        <p>Accessibility</p>
      </div>
    </aside>
  );
}

export default Sidebar
