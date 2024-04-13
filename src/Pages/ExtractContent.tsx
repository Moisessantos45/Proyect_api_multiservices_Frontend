import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'
import Loading from '../Components/Loading'
import FormUpload from '../Components/FormUpload'

const Extract = (): JSX.Element => {
  const [file, setFile] = useState<File[] | null>([])
  const [dataDoc, setData] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const location = useLocation()
  const pathParts = location.pathname.split('/').slice(1, 2).join('')
  const params = useParams()
  const { id } = params

  const typeAccept =
    pathParts === 'extractTextPDF'
      ? '.pdf'
      : '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectFiles =
      e.target.files !== null ? Array.from(e.target.files) : []
    setFile((prev) => (prev === null ? selectFiles : [...prev, ...selectFiles]))
  }

  useEffect(() => {
    setData([])
    setFile([])
  }, [id])

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (file == null || file.length === 0) {
      return
    }
    try {
      const idUser = uuidv4()
      const formData = new FormData()
      file.forEach((file) => {
        formData.append('docs', file)
      })

      await UrlBackend.post(`extractTextContent/post_doc/${idUser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setFile([])
      setLoading(true)

      const response = await UrlBackend(`extractTextContent/${idUser}`)
      const data: string[] = response.data !== null ? response.data : []

      setData(data)
      setLoading(false)
      toastify('Texto extraido', true)
    } catch (error) {
      toastify('Error al subir el archivo', false)
    }
  }

  const copyData = async (data: string): Promise<void> => {
    navigator.clipboard.writeText(data).catch((_e) => {
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
      {loading && <Loading />}
      <FormUpload
        textButton="Extraer texto"
        typeAccept={typeAccept}
        handelChange={handelChange}
        file={file}
        handelSubmit={handelSubmit}
        deleteFile={deleteFile}
      />
      <section className="flex justify-center items-center w-full min-h-[39vh] sm:min-h-[10vh]">
        {dataDoc.length > 0 && (
          <figure className="margin m-2 p-2 w-11/12 gap-2 flex justify-evenly items-center flex-wrap ">
            {dataDoc.map((item, i) => (
              <article
                className=" w-11/12 break-all break-words shadow-lg p-2 flex shadow-grey-400 rounded-xl"
                key={i}
              >
                <p>{item.substring(0, 350) + '...'}</p>
                <button
                  className=" w-9 h-9 flex justify-center items-center m-1"
                  onClick={() => {
                    copyData(item).catch((_err) => {
                      toastify('Error al copiar el texto', false)
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
            ))}
          </figure>
        )}
      </section>
    </main>
  )
}

export default Extract
