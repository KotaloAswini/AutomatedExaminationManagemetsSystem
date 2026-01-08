
const Table = () => {
  const rows = 20;
  const data = [
    { usn: '1BY20CS001', name: 'John Doe', seat: '001' },
    { usn: '1BY20CS002', name: 'Jane Smith', seat: '002' },
    { usn: '1BY20CS003', name: 'Bob Johnson', seat: '003' },
    // Add more data as needed
  ];
  return (

    <div className="items-center my-10">
      <table className="w-full border-2 border-black table-auto">
        <thead>
          <tr>
            <th className="border-2 border-black px-2 py-1  align-middle ">SL. No</th>
            <th className="border-2 border-black px-2 py-1  align-middle">USN</th>
            <th className="border-2 border-black px-2 py-1  align-middle">Name of the student</th>
            <th className="border-2 border-black px-2 py-1  align-middle">Seat No.</th>
            <th className="border-2 border-black px-2 py-1  align-middle">Signature</th>
          </tr>
        </thead>
        <tbody>
         
{Array.from({ length: rows }).map((_, index) => (
  <tr key={ index+1}>
    <td className="border-2 border-black px-2 py-1 text-center">
      { index + 1}
    </td>
    <td className="border-2 border-black px-2 py-1">{data[index]?.usn || ''}</td>
    <td className="border-2 border-black px-2 py-1">{data[index]?.name || ''}</td>
    <td className="border-2 border-black px-2 py-1">{data[index]?.seat || ''}</td>
    <td className="border-2 border-black px-2 py-1"></td>
  </tr>
          ))}
        </tbody>
      </table>
    </div>
  )};
export default Table;