import { useState } from "react";
import Search from "./components/Search";
import Seating from "./components/Seating";

function App() {

  const [page, setPage] = useState("search");
  const [searchedUSN, setSearchedUSN] = useState(""); // ⭐ VERY IMPORTANT

  return (
    <>
      {page === "search" && (
        <Search
          setPage={setPage}
          page={page}
          setSearchedUSN={setSearchedUSN} // ⭐ MUST PASS
        />
      )}

      {page === "seating" && (
        <Seating
          setPage={setPage}
          searchedUSN={ searchedUSN} // ⭐ MUST PASS
        />
      )}
    </>
  );
}

export default App;
