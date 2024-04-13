const Footer = (): JSX.Element => {
  const fecha = new Date().getFullYear()
  return (
    <footer className=" relative bg-gray-900 px-4 pt-5 h-28 sm:h-auto flex justify-center items-center">
      <p className="py-5 text-center text-gray-300">© {fecha} Api OptiFile</p>
    </footer>
  )
}

export default Footer
