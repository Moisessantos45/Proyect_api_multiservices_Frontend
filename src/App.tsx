import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import Extract from './Pages/Extract'
import ExtractContent from './Pages/ExtractContent'
import ConvertImg from './Pages/ConvertImg'
import ConvertImgToPdf from './Pages/ConvertImgToPdf'
import ConvertImgToWord from './Pages/ConvertImgToWord'
import ImageOptimization from './Pages/ImageOptimization'

const App = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'extractTextPDF/:id',
        element: <ExtractContent />
      },
      {
        path: 'extractTextDOCX/:id',
        element: <ExtractContent />
      },
      {
        path: 'extractImage/:id',
        element: <Extract />
      },
      {
        path: 'convertSVG/:id',
        element: <ConvertImg />
      },
      {
        path: 'convertImgToPdf/:id',
        element: <ConvertImgToPdf />
      },
      {
        path: 'image-Optimization/:id',
        element: <ImageOptimization />
      },
      {
        path: 'convertImgToWord/:id',
        element: <ConvertImgToWord />
      }
    ]
  }
])

export default App
