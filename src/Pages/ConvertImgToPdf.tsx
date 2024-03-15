import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'
import { MagicMotion } from 'react-magic-motion'
import Loading from '../Components/Loading'

const ConvertImgToPdf = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [files, setFiles] = useState<File[] | null>(null)
  const [filesRender, setFilesRender] = useState<string[]>([])
  const [orientacion, setOrientation] = useState<string>('')
  const [nameFolder, setNameFolder] = useState<string>('')
  const [elementSelected, setElementSelected] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const optionsOrientation: string[] = ['portrait', 'landscape', 'automatic']
  const [adjust, setAdjust] = useState<boolean>(false)

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      const files = e.target.files
      const filesArr: File[] = Array.from(files)
      const filesArrRender = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setFiles((prev) => (prev === null ? filesArr : [...prev, ...filesArr]))
      setFilesRender((prev) => [...prev, ...filesArrRender])
    }
  }

  useEffect(() => {
    if (orientacion === 'automatic') {
      setAdjust(false)
    }
  }, [orientacion])

  const deleteFile = (index: number): void => {
    if (files === null) return
    const filesArrRender = filesRender.filter((_file, i) => i !== index)
    const filesArr = files.filter((_file, i) => i !== index)
    setFiles(filesArr)
    setFilesRender(filesArrRender)
  }

  const handelClickActive = (index: number): void => {
    if (index === elementSelected) {
      setElementSelected(-1)
      return
    }
    setElementSelected(index)
  }

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (files === null || files.length < 1) {
      toastify('No hay archivos', false)
      return
    }
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('images', file)
      })

      await UrlBackend.post(`convertImgToPdf/postFile/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toastify('Image save success', true)
      toastify('Converting to PDF', true)
      setFiles(null)
      setFilesRender([])
      setNameFolder('')
      setOrientation('')
      setAdjust(false)
      setLoading(true)
      const response = await UrlBackend(
        `convertImgToPdf/${id}?orientacion=${orientacion}&nameFolder=${nameFolder}&adjust=${adjust}`,
        {
          responseType: 'blob'
        }
      )
      const responseData: Blob = response.data !== null ? response.data : null
      saveAs(responseData, `${nameFolder}.pdf`)
      toastify('successful conversion ', true)
      setLoading(false)
    } catch (error) {
      toastify('Error al convertir', false)
    }
  }
  // if (!loading) return <Loading />-
  return (
    <main className=" w-full m-auto flex justify-center sm:items-center h-[85vh] sm:h-[99vh] sm:p-2 pt-3 scroollBat">
      {loading && <Loading />}
      <form
        className={`gap-1 ${
          filesRender.length === 0
            ? 'sm:w-5/12 w-11/12 sm:min-h-[65vh] p-3 gap-3 h-[50vh] justify-center'
            : 'sm:w-9/12 w-11/12 sm:min-h-[95vh] h-[80vh] flex-col justify-evenly'
        }  shadow-md border border-slate-200 rounded-md p-2 flex sm:flex-row sm:justify-evenly items-center flex-wrap sm:overscroll-none overflow-y-auto scroollBat`}
        onSubmit={handelSubmit}
      >
        {filesRender.length > 0 && (
          <div className=" w-11/12 flex justify-evenly flex-wrap sm:flex-row flex-col sm:gap-0 gap-2 items-center">
            <input
              type="text"
              className=" outline-none sm:w-5/12 w-11/12 h-10 p-1 rounded-md shadow-md shadow-slate-200 border border-slate-300"
              onChange={(e) => {
                setNameFolder(e.target.value)
              }}
            />
            <div className=" sm:w-5/12 w-11/12 flex justify-center items-center h-10 gap-2">
              {optionsOrientation.map((item, i) => (
                <span
                  key={i}
                  className={`border border-blue-600 rounded-md text-blue-600 sm:w-24 w-36 flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white hover:font-bold capitalize ${
                    i === elementSelected ? 'bg-blue-600 text-white' : ''
                  } `}
                  onClick={() => {
                    setOrientation(item)
                    handelClickActive(i)
                  }}
                >
                  {item}
                </span>
              ))}
              <span
                className={`border border-blue-600 rounded-md text-blue-600 sm:w-24 w-36 flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white hover:font-bold ${
                  adjust && orientacion !== 'automatic'
                    ? 'bg-blue-600 text-white'
                    : ''
                } ${orientacion === 'automatic' ? 'cursor-not-allowed' : ''}`}
                onClick={() => {
                  setAdjust((prev) => !prev)
                }}
              >
                Adjust
              </span>
            </div>
          </div>
        )}
        <div
          className={` ${
            filesRender.length === 0
              ? ' w-10/12 sm:min-h-[45vh] h-[35vh]'
              : 'sm:w-5/12 w-11/12 sm:h-[55vh] h-[18vh]'
          } rounded-md border-2 border-indigo-500 border-dotted justify-center flex items-center bg-gray-50 p-4 shadow-md `}
        >
          <label
            htmlFor="upload"
            className="flex flex-col w-full justify-center h-full items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-600 font-medium">Upload file</span>
          </label>
          <input
            id="upload"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handelChange}
          />
        </div>
        {filesRender.length > 0 && (
          <MagicMotion>
            <article className=" sm:w-5/12 w-11/12 sm:h-[62vh] h-[35vh] flex justify-evenly flex-wrap gap-2 p-2 overflow-y-auto scroollBat border-2 border-indigo-500 border-dotted">
              {filesRender.map((item, i) => (
                <figure
                  key={i}
                  className="relative rounded-md w-24 h-24 bg-slate-50 p-1 flex justify-center items-center"
                >
                  <span
                    className=" absolute top-0 right-0 text-2xl bg-red-500 text-white text-[20px] font-bold rounded-full h-6 w-6 border border-slate-100 flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      deleteFile(i)
                    }}
                  >
                    <i className="fa-solid flex fa-xmark"></i>
                  </span>
                  <img src={item} className="h-20" alt="" />
                </figure>
              ))}
            </article>
          </MagicMotion>
        )}
        <button
          type="submit"
          className=" w-6/12 h-11 flex justify-center items-center p-3 rounded-md bg-blue-600 text-white font-bold"
        >
          Convertir a PDF
        </button>
      </form>
    </main>
  )
}

export default ConvertImgToPdf
