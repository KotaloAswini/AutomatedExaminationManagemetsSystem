import React, { useRef } from 'react'
import Header from './Header'
import Table from './Table'
import Tableinfo from './Tableinfo'
import Footer from './Footer'
import Download from './Download'
import './Bfrom.css'

const Bfrom = () => {
  const bformRef = useRef(null)

  return (
    <>
      {/* PDF BUTTONS */}
      <Download targetRef={bformRef} />

      {/* PDF CONTENT */}
      <div ref={bformRef} className="pdf-wrapper">
        <Header />
        <Table />
        <Tableinfo />
        <Footer />
      </div>
    </>
  )
}

export default Bfrom
