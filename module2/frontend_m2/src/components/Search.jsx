import { useState } from "react";
import "./Seating.css";

function Search({ setPage, page, setSearchedUSN }) {
  const [usn, setUsn] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);

  // ✅ ADD THIS
  const [exam, setExam] = useState("MSE1");

  const findSeat = async () => {
    if (!usn) {
      setResult("Please enter a USN");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
  `http://127.0.0.1:8080/seats/find?usn=${usn}&exam=${exam}`
);
      const data = await response.json();


    console.log(data);   // ✅ PUT IT HERE
    
      if (data.error) {
        setResult(data.error);
        setIsError(true);
      } else {

        setResult(
`USN Number : ${data.USN}
Examination Room : ${data.Room}
Seat Number : ${data.Seat}
Row : ${data.Row}
Subject : ${data.Subject}`
        );

        setIsError(false);

        setSearchedUSN(data.USN);

        // ✅ SAVE EXAM ALSO
        localStorage.setItem("selectedUSN", data.USN);
        localStorage.setItem("exam", exam);

        setTimeout(() => {
          setPage("seating");
        }, 2000); // reduced time
      }

    } catch (err) {
      setResult("Backend not reachable");
      setIsError(true);
    }
  };

  return (
    <div className="page">
      <div className="blue-bar top-bar"></div>

      <div className="search-box">
        <div className="college-header">
          <div className="college-name">
            NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY
          </div>
          <div className="exam-title">
            EXAM SEATING SEARCH PORTAL
          </div>
        </div>

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

        {/* ✅ ADD DROPDOWN HERE */}
        <div style={{ marginBottom: "10px" }}>
         <select value={exam} onChange={(e) => setExam(e.target.value)}>
         <option value="MSE1">MSE1</option>
         
        </select>
        </div>

        <input
          type="text"
          placeholder="Enter USN (e.g. 7NT22CS150)"
          value={usn}
          onChange={(e) => setUsn(e.target.value.toUpperCase())}
        />

        <button onClick={findSeat}>Find Seat</button>

        {result && (
          <pre
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: isError ? "red" : "green",
              fontSize: "18px"
            }}
          >
            {result}
          </pre>
        )}
      </div>

      <div className="footer">
        © 2025–2026 Nitte Meenakshi Institute of Technology (NMIT)
        <br />
        Department of Computer Science & Engineering
      </div>

      <div className="blue-bar bottom-bar"></div>
    </div>
  );
}

export default Search;