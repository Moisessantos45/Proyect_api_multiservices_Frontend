import { useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import { saveAs } from 'file-saver'
import toastify from '../Utils/Utils'
import { MagicMotion } from 'react-magic-motion'

const ConvertImgToWord = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [files, setFiles] = useState<File[] | null>(null)
  const [filesRender, setFilesRender] = useState<string[]>([])
  const [nameFolder, setNameFolder] = useState<string>('')

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
      const response = await UrlBackend(
        `convertImgToDoc/${id}?nameFolder=${nameFolder}`,
        {
          responseType: 'blob'
        }
      )
      const responseData: Blob = response.data !== null ? response.data : null
      saveAs(responseData, `${nameFolder}.docx`)
      setFiles(null)
      setFilesRender([])
      setNameFolder('')
      toastify('Convert success', true)
    } catch (error) {
      toastify('Error al convertir', false)
    }
  }
  return (
    <main className=" w-full m-auto flex justify-center sm:items-center h-[85vh] sm:h-[95vh] sm:p-5 pt-3 scroollBat">
      <form
        className={`gap-1 ${
          filesRender.length < 1
            ? 'sm:w-5/12 lg:w-6/12 w-11/12 sm:min-h-[65vh] p-3 gap-3 h-[50vh] justify-center'
            : 'sm:w-9/12 w-11/12 sm:min-h-[90vh] h-[75vh] flex-col justify-evenly'
        }  shadow-md border border-slate-200 rounded-md p-2 flex sm:flex-row sm:justify-evenly items-center flex-wrap overflow-y-auto scroollBat`}
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
            filesRender.length < 1
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
          Convertir a WORD
        </button>
      </form>
    </main>
  )
}

export default ConvertImgToWord
