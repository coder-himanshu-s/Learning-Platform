import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-28 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 gradient-text">Find the Best Courses for You</h1>
        <p className="text-blue-100 dark:text-gray-300 mb-8 text-lg">Discover, learn, and upskill with curated, instructor-led courses.</p>

        <form onSubmit={searchHandler} className="flex items-center bg-white/95 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-6 ring-1 ring-white/40">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 placeholder-gray-400"
          />
          <Button type="submit" className="bg-sky-600 text-white px-6 py-3 rounded-r-full hover:bg-sky-700 hero-cta">Search</Button>
        </form>

        <div className="flex justify-center gap-3">
          <Button onClick={()=> navigate(`/all-courses`)} className="bg-white/90 text-sky-600 rounded-full hover:bg-white card-hover">Explore Courses</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
