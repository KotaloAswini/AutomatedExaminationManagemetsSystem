
const Tableinfo = () => {
  return (
   <div className="table-info mt-4 flex flex-col gap-4">

  <div className="flex items-center gap-3">
    <p className="text-2xl whitespace-nowrap">No. of present</p>
    <span className="w-32 border-b-2 border-black"></span>
  </div>

  <div className="flex items-center gap-3">
    <p className="text-2xl whitespace-nowrap">No. of Absent</p>
    <span className="w-32 border-b-2 border-black"></span>
  </div>

  <div className="flex items-center gap-3">
    <p className="text-2xl whitespace-nowrap">No. of Malpractice</p>
    <span className="w-32 border-b-2 border-black"></span>
  </div>

  <div className="flex items-center gap-3">
    <p className="text-2xl whitespace-nowrap">Invigilator&apos;s Signature</p>
    <span className="w-32 border-b-2 border-black"></span>
  </div>

</div>

  )
};
export default Tableinfo;