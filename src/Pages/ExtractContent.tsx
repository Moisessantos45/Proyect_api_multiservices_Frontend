import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'

const Extract = (): JSX.Element => {
  const [file, setFile] = useState<File[] | null>([])
  const [dataDoc, setData] = useState<string[]>([])
  const location = useLocation()
  const pathParts = location.pathname.split('/').slice(1, 2).join('')
  const params = useParams()
  const { id } = params

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectFiles =
      e.target.files !== null ? Array.from(e.target.files) : []
    setFile(selectFiles)
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
      file.map(async (file) => {
        const formData = new FormData()
        formData.append('docs', file)
        try {
          const response = await UrlBackend.post(
            `extractTextContent/post_doc/${id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
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
          // setFiles([])
          toastify('Error al subir el archivo', false)
        }
      })
    )
    setData(uplodasFiles)
    toastify('Texto extraido', true)
  }

  const copyData = async (data: string): Promise<void> => {
    navigator.clipboard.writeText(data).catch((e) => {
      console.error('Error al copiar el texto', e)
      toastify('Error al copiar', true)
    })
    toastify('Texto copiado', true)
  }

  const deleteFile = (index: number): void => {
    if (file !== null) {
      const newFiles = file.filter((_file, i) => i !== index)
      setFile(newFiles)
    }
  }

  return (
    <main className=" bg-white p-2 m-0 w-full flex justify-center h-[83vh] sm:min-h-[99vh] items-center flex-wrap overflow-y-auto scroollBat">
      <div
        className={`relative flex flex-col justify-center w-10/12 sm:w-7/12 lg:w-5/12 break-words mb-6 margin shadow-lg shadow-grey-400 rounded-lg border-0 max-h-[39vh] ${
          file !== null && file?.length > 0
            ? 'sm:min-h-[79vh] min-h-[60vh]'
            : 'sm:min-h-[59vh]'
        }  `}
      >
        <div className="rounded-t mb-0 px-6 py-6 text-center">
          <h6 className="text-neutral-700 mb-3 text-lg font-bold uppercase">
            Extractor de texto
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
            accept={` ${
              pathParts === 'extractTextPDF'
                ? '.pdf'
                : '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }`}
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
      </div>
      <section className="flex justify-center items-center w-full min-h-[39vh] sm:min-h-[10vh]">
        {dataDoc.length > 0 && (
          <figure className="margin m-2 p-2 w-11/12 gap-2 flex justify-evenly items-center flex-wrap ">
            {dataDoc.map((item, i) => (
              <>
                <article className=" w-11/12 break-all break-words shadow-lg p-2 flex shadow-grey-400 rounded-xl">
                  <p key={i}>{item.substring(0, 350) + '...'}</p>
                  <button
                    className=" w-9 h-9 flex justify-center items-center m-1"
                    onClick={() => {
                      copyData(item).catch((err) => {
                        console.error('Error al copiar el texto', err)
                      })
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-copy text-sky-400"
                      width={30}
                      height={30}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                    </svg>
                  </button>
                </article>
              </>
            ))}
          </figure>
        )}
      </section>
    </main>
  )
}

export default Extract
