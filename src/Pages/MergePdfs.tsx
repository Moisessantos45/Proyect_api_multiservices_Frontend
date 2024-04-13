import { saveAs } from 'file-saver'
import { useState } from 'react'
import UrlBackend from '../Config/UrlBackend'
import toastify from '../Utils/Utils'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../Components/Loading'
import FormUpload from '../Components/FormUpload'

const MergePdfs = (): JSX.Element => {
  const [file, setFile] = useState<File[] | null>([])
  const [loading, setLoading] = useState<boolean>(false)
  const typeAccept = '.pdf'
  const textButton = 'Merge PDFs'

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectFiles =
      e.target.files !== null ? Array.from(e.target.files) : []
    setFile((prev) => (prev === null ? selectFiles : [...prev, ...selectFiles]))
  }

  const deleteFile = (index: number): void => {
    if (file === null) return
    const filesArr = file.filter((_file, i) => i !== index)
    setFile(filesArr)
  }

  const handelSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (file == null || file.length === 0) {
      toastify('No hay archivos', false)
      return
    }
    try {
      const idGenerate = uuidv4()
      const formData = new FormData()
      file.forEach((file) => {
        formData.append('pdfs', file)
      })

      toastify('Uploading images', true)

      await UrlBackend.post(`mergePDF/uploadsPdfs/${idGenerate}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toastify('PDFs merged', true)
      setFile([])
      setLoading(true)

      const response = await UrlBackend(`mergePDF/${idGenerate}`, {
        responseType: 'blob'
      })

      const data: Blob = response.data !== null ? response.data : null
      const nemeFile = `mergedPDF-${idGenerate}.pdf`
      saveAs(data, nemeFile)

      toastify('PDFs merged', true)
      setLoading(false)
    } catch (error) {
      toastify('Error al subir el archivo', false)
    }
  }

  return (
    <main className=" bg-white p-2 m-0 w-full flex justify-center h-[83vh] sm:min-h-[99vh] items-center flex-wrap overflow-y-auto scroollBat">
      {loading && <Loading />}
      <FormUpload
        textButton={textButton}
        typeAccept={typeAccept}
        file={file}
        handelSubmit={handelSubmit}
        handelChange={handelChange}
        deleteFile={deleteFile}
      />
    </main>
  )
}

export default MergePdfs
