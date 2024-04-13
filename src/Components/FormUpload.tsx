import React from 'react'
import { MagicMotion } from 'react-magic-motion'
import ItemsFiles from './ItemsFiles'

interface FormProps {
  typeAccept: string
  textButton: string
  file: File[] | null
  handelSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  handelChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  deleteFile: (index: number) => void
}

const FormUpload: React.FC<FormProps> = ({
  typeAccept,
  file,
  textButton,
  handelSubmit,
  handelChange,
  deleteFile
}): JSX.Element => {
  return (
    <div
      className={`relative flex flex-col justify-center w-10/12 sm:w-7/12 md:w-10/12 lg:w-5/12 break-words mb-6 margin shadow-lg shadow-grey-400 rounded-lg border-0 ${
        file !== null && file?.length > 0
          ? 'sm:min-h-[79vh] md:min-h-[90vh] min-h-[60vh]'
          : 'sm:min-h-[65vh] min-h-[40vh] md:min-h-[40vh]'
      }`}
    >
      <div className="flex margin w-11/12 flex-col items-center justify-center rounded-lg bg-slate-50 border-2 border-indigo-500 border-dotted h-32 md:min-h-[45vh]">
        <input
          className="sr-only"
          type="file"
          name="file"
          id="file"
          multiple
          onChange={handelChange}
          accept={typeAccept}
        />
        <label
          htmlFor="file"
          className="relative flex min-h-32 md:min-h-[35vh] items-center justify-center rounded-md border-[#e0e0e0] p-8 text-center flex-col cursor-pointer m-auto w-full"
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
      </div>
      {file !== null && (
        <MagicMotion>
          <article className=" w-full m-auto p-4 gap-2 sm:max-h-28 flex flex-col overflow-y-auto scroollBat">
            {file.map((item, i) => (
              <ItemsFiles item={item} deleteFile={deleteFile} key={i} i={i} />
            ))}
          </article>
        </MagicMotion>
      )}

      <form className="text-center p-2" onSubmit={handelSubmit}>
        <button
          type="submit"
          className="bg-blue-600 text-neutral-200 active:bg-neutral-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-11/12 ease-linear transition-all duration-150"
        >
          {textButton}
        </button>
      </form>
    </div>
  )
}

export default FormUpload
