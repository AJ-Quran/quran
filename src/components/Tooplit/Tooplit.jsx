import './Tooplit.css'

export default function Tooplit({ onHide, children, pos }) {
  const { x, y } = pos

  return (
    <>
      <div className="tooplit_area alert_area">
        <div className="alert_bg" onClick={onHide}></div>
        <div
          className="con_bd_cl bg_blur_theme_more tooplit_con"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
