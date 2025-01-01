import { Button } from "@/components/ui/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:to-gray-900 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the best courses for you
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover ,learn and upskill with our wide ranges of courses
        </p>
        <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 ">
          <input
            type="text"
            className=""
            placeholder="Enter the courses "
          />
        </form>
        <Button className="bg-black-600 dark:bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:bg-blue-800">
            Search
          </Button>
        <Button className="bg-black-600 dark:bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-blue-700 dark:bg-white-800">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
