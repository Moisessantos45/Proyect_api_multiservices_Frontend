import { saveAs } from 'file-saver'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'
import { MagicMotion } from 'react-magic-motion'
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../Components/Loading'

interface FilesDataRecived {
  filename: string
  data: string
  contentType: string
}

const ImageOptimization = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [files, setFiles] = useState<File[] | null>(null)
  const [filesRender, setFilesRender] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [quality, setQuality] = useState<number>(60)
  const [receivedImages, setReceivedImages] = useState<FilesDataRecived[]>([])

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

  const deleteFile = (index: number): void => {
    if (files === null) return
    const filesArrRender = filesRender.filter((_file, i) => i !== index)
    const filesArr = files.filter((_file, i) => i !== index)
    setFiles(filesArr)
    setFilesRender(filesArrRender)
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
      toastify('Uploading images', true)
      setLoading(true)
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('images', file)
      })

      const idUser = uuidv4()

      await UrlBackend.post(
        `imageOptimization/uploadsImages/${idUser}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      toastify('Image save success', true)
      toastify('Optimizing image', true)
      setFiles(null)
      setFilesRender([])
      const response = await UrlBackend(
        `imageOptimization/${idUser}?quality=${quality}`
      )
      const responseData: FilesDataRecived[] =
        response.data !== null ? response.data : ''
      setReceivedImages(responseData)
      toastify('complete optimization', true)
      setLoading(false)
    } catch (error) {
      toastify('Error al convertir', false)
    }
  }

  const downloadZip = async (): Promise<void> => {
    const zip = new JSZip()
    if (receivedImages.length === 0) {
      toastify('No hay archivos', false)
      return
    }
    receivedImages.forEach((img) => {
      zip.file(
        `${img.filename.split('.')[0]}.${img.filename.split('.')[1]}`,
        img.data,
        {
          base64: true
        }
      )
    })
    // Genera el archivo zip y lo descarga
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, `$${id}_images.zip`)
      })
      .catch((_error) => {
        toastify('Error generating the zip', false)
      })
    toastify('Archivos descargados', true)
  }

  return (
    <main
      className={`w-full m-auto flex justify-center sm:items-center h-screen sm:h-[85vh] md:h-[99vh] sm:p-2 pt-3 scroollBat flex-wrap ${
        receivedImages.length > 0 ? 'overflow-y-auto' : ''
      } `}
    >
      {loading && <Loading />}
      <form
        className={`gap-1 ${
          filesRender.length === 0
            ? 'sm:w-5/12 md:w-8/12 lg:w-5/12 w-11/12 sm:min-h-[65vh] md:min-h-[55vh] lg:min-h-[65vh] p-3 gap-3 h-[50vh] justify-center'
            : 'sm:w-9/12 w-11/12 sm:min-h-[95vh] md:min-h-[60vh] lg:min-h-[95vh] min-h-[90vh] flex-col justify-evenly'
        }  shadow-md border border-slate-200 rounded-md p-2 flex sm:flex-row sm:justify-evenly items-center flex-wrap sm:overscroll-none overflow-y-auto scroollBat`}
        onSubmit={handelSubmit}
      >
        {filesRender.length > 0 && (
          <div className=" w-11/12 flex justify-evenly flex-wrap sm:flex-row flex-col sm:gap-0 gap-2 items-center">
            <div className=" w-full p-2 flex flex-col items-center">
              <h1 className=" font-bold">Recommended percentage 40-60 %</h1>
              <span className=" font-semibold">{quality}</span>
            </div>
            <input
              type="range"
              max={100}
              value={quality}
              className=" outline-none sm:w-5/12 w-11/12 h-5 p-1 rounded-md shadow-md shadow-slate-200 border border-slate-300"
              onChange={(e) => {
                setQuality(Number(e.target.value))
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
            <span className="text-gray-600 font-medium">Upload images</span>
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
            <article className=" sm:w-5/12 w-11/12 md:w-10/12 lg:w-5/12 sm:h-[62vh] md:h-[30vh] lg:h-[60vh] h-[35vh] flex justify-evenly flex-wrap gap-2 p-2 overflow-y-auto scroollBat border-2 border-indigo-500 border-dotted">
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
          Optimize images
        </button>
      </form>
      <section className="flex justify-center items-center w-full min-h-[39vh] sm:min-h-[10vh]">
        {receivedImages.length > 0 && (
          <figure className="margin m-2 p-2 w-11/12 gap-2 flex justify-evenly items-center flex-wrap">
            <div className=" w-full flex justify-center items-center">
              <button
                className=" bg-blue-700 h-9 w-32 text-white rounded-md m-2"
                onClick={downloadZip}
              >
                Download zip
              </button>
            </div>
            {receivedImages.map((item) => (
              <a
                key={item.filename}
                href={`data:${item.contentType};base64,${item.data}`}
                download={`${item.filename}.${item.contentType.split('/')[1]}`}
              >
                <img
                  src={`data:${item.contentType};base64,${item.data}`}
                  alt={item.filename}
                  className=" md:max-w-56 max-w-32 min-h-28"
                />
              </a>
            ))}
          </figure>
        )}
      </section>
    </main>
  )
}

export default ImageOptimization
