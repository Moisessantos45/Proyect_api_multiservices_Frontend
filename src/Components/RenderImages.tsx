import React from 'react'
import { MagicMotion } from 'react-magic-motion'

interface RenderImagesProps {
  filesRender: string[]
  deleteFile: (index: number) => void
}

const RenderImages: React.FC<RenderImagesProps> = ({
  filesRender,
  deleteFile
}): JSX.Element => {
  if (filesRender.length > 0) {
    return (
      <MagicMotion>
        <article className="sm:w-5/12 w-11/12 md:w-10/12 lg:w-5/12 sm:h-[62vh] md:h-[30vh] lg:h-[60vh] h-[35vh] flex justify-evenly flex-wrap gap-2 p-2 overflow-y-auto scroollBat border-2 border-indigo-500 border-dotted">
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
    )
  } else {
    return <span></span>
  }
}

export default RenderImages
