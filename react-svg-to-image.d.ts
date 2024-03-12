declare module 'react-svg-to-image' {
  const toImg: (
    svgContent: string,
    fileName: string,
    options?: { format: string }
  ) => void
  export default toImg
}
