import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:to-gray-900 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the best courses for you
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, learn, and upskill with our wide range of courses.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            className="flex-1 px-4 py-3 text-gray-900 dark:text-white bg-transparent outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter the course name"
          />
          <Button
            type="submit"
            className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            Search
          </Button>
        </form>

        {/* Explore Button */}
        <Button onClick ={()=>navigate(`/course/search?query}`)}className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
