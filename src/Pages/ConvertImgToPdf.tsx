import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'
import Loading from '../Components/Loading'
import RenderImages from '../Components/RenderImages'

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
    <main className=" w-full m-auto flex justify-center sm:items-center h-screen sm:h-[85vh] md:h-[99vh] sm:p-2 pt-3 scroollBat">
      {loading && <Loading />}
      <form
        className={`gap-1 ${
          filesRender.length === 0
            ? 'sm:w-5/12 md:w-8/12 lg:w-5/12 w-11/12 sm:min-h-[65vh] md:min-h-[55vh] lg:min-h-[65vh] p-3 gap-3 h-[50vh] justify-center'
            : 'sm:w-9/12 w-11/12 sm:min-h-[95vh] md:min-h-[70vh] lg:min-h-[95vh] h-[90vh] flex-col justify-evenly'
        }  shadow-md border border-slate-200 rounded-md p-2 flex sm:flex-row sm:justify-evenly items-center flex-wrap sm:overscroll-none overflow-y-auto scroollBat`}
        onSubmit={handelSubmit}
      >
        {filesRender.length > 0 && (
          <div className=" w-11/12 flex justify-evenly flex-wrap sm:flex-row md:flex-col lg:flex-row flex-col sm:gap-0 gap-2 items-center">
            <input
              type="text"
              className=" outline-none sm:w-5/12 md:w-9/12 lg:w-5/12 w-11/12 h-10 p-1 rounded-md shadow-md shadow-slate-200 border border-slate-300"
              onChange={(e) => {
                setNameFolder(e.target.value)
              }}
            />
            <div className=" sm:w-8/12 md:10/12 lg:w-5/12 w-11/12 flex justify-center items-center h-10 md:h-14 gap-2">
              {optionsOrientation.map((item, i) => (
                <span
                  key={i}
                  className={`border border-blue-600 rounded-md text-blue-600 sm:w-24 md:w-32 w-36 flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white hover:font-bold capitalize ${
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
              ? ' w-10/12 sm:min-h-[45vh] md:min-h-[35vh] lg:min-h-[40vh] h-[35vh]'
              : 'sm:w-7/12 md:w-10/12 lg:w-5/12 w-11/12 sm:h-[55vh] md:h-[30vh] lg:h-[60vh] h-[18vh]'
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
        {/* render images uploaded */}
        <RenderImages filesRender={filesRender} deleteFile={deleteFile} />
        <button
          type="submit"
          className=" w-6/12 h-11 flex justify-center items-center p-3 rounded-md bg-blue-600 text-white font-bold"
        >
          Convert to PDF
        </button>
      </form>
    </main>
  )
}

export default ConvertImgToPdf
