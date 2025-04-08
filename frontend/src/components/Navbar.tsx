import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Menu,
  X,
  FileText,
  Star,
  CalendarCheck,
  UserPlus,
  Eye,
  MessageSquare,
  CheckSquare,
  Calendar,
  Mail,
  Upload,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Sample data for skill distribution
  const studentSkillsData = [
    { skill: "Data Analysis", average: 85, color: "blue" },
    { skill: "Machine Learning", average: 72, color: "green" },
    { skill: "Web Development", average: 78, color: "indigo" },
    { skill: "UI/UX Design", average: 65, color: "amber" },
    { skill: "Project Management", average: 70, color: "red" },
  ];

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your authentication API
    console.log("Login attempted with:", loginEmail, loginPassword);
    // Reset fields after submission
    setLoginEmail("");
    setLoginPassword("");
    // Show dashboard after successful login
    setShowDashboard(true);
  };

  // Signup handler
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Here you would call your registration API
    console.log("Signup attempted with:", signupEmail, signupPassword);
    // Reset fields after submission
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    // Show dashboard after successful signup
    setShowDashboard(true);
  };

  if (showDashboard) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Navigation */}
        <nav className="bg-white border-b border-gray-200 py-4 shadow-sm mb-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                IIT-IIM Resume
              </span>
            </div>

            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-blue-600 font-medium">
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Candidates
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Jobs
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Analytics
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Reports
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Settings
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/32"
                alt="Profile"
                className="rounded-full"
              />
              <button
                onClick={() => setShowDashboard(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                User Profile
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6">Welcome to DASHBOARD</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat Cards */}
              <div className="bg-white rounded-xl shadow-sm border-l-4 border-blue-500 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FileText className="text-blue-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Resumes Processed</p>
                    <h3 className="font-bold text-2xl">245</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-amber-500 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <Star className="text-amber-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Potential Matches</p>
                    <h3 className="font-bold text-2xl">87</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-green-500 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <CalendarCheck className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Interview Requests</p>
                    <h3 className="font-bold text-2xl">32</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-purple-500 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <UserPlus className="text-purple-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">New Applications</p>
                    <h3 className="font-bold text-2xl">124</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Candidates - Takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-lg">Recent Candidates</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    View All
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-3 font-semibold">
                          Candidate
                        </th>
                        <th className="text-left pb-3 font-semibold">
                          Position
                        </th>
                        <th className="text-left pb-3 font-semibold">Match</th>
                        <th className="text-left pb-3 font-semibold">Status</th>
                        <th className="text-left pb-3 font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Ananya Sharma",
                          position: "Data Scientist",
                          match: 95,
                          status: "Shortlisted",
                        },
                        {
                          name: "Rahul Kumar",
                          position: "Full-stack Developer",
                          match: 87,
                          status: "New",
                        },
                        {
                          name: "Priya Patel",
                          position: "ML Engineer",
                          match: 92,
                          status: "Interview",
                        },
                        {
                          name: "Vikram Singh",
                          position: "Product Manager",
                          match: 78,
                          status: "Assessment",
                        },
                        {
                          name: "Neha Gupta",
                          position: "UX Designer",
                          match: 83,
                          status: "New",
                        },
                      ].map((candidate, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b">
                          <td className="py-3">
                            <div className="flex items-center">
                              <img
                                src={`https://via.placeholder.com/36?text=${candidate.name.charAt(
                                  0
                                )}`}
                                alt={candidate.name}
                                className="rounded-full mr-2"
                              />
                              {candidate.name}
                            </div>
                          </td>
                          <td className="py-3">{candidate.position}</td>
                          <td className="py-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-md ${
                                candidate.match > 90
                                  ? "bg-green-100 text-green-800"
                                  : candidate.match > 80
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {candidate.match}%
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-md ${
                                candidate.status === "Shortlisted"
                                  ? "bg-green-100 text-green-800"
                                  : candidate.status === "Interview"
                                  ? "bg-blue-100 text-blue-800"
                                  : candidate.status === "Assessment"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {candidate.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <button className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition">
                                <Eye className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1 border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recruitment Pipeline - Takes 1/3 width on large screens */}
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-lg">Recruitment Pipeline</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Details
                  </Button>
                </div>
                {[
                  {
                    stage: "New Applications",
                    count: 124,
                    color: "bg-blue-500",
                    max: 124,
                  },
                  {
                    stage: "Screening",
                    count: 78,
                    color: "bg-amber-500",
                    max: 124,
                  },
                  {
                    stage: "Interview",
                    count: 45,
                    color: "bg-indigo-500",
                    max: 124,
                  },
                  {
                    stage: "Assessment Test",
                    count: 32,
                    color: "bg-gray-500",
                    max: 124,
                  },
                  {
                    stage: "Final Interview",
                    count: 18,
                    color: "bg-gray-800",
                    max: 124,
                  },
                  {
                    stage: "Offer Extended",
                    count: 12,
                    color: "bg-green-500",
                    max: 124,
                  },
                ].map((stage, index) => (
                  <div className="mb-4" key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{stage.stage}</span>
                      <span className="text-sm font-bold">{stage.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${stage.color} h-2 rounded-full`}
                        style={{ width: `${(stage.count / stage.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Skill Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg">Skill Distribution</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Export
                </Button>
              </div>
              {studentSkillsData.map((skill, index) => (
                <div className="mb-4" key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.skill}</span>
                    <span className="text-sm font-bold">{skill.average}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${
                        skill.color === "blue"
                          ? "bg-blue-500"
                          : skill.color === "green"
                          ? "bg-green-500"
                          : skill.color === "indigo"
                          ? "bg-indigo-500"
                          : skill.color === "amber"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      } h-2 rounded-full`}
                      style={{ width: `${skill.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg">Recent Activity</h4>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    action: "Rahul Kumar's resume was analyzed",
                    time: "15 minutes ago",
                    icon: FileText,
                    color: "blue",
                  },
                  {
                    action: "Interview scheduled with Priya Patel",
                    time: "2 hours ago",
                    icon: Calendar,
                    color: "green",
                  },
                  {
                    action: "Assessment sent to Vikram Singh",
                    time: "5 hours ago",
                    icon: CheckSquare,
                    color: "amber",
                  },
                  {
                    action: "Offer extended to Ananya Sharma",
                    time: "Yesterday",
                    icon: Mail,
                    color: "indigo",
                  },
                  {
                    action: "5 new resumes uploaded",
                    time: "2 days ago",
                    icon: Upload,
                    color: "gray",
                  },
                ].map((activity, index) => (
                  <div className="flex" key={index}>
                    <div
                      className={`${
                        activity.color === "blue"
                          ? "bg-blue-100"
                          : activity.color === "green"
                          ? "bg-green-100"
                          : activity.color === "amber"
                          ? "bg-amber-100"
                          : activity.color === "indigo"
                          ? "bg-indigo-100"
                          : "bg-gray-100"
                      } rounded-full p-2 mr-3 flex items-center justify-center h-10 w-10`}
                    >
                      <activity.icon
                        className={`${
                          activity.color === "blue"
                            ? "text-blue-500"
                            : activity.color === "green"
                            ? "text-green-500"
                            : activity.color === "amber"
                            ? "text-amber-500"
                            : activity.color === "indigo"
                            ? "text-indigo-500"
                            : "text-gray-500"
                        } h-5 w-5`}
                      />
                    </div>
                    <div>
                      <p className="text-sm">{activity.action}</p>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Navbar when not showing dashboard
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">IIT</span>
            <span className="font-bold text-xl">IIM</span>
            <span className="font-bold text-xl">Resume</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <NavLinks />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* Login Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Signup Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create an Account</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button>Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 p-2 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <NavLinks mobile />

              {/* Login and Signup buttons for mobile */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-email">Email</Label>
                      <Input
                        id="mobile-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-password">Password</Label>
                      <Input
                        id="mobile-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create an Account</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-signup-email">Email</Label>
                      <Input
                        id="mobile-signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-signup-password">Password</Label>
                      <Input
                        id="mobile-signup-password"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile-confirm-password">
                        Confirm Password
                      </Label>
                      <Input
                        id="mobile-confirm-password"
                        type="password"
                        value={signupConfirmPassword}
                        onChange={(e) =>
                          setSignupConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const linkClass = mobile
    ? "py-2 text-gray-700 hover:text-iit-blue transition"
    : "text-gray-700 hover:text-iit-blue transition";

  return (
    <>
      <a href="#features" className={linkClass}>
        Features
      </a>
      <a href="#templates" className={linkClass}>
        Templates
      </a>
      <a href="#testimonials" className={linkClass}>
        Testimonials
      </a>
      <a href="#pricing" className={linkClass}>
        Pricing
      </a>
    </>
  );
};

export default Navbar;
