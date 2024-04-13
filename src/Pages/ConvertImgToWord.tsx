import { useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import { saveAs } from 'file-saver'
import toastify from '../Utils/Utils'
import Loading from '../Components/Loading'
import RenderImages from '../Components/RenderImages'

const ConvertImgToWord = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [files, setFiles] = useState<File[] | null>(null)
  const [filesRender, setFilesRender] = useState<string[]>([])
  const [nameFolder, setNameFolder] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files === null) return
    const newFiles = e.target.files
    const newFilesArr: File[] = Array.from(newFiles)
    const newFilesArrRender: string[] = newFilesArr.map((file) =>
      URL.createObjectURL(file)
    )
    setFiles((prev) =>
      prev === null ? newFilesArr : [...prev, ...newFilesArr]
    )
    setFilesRender((prev) => [...prev, ...newFilesArrRender])
  }

  const deleteFile = (index: number): void => {
    if (files === null) return
    const newFilesArrRender = filesRender.filter((_file, i) => i !== index)
    const newFilesArr = files.filter((_file, i) => i !== index)
    setFiles(newFilesArr)
    setFilesRender(newFilesArrRender)
  }

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (files === null || files.length < 1) return
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('images', file)
      })
      await UrlBackend.post(`convertImgToDoc/uploadImg/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toastify('Images save success', true)
      toastify('Converting to WORD', true)
      setFiles(null)
      setFilesRender([])
      setNameFolder('')
      setLoading(true)
      const response = await UrlBackend(
        `convertImgToDoc/${id}?nameFolder=${nameFolder}`,
        {
          responseType: 'blob'
        }
      )
      const responseData: Blob = response.data !== null ? response.data : null
      saveAs(responseData, `${nameFolder}.docx`)
      toastify('Convert success', true)
    } catch (error) {
      toastify('Error al convertir', false)
    }
    setLoading(false)
  }
  return (
    <main className=" w-full m-auto flex justify-center sm:items-center h-screen sm:h-[85vh] md:h-[99vh] sm:p-5 pt-3 scroollBat">
      {loading && <Loading />}
      <form
        className={`gap-1 ${
          filesRender.length === 0
            ? 'sm:w-5/12 md:w-8/12 lg:w-5/12 w-11/12 sm:min-h-[65vh] md:min-h-[55vh] lg:min-h-[65vh] p-3 gap-3 h-[50vh] justify-center'
            : 'sm:w-9/12 w-11/12 sm:min-h-[95vh] md:min-h-[70vh] lg:min-h-[95vh] h-[80vh] flex-col justify-evenly'
        }  shadow-md border border-slate-200 rounded-md p-2 flex sm:flex-row sm:justify-evenly items-center flex-wrap sm:overscroll-none overflow-y-auto scroollBat`}
        onSubmit={handelSubmit}
      >
        {filesRender.length > 1 && (
          <div className=" w-11/12 flex justify-evenly flex-wrap sm:flex-row flex-col sm:gap-0 gap-2 items-center p-1">
            <input
              type="text"
              className=" border border-slate-200 outline-none w-11/12 h-10 p-1 rounded-md shadow-md shadow-slate-200"
              onChange={(e) => {
                setNameFolder(e.target.value)
              }}
            />
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
          className=" w-8/12 md:w-6/12 h-11 flex justify-center items-center p-3 rounded-md bg-blue-600 text-white font-bold"
        >
          Convert to WORD
        </button>
      </form>
    </main>
  )
}

export default ConvertImgToWord
