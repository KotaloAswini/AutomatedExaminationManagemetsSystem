import React from 'react'
import html2pdf from 'html2pdf.js'

function Download({ targetRef }) {

  const pdfOptions = {
    filename: 'B-Form.pdf',

    image: {
      type: 'jpeg',
      quality: 1
    },

    html2canvas: {
      scale: 1.5,          // 🔴 LOWER SCALE = NO EXTRA PAGE
      useCORS: true,
      scrollY: 0,
      windowWidth: 794,    // A4 width in px @96dpi
      windowHeight: 1123   // A4 height in px @96dpi
    },

    jsPDF: {
      unit: 'mm',
      format: [210, 297],  // 🔴 FORCE EXACT A4 SIZE
      orientation: 'portrait',
      compress: true
    },

    // 🔴 DO NOT allow auto page creation
    pagebreak: {
      mode: []
    }
  }

  const previewPDF = () => {
    if (!targetRef.current) return

    html2pdf()
      .set(pdfOptions)
      .from(targetRef.current)
      .toPdf()
      .get('pdf')
      .then(pdf => {
        window.open(pdf.output('bloburl'), '_blank')
      })
  }

  const downloadPDF = () => {
    if (!targetRef.current) return
    html2pdf().set(pdfOptions).from(targetRef.current).save()
  }

  return (
    <>
      <button
        onClick={previewPDF}
        style={{
          position: 'fixed',
          top: '20px',
          right: '140px',
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        Preview
      </button>

      <button
        onClick={downloadPDF}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#2e7d32',
          color: 'white',
          padding: '8px 14px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        Download
      </button>
    </>
  )
}

export default Download
