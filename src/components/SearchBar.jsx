import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [stadt, setStadt] = useState("");

  const liveEingabe = (e) => {
    setStadt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (stadt.trim() !== "") {
      onSearch(stadt);
      setStadt("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Stadt eingeben..."
        onChange={liveEingabe}
        value={stadt}
      />

      <button className="submit-Btn" type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBar;
