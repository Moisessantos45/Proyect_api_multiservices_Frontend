import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Navbar = (): JSX.Element => {
  const id = uuidv4()
  return (
    <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
      <NavLink
        to={'/'}
        className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
      >
        <span className="mr-2 text-4xl text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-adonis-js"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            <path d="M8.863 16.922c1.137 -.422 1.637 -.922 3.137 -.922s2 .5 3.138 .922c.713 .264 1.516 -.102 1.778 -.772c.126 -.32 .11 -.673 -.044 -.983l-3.708 -7.474c-.297 -.598 -1.058 -.859 -1.7 -.583a1.24 1.24 0 0 0 -.627 .583l-3.709 7.474c-.321 .648 -.017 1.415 .679 1.714c.332 .143 .715 .167 1.056 .04z" />
          </svg>
        </span>
        DocuExtract
      </NavLink>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className="absolute top-5 right-7 cursor-pointer md:hidden"
        htmlFor="navbar-open"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start "
      >
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="font-bold md:mr-12">
            <NavLink to={`/extractTextPDF/${id}`}>ExtractoPDF</NavLink>
          </li>
          <li className="md:mr-12">
            <NavLink to={`/extractTextDOCX/${id}`}>ExtractoDoc</NavLink>
          </li>
          <li className="md:mr-12">
            <NavLink to={`/extractImage/${id}`}>ImageOut</NavLink>
          </li>
          <li>
            <NavLink to={`/convertSVG/${id}`}>ConvertSvg</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
