import React from "react";

const Search = ({ ...props }) => {
  return (
    <input
      placeholder={props?.text}
      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-lg file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
      
    />
  );
};

export default Search;
