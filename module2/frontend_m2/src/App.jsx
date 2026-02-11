import { useState } from "react";
import Search from "./components/Search";
import Seating from "./components/Seating";

function App() {
  const [page, setPage] = useState("search");

  return (
    <>
      {page === "search" && <Search setPage={setPage} page={page} />}
{page === "seating" && <Seating setPage={setPage} page={page} />}

    </>
  );
}

export default App;
