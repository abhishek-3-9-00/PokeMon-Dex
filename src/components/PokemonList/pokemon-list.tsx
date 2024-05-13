import React, { useEffect, useState, useRef } from "react";
import PokemonCard from "./pokemon-card";
import Button from "../common/button";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Search from "../common/search";
import { toast } from "react-toastify";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPokemonList = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon list");
      }
      const data = await response.json();
      setPokemonList((prevPokemonList) => [
        ...prevPokemonList,
        ...data.results,
      ]);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
    setLoading(false);
  };

  const SearchByName = async (query: string) => {
    setLoading(true);
    try {
      if (query !== "") {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );
        if (!response.ok) {
          toast.info("No Pokemon Exist with this Name");
          throw new Error("Failed to fetch Pokemon");
        }
        const data = await response.json();
        setPokemonList([{ ...data?.forms?.[0] }]);
      }
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    if (searchQuery == "") {
      toast.info("Type Pokemon to Search");
      return;
    }
    console.log(searchQuery);
    SearchByName(searchQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchPokemonList(page);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    if (searchQuery !== "") {
      return;
    } //
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 10);
      }
    });
    if (loading) return;
    if (observer.current)
      observer.current.observe(document.querySelector(".observer-element")!);
  }, [loading]);

  console.log("hi", pokemonList);

  return (
    <>
      <div className="flex items-center p-4 justify-between">
        <div>
          <Link to="/">
            <Button text={<IoMdArrowRoundBack size={25} />} />
          </Link>
        </div>
        <form
          onSubmit={handleSearchChange}
          className="flex items-center justify-center gap-2"
        >
          <Search
            text="Search Pokemon"
            name="searchText"
            onChange={(e: any) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
            on
          />
          <Button type="submit" text="Filter" />
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {pokemonList?.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {loading && (
        <div className="text-center p-4 font-bold text-xl">Loading...</div>
      )}
      <div className="observer-element" />
    </>
  );
};

export default PokemonList;
