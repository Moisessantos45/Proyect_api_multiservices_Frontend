import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Home = (): JSX.Element => {
  const id = uuidv4()
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl xl:text-5xl capitalize">
            Extraction tools
          </h2>
          <p className="mt-4 text-base text-gray-700 sm:mt-8">
            Select the tool you need.
          </p>
        </div>
        <div className="sm:col-gap-12 row-gap-12 md:ga mt-10 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 md:grid-cols-3 xl:mt-20">
          <Link
            to={`/mergePdfs/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-photo-check text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v7" />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l.5 .5" />
              <path d="M15 19l2 2l4 -4" />
            </svg>

            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              merge <span className=" uppercase">Pdf</span>s
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Merge multiple PDFs into one
            </p>
          </Link>
          <Link
            to={`/extractTextPDF/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-photo-check text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v7" />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l.5 .5" />
              <path d="M15 19l2 2l4 -4" />
            </svg>

            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              Extrac to PDF
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Extract text from a PDF
            </p>
          </Link>
          <Link
            to={`/extractTextDOCX/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-type-docx text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M2 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
              <path d="M17 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
              <path d="M9.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" />
              <path d="M19.5 15l3 6" />
              <path d="M19.5 21l3 -6" />
            </svg>
            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              Extrac to Doc
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Extract text from a DOCX
            </p>
          </Link>
          <Link
            to={`/convertImgToPdf/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-type-pdf text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
              <path d="M17 18h2" />
              <path d="M20 15h-3v6" />
              <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            </svg>
            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              Convert Img To Pdf
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Convert images to PDF
            </p>
          </Link>
          <Link
            to={`/convertImgToWord/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-type-docx text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M2 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
              <path d="M17 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
              <path d="M9.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" />
              <path d="M19.5 15l3 6" />
              <path d="M19.5 21l3 -6" />
            </svg>
            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              Convert Img To Word
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Convert images to WORD
            </p>
          </Link>
          <Link
            to={`/extractImage/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-type-pdf text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
              <path d="M17 18h2" />
              <path d="M20 15h-3v6" />
              <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            </svg>
            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              ImageOut
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Extract images from a DOCX
            </p>
          </Link>
          <Link
            to={`/image-Optimization/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan text-sky-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
              <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
              <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
              <path d="M4 16v2a2 2 0 0 0 2 2h2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v2" />
              <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            </svg>

            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              image Optimization
            </h3>
            <p className="mt-5 text-base text-gray-700">image Optimization</p>
          </Link>
          <Link
            to={`/convertSVG/${id}`}
            className="md:border-b-2 border-sky-500 md:shadow m-2 md:p-8 lg:p-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-type-svg text-sky-400"
              width={46}
              height={46}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M4 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
              <path d="M10 15l2 6l2 -6" />
              <path d="M20 15h-1a2 2 0 0 0 -2 2v2a2 2 0 0 0 2 2h1v-3" />
            </svg>

            <h3 className="mt-10 text-xl font-bold text-slate-800 capitalize">
              SVG Convert
            </h3>
            <p className="mt-5 text-base text-gray-700">
              Convert SVG to PNG, JPG
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
