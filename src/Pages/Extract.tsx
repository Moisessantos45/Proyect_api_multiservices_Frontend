import { useEffect, useState } from 'react'
import UrlBackend from '../Config/UrlBackend'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'
import toastify from '../Utils/Utils'
import Loading from '../Components/Loading'
import { useParams } from 'react-router-dom'
import FormUpload from '../Components/FormUpload'

interface Data {
  filename: string
  data: string
  contentType: string
}

const Extract = (): JSX.Element => {
  const [file, setFile] = useState<File[] | null>([])
  const [files, setFiles] = useState<Data[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const typeAccept =
    '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

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
    try {
      const formData = new FormData()
      file.forEach((file) => {
        formData.append('files', file)
      })
      const idUser = uuidv4()
      await UrlBackend.post(`extractImages/post_file/${idUser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setFile([])
      setLoading(true)
      toastify('Images Saved', true)
      const response = await UrlBackend(`extractImages/${idUser}`)
      const data: Data[] = response.data !== null ? response.data : []
      setFiles(data)
      setLoading(false)
      toastify('Imagenes extraidas', true)
    } catch (error) {
      toastify('Error al subir el archivo', false)
    }
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
        saveAs(content, `${id}_images.zip`)
      })
      .catch((_error) => {
        toastify('Error generating the zip', false)
      })
    toastify('Archivos descargados', true)
  }

  return (
    <main className=" bg-white p-2 m-0 w-full flex justify-center h-[83vh] sm:min-h-[99vh] items-center flex-wrap overflow-y-auto scroollBat">
      {loading && <Loading />}
      <FormUpload
        textButton="Upload file"
        typeAccept={typeAccept}
        file={file}
        handelSubmit={handelSubmit}
        handelChange={handelChange}
        deleteFile={deleteFile}
      />
      <section className="flex justify-center items-center w-full min-h-[39vh] sm:min-h-[10vh]">
        {files.flat().length > 0 && (
          <figure className="margin m-2 p-2 w-11/12 gap-2 flex justify-evenly items-center flex-wrap">
            <div className=" w-full flex justify-center items-center">
              <button
                className=" bg-blue-700 h-9 w-32 text-white rounded-md m-2"
                onClick={downloadZip}
              >
                Download zip
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
