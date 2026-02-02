import { useState } from "react";
import "./Seating.css";

function Search({ setPage, page }) {
  const [usn, setUsn] = useState("");
  const [result, setResult] = useState("");

  const findSeat = async () => {
    if (!usn) {
      setResult("Please enter USN");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/seats/find?usn=${usn}`
      );
      const data = await response.json();

      if (data.error) {
        setResult(data.error);
      } else {
        setResult(
          `USN Number : ${data.USN}\nExamination Room : ${data.Room.replace(
            "Room ",
            ""
          )}\nSeat Number : ${data.Seat.replace("Seat ", "")}`
        );
      }
    } catch (err) {
      setResult("Backend not reachable");
    }
  };

  return (
    <div className="page">
      {/* TOP BLUE BAR */}
      <div className="blue-bar top-bar"></div>

      <div className="search-box">
        {/* COLLEGE HEADER */}
        <div className="college-header">
          <div className="college-name">
            NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY
          </div>
          <div className="exam-title">
            EXAM SEATING SEARCH PORTAL
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div className="nav-buttons">
          <button
            className={page === "search" ? "active-btn" : ""}
            onClick={() => setPage("search")}
          >
            Search
          </button>

          <button
            className={page === "seating" ? "active-btn" : ""}
            onClick={() => setPage("seating")}
          >
            Seating Layout
          </button>
        </div>

        <h2>Student Seating Search</h2>

        <input
          type="text"
          placeholder="Enter USN (e.g. INT22CS025)"
          value={usn}
          onChange={(e) => setUsn(e.target.value.toUpperCase())}
        />

        <button onClick={findSeat}>Find Seat</button>

        <pre style={{ marginTop: "20px", fontWeight: "bold" }}>
          {result}
        </pre>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2025–2026 Nitte Meenakshi Institute of Technology (NMIT)
        <br />
        Department of Computer Science & Engineering
      </div>

      {/* BOTTOM BLUE BAR */}
      <div className="blue-bar bottom-bar"></div>
    </div>
  );
}

export default Search;
