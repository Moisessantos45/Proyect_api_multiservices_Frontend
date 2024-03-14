import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'
import toastify from '../Utils/Utils'

interface Data {
  filename: string
  data: string
  contentType: string
}

const Extract = (): JSX.Element => {
  const [file, setFile] = useState<File[] | null>([])
  const [files, setFiles] = useState<Data[]>([])
  const [active, setActive] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const params = useParams()
  const { id } = params

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectFiles =
      e.target.files !== null ? Array.from(e.target.files) : []
    setFile((prev) => (prev === null ? selectFiles : [...prev, ...selectFiles]))
  }

  useEffect(() => {
    setFile([])
  }, [id])

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (file == null || file.length === 0) {
      return
    }
    const uplodasFiles = await Promise.all(
      file.map(async (file, index) => {
        const formData = new FormData()
        const name = uuidv4()
        formData.append('files', file)
        setActive(true)
        try {
          const response = await UrlBackend.post(
            `extractImages/post_file/${id}/${name}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                let progress = 0
                if (progressEvent.total !== undefined) {
                  progress = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  )
                }
                setUploadProgress(
                  ((index + 1) / files.length) * 100 + progress / files.length
                )
              }
            }
          )
          const responseData = response.data
          // console.log(responseData)
          if (responseData === undefined) {
            toastify('Error al obtener el archivo', false)
            return
          }
          return responseData
        } catch (error) {
          toastify('Error al subir el archivo', false)
          return {}
        }
      })
    )
    setFiles(uplodasFiles)
    setUploadProgress(100)
    setFile([])
    toastify('Imagenes extraidas', true)
  }
  const deleteFile = (index: number): void => {
    if (file !== null) {
      const newFiles = file.filter((_item, i) => i !== index)
      setFile(newFiles)
    }
  }
  const downloadZip = async (): Promise<void> => {
    const zip = new JSZip()
    const filesImg = files.flat()
    if (filesImg.length === 0) {
      toastify('No hay archivos', false)
      return
    }
    filesImg.forEach((img) => {
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
        saveAs(content, 'images.zip')
      })
      .catch((error) => {
        console.error(`Error al generar el archivo zip: ${error}`)
      })
    toastify('Archivos descargados', true)
  }

  return (
    <main className=" bg-white p-2 m-0 w-full flex justify-center h-[83vh] sm:min-h-[99vh] items-center flex-wrap overflow-y-auto scroollBat">
      <div
        className={`relative flex flex-col justify-center w-10/12 sm:w-7/12 lg:w-5/12 break-words mb-6 margin shadow-lg shadow-grey-400 rounded-lg border-0 ${
          file !== null && file?.length > 0
            ? 'sm:min-h-[79vh] min-h-[60vh]'
            : 'sm:min-h-[59vh]'
        }  `}
      >
        <div className="rounded-t mb-0 px-6 py-6 text-center">
          <h6 className="text-neutral-700 mb-3 text-lg font-bold uppercase">
            Extractor de imagenes
          </h6>
          <span className="mt-6 border-b-1 border-neutral-500" />
        </div>
        <div className="flex margin w-11/12 flex-col items-center justify-center rounded-lg bg-slate-50 border-4 border-dashed h-32">
          <input
            className="sr-only"
            type="file"
            name="file"
            id="file"
            multiple
            onChange={handelChange}
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <label
            htmlFor="file"
            className="relative flex min-h-32 items-center justify-center rounded-md border-[#e0e0e0] p-8 text-center flex-col cursor-pointer m-auto w-full"
          >
            <span className="mb-2 block text-xl bg-blue-500 rounded-md p-1 font-semibold text-white">
              Drop files here
            </span>
          </label>
        </div>
        <article className=" w-full m-auto p-4 gap-2 sm:max-h-28 flex flex-col overflow-y-auto scroollBat">
          {file?.map((item, i) => (
            <div className="rounded-md bg-[#F5F7FB] py-2 px-8" key={i}>
              <div className="flex items-center justify-between">
                <span className="truncate pr-2 text-base font-medium text-[#07074D]">
                  {`${item.name}`}
                </span>
                <button
                  type="button"
                  className="text-[#07074D]"
                  onClick={() => {
                    deleteFile(i)
                  }}
                >
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </article>

        <form
          className="text-center p-2"
          onSubmit={(e) => {
            e.preventDefault()
            handelSubmit(e).catch((error) => {
              console.error('Error during form submission:', error)
            })
          }}
        >
          <button
            type="submit"
            className="bg-blue-600 text-neutral-200 active:bg-neutral-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-11/12 ease-linear transition-all duration-150"
          >
            Iniciar
          </button>
        </form>
        {active && (
          <div className="w-11/12 margin">
            <span className="text-white">Progreso</span>
            <span className="float-right text-sm text-gray-400">
              {uploadProgress / 100}MB
            </span>
            <div className="h-2 overflow-hidden rounded-full bg-gray-300">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="bg-blue-500 h-full"
              />
            </div>
          </div>
        )}
      </div>
      <section className="flex justify-center items-center w-full min-h-[39vh] sm:min-h-[10vh]">
        {files.flat().length > 0 && (
          <figure className="margin m-2 p-2 w-11/12 gap-2 flex justify-evenly items-center flex-wrap">
            <div className=" w-full flex justify-center items-center">
              <button
                className=" bg-blue-700 h-9 w-32 text-white rounded-md m-2"
                onClick={() => {
                  downloadZip().catch((error) => {
                    console.log(error)
                  })
                }}
              >
                Descargar zip
              </button>
            </div>
            {files.flat().map((item) => (
              <a
                key={item.filename}
                href={`data:${item.contentType};base64,${item.data}`}
                download={`${item.filename}.${item.contentType.split('/')[1]}`}
              >
                <img
                  src={`data:${item.contentType};base64,${item.data}`}
                  alt={item.filename}
                  className=" max-w-56 min-h-28"
                />
              </a>
            ))}
          </figure>
        )}
      </section>
    </main>
  )
}

export default Extract
