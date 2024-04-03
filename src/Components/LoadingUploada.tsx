import '../css/styleUplodasLoading.css'

const LoadingUploada = (): JSX.Element => {
  return (
    <div className="loading-upload">
      <div className="dot-spinner">
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
        <div className="dot-spinner__dot" />
      </div>
    </div>
  )
}

export default LoadingUploada
