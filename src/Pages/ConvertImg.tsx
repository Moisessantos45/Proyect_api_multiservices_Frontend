import { useState } from 'react'
import { saveAs } from 'file-saver'
import UrlBackend from '../Config/UrlBackend'
import { useParams } from 'react-router-dom'
import toastify from '../Utils/Utils'

interface Types {
  png: string
  jpeg: string
  webp: string
  svg: string
}

interface Svg {
  dato: {
    data: number[]
    type: string
  }
  type: string
}

const ConvertImg = (): JSX.Element => {
  const [svgContent, setSvg] = useState<string>('')
  const [typeSelect, setTypeSelect] = useState<string>('')
  const [elementSelected, setElementSelected] = useState<number>(-1)
  const params = useParams()
  const { id } = params
  const tipos: Types = {
    png: 'png',
    jpeg: 'jpeg',
    webp: 'webp',
    svg: 'image/svg+xml;charset=utf-8'
  }
  const saveSvg = (): void => {
    const blob = new Blob([svgContent], {
      type: tipos.svg
    })
    saveAs(blob, `${id}.svg`)
    toastify('Imagen convertida', true)
  }

  const convertSvgImg = async (): Promise<void> => {
    if (svgContent === '') return
    try {
      const response = await UrlBackend.post('convertSvgToImg', {
        dataSvg: svgContent,
        typeImg: typeSelect
      })
      const res: Svg = response.data
      if (res === undefined) {
        toastify('Error al convertir el archivo', false)
        return
      }
      const base64Image = btoa(
        new Uint8Array(res.dato.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      const imageUrl = `data:image/${res.type};base64,${base64Image}`
      saveAs(imageUrl, `${id}.${res.type}`)
      toastify('Imagen convertida', true)
    } catch (error) {
      toastify('Error al convertir la imagen', false)
    }
  }

  const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const content = e.target.value
    setSvg(content)
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
    if (typeSelect !== 'svg') {
      await convertSvgImg()
    } else {
      saveSvg()
    }
  }
  return (
    <main className=" bg-white p-2 h-[82vh] sm:h-screen m-0 w-full flex justify-center items-center flex-wrap">
      <div className="relative flex flex-col justify-center w-11/12 sm:w-7/12 lg:w-6/12 break-words mb-6 margin shadow-lg shadow-grey-400 rounded-xl border-0 max-h-[95vh] sm:min-h-[80vh]">
        <div className="rounded-t mb-0 px-6 sm:py-1 py-4 text-center">
          <h6 className="text-neutral-700 mb-3 text-lg font-bold uppercase">
            Convertidor de SVG
          </h6>
          <span className="mt-6 border-b-1 border-neutral-500" />
        </div>
        <div className="flex margin w-11/12 flex-col items-center justify-center rounded-lg bg-slate-50 border-4 border-dashed">
          <textarea
            className=" sm:min-h-[45vh] min-h-[35vh] w-full bg-transparent border-none outline-none rounded-md"
            name="file"
            onChange={handelChange}
          />
        </div>
        <form
          className="text-center mt-3 sm:p-1 p-5"
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
            Convertir
          </button>
        </form>
        <article className="w-11/12 flex justify-evenly items-center m-auto sm:py-3 py-4">
          {Object.keys(tipos).map((type, i) => (
            <button
              key={i}
              className={`rounded-md uppercase  text-white w-14 h-9 bg-rose-600 cursor-pointer ${
                i === elementSelected ? 'outline outline-green-400' : ''
              } `}
              onClick={() => {
                setTypeSelect(type)
                handelClickActive(i)
              }}
            >
              {type}
            </button>
          ))}
        </article>
      </div>
    </main>
  )
}

export default ConvertImg
