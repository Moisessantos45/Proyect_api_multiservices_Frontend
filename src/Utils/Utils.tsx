import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const toastify = (text: string, type: boolean): void => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    newWindow: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: type
        ? 'linear-gradient(to right, #00b09b, #96c93d)'
        : 'linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))',
      borderRadius: '10px'
    }
  }).showToast()
}

export default toastify
