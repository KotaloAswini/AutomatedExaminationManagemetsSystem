import { useEffect, useState } from "react";
import "./Seating.css";

function Seating({ setPage, searchedUSN }) {

  const [rooms, setRooms] = useState(null);

  // ✅ Fetch seating
  useEffect(() => {
    fetch("http://localhost:8080/seating")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ AUTO SCROLL TO STUDENT ROOM
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

      <div style={{ textAlign: "center", margin: "20px" }}>
        <button className="back-btn" onClick={() => setPage("search")}>
          ⬅ Back to Search
        </button>
      </div>

      {Object.entries(rooms).map(([roomName, students], roomIndex) => {

        let studentIndex = 0;

        return (
          <div
            className="room"
            key={roomIndex}
            id={students.includes(searchedUSN) ? "targetRoom" : ""}
          >

            <div className="header">
              <img
                src="/images/nmit.logo.jpeg"
                alt="NMIT Logo"
                className="logo"
              />

              <div className="title">
                <div><b>NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY (NMIT)</b></div>
                <div>DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</div>
                <div>SEATING ALLOTMENT MSE1</div>
              </div>
            </div>

            <table className="details">
              <tbody>
                <tr>
                  <td>Date: ________</td>
                  <td>Session: FN / AN</td>
                  <td>Room No: {roomName}</td>
                </tr>
                <tr>
                  <td>Subject: ________</td>
                  <td>Semester: Mixed</td>
                  <td>Academic Year: 2025-2026</td>
                </tr>
              </tbody>
            </table>

            <div className="board">BOARD</div>

            <div className="layout">
              <div className="door">DOOR</div>

              <div className="benches">

                {[...Array(Math.ceil(students.length / 2))].map((_, benchIndex) => {

                  const s1 = students[studentIndex++] || "";
                  const s2 = students[studentIndex++] || "";

                  return (
                    <div className="bench" key={benchIndex}>
                      <span className={s1 === searchedUSN ? "highlight" : ""}>
                        {s1}
                      </span>

                      <span className={s2 === searchedUSN ? "highlight" : ""}>
                        {s2}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Seating;
