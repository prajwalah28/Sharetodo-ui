import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSharedCode } from "../Context/SharedCodeContext"; 

const Home = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeEntered, setCodeEntered] = useState("");
  const [sharedCodeError, setSharedCodeError] = useState("");

  const navigate = useNavigate();
  const { setSharedCode } = useSharedCode(); // Get the context function to set the shared code

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !dob || !partnerName) {
      alert("Please fill in all the fields");
      return;
    }

    const newCode = `${name}-${partnerName}-${new Date(dob).getTime()}`;
    setShareCode(newCode);

    const userData = {
      name,
      dateOfBirth: dob,
      partnerName,
      code: newCode,
    };

    setLoading(true);
    try {
      const response = await fetch("https://sharedtodo-backend.onrender.com/api/user/addSharedCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User added successfully:", result);
      } else {
        const errorData = await response.json();
        setError(`Failed to create user: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error while adding user:", error);
      setError("Error while adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSharedCodeSubmit = async () => {
    if (!codeEntered) {
      setSharedCodeError("Please enter a valid share code.");
      return;
    }

    try {
      const response = await fetch(
        `https://sharedtodo-backend.onrender.com/api/user/findToDoList/${codeEntered}`
      );
      if (response.ok) {
        setSharedCode(codeEntered); // Set shared code in context
        navigate(`/todo`); // Navigate to the To-Do List page
      } else {
        setSharedCodeError("Invalid shared code. Please try again.");
      }
    } catch (error) {
      console.error("Error while fetching shared code data:", error);
      setSharedCodeError("Error while fetching shared code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
      <div className="bg-white bg-opacity-80 shadow-xl rounded-lg p-8 w-96">
        <h1 className="text-3xl font-semibold text-center text-pink-600 mb-6">Create Your Shared Love Code</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Partner's Name</label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 px-4 rounded-xl hover:bg-pink-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Share Code"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {shareCode && (
          <div className="mt-6 p-4 bg-pink-100 rounded-lg shadow-lg">
            <p className="text-pink-600 font-medium text-center">Your Share Code:</p>
            <p className="font-mono text-gray-800 text-center">{shareCode}</p>
            <button
              onClick={() => navigator.clipboard.writeText(shareCode)}
              className="mt-3 w-full bg-pink-600 text-white py-2 px-4 rounded-xl hover:bg-pink-700"
            >
              Copy Code
            </button>
          </div>
        )}

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-1">Enter Share Code</label>
          <input
            type="text"
            value={codeEntered}
            onChange={(e) => setCodeEntered(e.target.value)}
            className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSharedCodeSubmit}
            className="w-full mt-3 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700"
          >
            Join Our Shared To-Do List
          </button>
          {sharedCodeError && <p className="text-red-500 mt-4 text-center">{sharedCodeError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
