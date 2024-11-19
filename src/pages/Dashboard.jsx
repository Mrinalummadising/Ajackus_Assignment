import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, editUser, deleteUser } from "../services/api";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

function Dashboard() {
  const [users, setUsers] = useState([]); // Ensure default value is an empty array
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // New state for goal and evaluation
  const [goal, setGoal] = useState(null);
  const [evaluationMessage, setEvaluationMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch users with pagination
  useEffect(() => {
    fetchUsers(currentPage, usersPerPage).then((response) => {
      setUsers(response.data.users || []); // Fallback to empty array if no users
      setTotalUsers(response.data.total || 0); // Fallback to 0 if total is not provided
    });
  }, [currentPage, usersPerPage]);

  const handleSaveUser = (user) => {
    const apiCall = user.id ? editUser : addUser;
    apiCall(user).then((response) => {
      setUsers((users) =>
        user.id
          ? users.map((u) => (u.id === user.id ? response.data : u))
          : [...users, response.data]
      );
      setShowForm(false);
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() =>
      setUsers((users) => users.filter((user) => user.id !== id))
    );
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalUsers / usersPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to set and evaluate goal
  const handleSetGoal = (newGoal) => {
    setGoal(newGoal);
  };

  const handleEvaluateGoal = (userProgress) => {
    if (goal === null) {
      setEvaluationMessage("Goal Not Set");
    } else if (userProgress >= goal) {
      setEvaluationMessage("Goal Met");
    } else {
      setEvaluationMessage("Goal Not Met");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <div>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setShowForm(true);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                Add User
              </button>
            </div>

            {showForm && (
              <div className="mb-8">
                <UserForm
                  user={selectedUser}
                  onSave={handleSaveUser}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            <UserList
              users={users}
              onEdit={(user) => {
                setSelectedUser(user);
                setShowForm(true);
              }}
              onDelete={handleDeleteUser}
            />

            {/* Pagination controls */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg mr-2"
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${Math.ceil(
                totalUsers / usersPerPage
              )}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg ml-2"
              >
                Next
              </button>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="text-center">
            <h2 className="m-5">Set and Evaluate Goals</h2>
            <input
              type="number"
              placeholder="Set Goal"
              value={goal || ""}
              onChange={(e) => handleSetGoal(parseInt(e.target.value))}
              className="border-2 p-2 rounded-lg w-1/3"
            />
            <button
              onClick={() => handleEvaluateGoal(10)} // Pass the current progress value
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 ml-2 mb-2"
            >
              Evaluate Goal
            </button>
            <p>{evaluationMessage}</p>
          </div>
        );
      case "reports":
        return <div className="text-center">Reports Section</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-red-400 via-yellow-400">
      {/* Hamburger Icon Button for Mobile */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-black p-2 rounded-lg focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-20
        w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold justify-center text-center">
            Dashboard
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white p-2 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="mt-8">
          <li
            onClick={() => {
              setActiveSection("users");
              setIsSidebarOpen(false);
            }}
            className={`cursor-pointer p-4 ${
              activeSection === "users" ? "bg-indigo-400 rounded" : ""
            }`}
          >
            Users
          </li>
          <li
            onClick={() => {
              setActiveSection("settings");
              setIsSidebarOpen(false);
            }}
            className={`cursor-pointer p-4 ${
              activeSection === "settings" ? "bg-indigo-500 rounded" : ""
            }`}
          >
            Settings
          </li>
          <li
            onClick={() => {
              setActiveSection("reports");
              setIsSidebarOpen(false);
            }}
            className={`cursor-pointer p-4 ${
              activeSection === "reports" ? "bg-indigo-600  rounded " : ""
            }`}
          >
            Reports
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="lg:w-4/5 xl:w-5/6 p-8 lg:pl-10 flex-1">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
          Management Section
        </h1>
        {renderSection()}
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
