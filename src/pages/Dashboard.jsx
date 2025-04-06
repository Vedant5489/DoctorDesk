import { useEffect, useState } from "react";
import Hospitals from "../components/Hospitals";
import Profile from "../components/UserProfile";
import GeminiHealthSearch from "../components/GeminiHealthSearch";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const requiredCookies = ["doctor_token", "userData", "hospitalName"];
    const missingCookies = requiredCookies.filter((cookie) => Cookies.get(cookie));

    if (missingCookies.length > 0) {
      setIsAuthorized(true)
    }
  }, [navigate]);

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return <Profile />;
      case "hospitals":
        return <Hospitals />;
      case "chat":
        return <GeminiHealthSearch />;
      default:
        return <Profile />;
    }
  };

  const handleLogout = () => {
    ["doctor_token", "userData", "hospitalName"].forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate("/");
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Go to Landing Page</h1>
          <Link
            to="/"
            className="inline-block bg-[#0077B6] text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-[#005f8f] transition-all duration-300"
          >
            Go to Landing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 flex flex-col justify-between z-20">
        <div>
          <Logo value={10} />
          <div className="text-xl font-bold text-[#023047] mb-6">Dashboard</div>
          <nav>
            <ul className="space-y-4">
              <li
                className={`cursor-pointer ${
                  selectedTab === "profile" ? "text-[#F4A261]" : "text-[#023047]"
                } font-medium hover:text-[#F4A261]`}
                onClick={() => setSelectedTab("profile")}
              >
                👤 Profile
              </li>
              <li
                className={`cursor-pointer ${
                  selectedTab === "hospitals" ? "text-[#F4A261]" : "text-[#023047]"
                } font-medium hover:text-[#F4A261]`}
                onClick={() => setSelectedTab("hospitals")}
              >
                🏥 Hospitals
              </li>
              <li
                className={`cursor-pointer ${
                  selectedTab === "chat" ? "text-[#F4A261]" : "text-[#023047]"
                } font-medium hover:text-[#F4A261]`}
                onClick={() => setSelectedTab("chat")}
              >
                🤖 AI Chat
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-[#F4A261] hover:bg-[#e76f51] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          🔒 Logout
        </button>
      </aside>

      {/* Main Content with left margin */}
      <main className="ml-64 flex-1 p-6">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
