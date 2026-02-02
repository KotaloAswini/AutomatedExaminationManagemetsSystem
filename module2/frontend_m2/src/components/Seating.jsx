import "./Seating.css";

function Seating({setPage}) {
  const totalRooms = 12;
  const studentsPerRoom = 25;
  let usnCounter = 1;

  return (
    <div className="page">
       {/* BACK BUTTON */}
      <div style={{ textAlign: "center", margin: "20px" }}>
   <button className="back-btn" onClick={() => setPage("search")}>
  ⬅ Back to Search
</button>

      </div>

      {[...Array(totalRooms)].map((_, roomIndex) => {
        let studentsPlaced = 0;

        return (
          <div className="room" key={roomIndex}>
            {/* HEADER */}
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

            {/* DETAILS */}
            <table className="details">
              <tbody>
                <tr>
                  <td>Date: ________</td>
                  <td>Session: FN / AN</td>
                  <td>Room No: {String(roomIndex + 1).padStart(3, "0")}</td>
                </tr>
                <tr>
                  <td>Subject: ________</td>
                  <td>Semester: ________</td>
                  <td>Academic Year: 2025-2026</td>
                </tr>
              </tbody>
            </table>

            <div className="board">BOARD</div>

            {/* LAYOUT */}
            <div className="layout">
              <div className="door">DOOR</div>

              <div className="benches">
                {[...Array(18)].map((_, benchIndex) => {
                  if (studentsPlaced >= studentsPerRoom) return null;

                  const s1 =
                    studentsPlaced < studentsPerRoom
                      ? `INT22CS${String(usnCounter++).padStart(3, "0")}`
                      : "";
                  studentsPlaced++;

                  const s2 =
                    studentsPlaced < studentsPerRoom
                      ? `INT22CS${String(usnCounter++).padStart(3, "0")}`
                      : "";
                  studentsPlaced++;

                  return (
                   <div className="bench">
                   <span>{s1}</span>
                   <span>{s2}</span>
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
