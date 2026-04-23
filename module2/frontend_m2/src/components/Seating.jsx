import { useEffect, useState } from "react";
import "./Seating.css";

function Seating({ setPage, searchedUSN }) {

  const [rooms, setRooms] = useState(null);

  const roomsList = [
    "Class 1","Class 2","Class 3","Class 4",
    "Class 5","Class 6","Class 7","Class 8",
    "Class 9","Class 10","Class 11","Class 12",
    "Lab 1","Lab 2","Lab 3","Lab 4",
    "Lab 5","Lab 6","Lab 7","Lab 8"
  ];

  const selectedExam = "MSE1";

  useEffect(() => {
    const fetchData = async () => {
      let allRooms = {};

      for (let room of roomsList) {
        try {
          let res = await fetch(
            `http://localhost:8080/seats/layout?room=${room}&exam=${selectedExam}`
          );

          let data = await res.json();

          // Sort properly
          data.sort((a, b) => {
            if (a.row === b.row) return a.col - b.col;
            return a.row - b.row;
          });

          // Convert to bench pairs
          let students = [];
          for (let i = 0; i < data.length; i += 2) {
            students.push([
              data[i]?.usn || "",
              data[i + 1]?.usn || ""
            ]);
          }

          allRooms[room] = students;

        } catch (err) {
          console.log("Error loading room:", room);
          allRooms[room] = [];
        }
      }

      setRooms(allRooms);
    };

    fetchData();
  }, [selectedExam]);

  // Auto scroll to searched student
  useEffect(() => {
    if (!rooms || !searchedUSN) return;

    setTimeout(() => {
      const el = document.getElementById("targetRoom");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, 300);

  }, [rooms, searchedUSN]);

  if (!rooms) {
    return <h2 style={{ textAlign: "center" }}>Loading seating layout...</h2>;
  }

  return (
    <div className="page">

      {/* Buttons */}
      <div style={{ textAlign: "center", margin: "20px" }}>

        <button
          onClick={() => setPage("search")}
          style={{
            marginRight: "20px",
            padding: "10px",
            background: "#313997",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ⬅ Back to Search
        </button>

        <button
          onClick={() => window.print()}
          style={{
            padding: "10px",
            background: "#313997",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          🖨️ Print Seating
        </button>

      </div>

      {/* Rooms */}
      {Object.entries(rooms).map(([roomName, students], roomIndex) => {

        // Check if searched student is inside this room
        const containsStudent = students.some(
          pair => pair.includes(searchedUSN)
        );

        return (
          <div
            className="room"
            key={roomIndex}
            id={containsStudent ? "targetRoom" : ""}
          >

            {/* Header */}
            <div className="header">
              <img
                src="/images/nmit.logo.jpeg"
                alt="NMIT Logo"
                className="logo"
              />

              <div className="title">
                <div><b>NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY (NMIT)</b></div>
                <div>DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</div>
                <div>SEATING ALLOTMENT {selectedExam}</div>
              </div>
            </div>

            {/* Details */}
            <table className="details">
              <tbody>
                <tr>
                  <td>Date: ________</td>
                  <td>Session: FN / AN</td>
                  <td>Room No: {roomName}</td>
                </tr>
                <tr>
                  <td>Subject: {selectedExam}</td>
                  <td>Semester: Mixed</td>
                  <td>Academic Year: 2025-2026</td>
                </tr>
              </tbody>
            </table>

            <div className="board">BOARD</div>

            {/* Layout */}
            <div className="layout">
              <div className="door">DOOR</div>

              <div className="benches">

                {students.map((pair, index) => (
                  <div className="bench" key={index}>
                    <span className={pair[0] === searchedUSN ? "highlight" : ""}>
                      {pair[0]}
                    </span>

                    <span className={pair[1] === searchedUSN ? "highlight" : ""}>
                      {pair[1]}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default Seating;