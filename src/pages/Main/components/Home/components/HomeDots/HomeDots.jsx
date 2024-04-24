export default function HomeDots({
  scroll,
  scrollBtns,
  removeActiveDot,
  pageHeight,
}) {
  const dots = Array(5).fill(1)

  function scrollDotBtn(e) {
    const btn = e.target
    if (btn.classList.contains('active')) return

    if (btn.classList.contains('scroll_dot_btn')) {
      const index = [...scrollBtns.current.children].indexOf(btn)

      removeActiveDot()
      btn.classList.add('active')

      const homePage = btn.closest('.home_page')
      homePage.scrollTop = index * pageHeight
    }
  }

  return (
    <div className="scroll_btns list_y df_ai_ce_child">
      <div
        className="con_bg_df con_ha up_down_btn df_f_ce"
        onClick={() => scroll('up')}
      >
        <span className="material-symbols-outlined">expand_less</span>
      </div>
      <div ref={scrollBtns} className="list_y" onClick={scrollDotBtn}>
        {dots.map((_, i) => {
          return (
            <div
              className={`con_bg_df con_ha scroll_dot_btn ${
                i === 0 ? 'active' : ''
              }`}
              key={i}
            ></div>
          )
        })}
      </div>
      <div
        className="con_bg_df con_ha up_down_btn df_f_ce"
        onClick={() => scroll('down')}
      >
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </div>
  )
}
