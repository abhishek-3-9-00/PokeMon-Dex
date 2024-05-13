import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Search from "../common/search";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LandingSearch = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (searchQuery.trim() == "") {
      toast.error("Please enter a search term");
    }
    setLoading(true);
    try {
      if (searchQuery !== "") {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
        );
        if (!response.ok) {
          toast.info("No Pokemon Exist with this Name");
          setLoading(false);
          return;
        } else {
          handleCardNavigate(searchQuery);
        }
      }
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardNavigate = (query: String) => {
    navigate(`/details?name=${query}`);
  };
  return (
    <div className="h-[850px] text-black font-bold py-36 text-center space-y-5 flex items-center flex-col">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold w-auto">
        <h1>What Pokemon are you looking for?</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>
      <form
        className="flex items-center flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="text-sm md:text-xl font-light text-zinc-500 w-[500px]">
          <Search
            name="searchText"
            text="Search your favorite Pokemon !!"
            onChange={(e: any) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-3 bg-zinc-200 px-5 py-2 rounded-xl"
        >
          Search <CiSearch size={20} />
        </button>
        {loading && <div>Loading....</div>}
      </form>
    </div>
  );
};

export default LandingSearch;
