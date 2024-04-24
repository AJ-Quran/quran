export default function HomeSubcscribe({ scrollDotActiveI }) {
  function scrollUp(e) {
    const homePage = e.target.closest('.home_page')

    homePage.scrollTop = 0
    scrollDotActiveI(0)
  }

  return (
    <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
      <div className="list_y df_ai_ce two_blur_balls">
        <b className="main_big_text">
          <span className="txt_gradient">Subcscribe</span>
        </b>
        <div className="txt_opa">Do not lose hope - Follow us for more! 😊</div>
      </div>
      <div className="list_y df_ai_ce">
        <div className="list_x subscribe_area fz_big">
          <a
            href="https://github.com/AJ-Quran"
            rel="noreferrer"
            className="con_bg_dr github"
          >
            <div className="df_fd_cl df_jc_sb h_100">
              <i className="fa-brands fa-github fz_big"></i>
              <b className="df_jc_end">GitHub</b>
            </div>
          </a>
          <a
            href="https://t.me/AJ_Quran"
            rel="noreferrer"
            className="con_bg_dr telegram"
          >
            <div className="df_fd_cl df_jc_sb h_100">
              <i className="fa-brands fa-telegram fz_big"></i>
              <b className="df_jc_end">Telegram</b>
            </div>
          </a>
        </div>
      </div>
      <div className="facts">
        <div
          className="con_bg_gradient main_btn active_bg_anim active"
          onClick={scrollUp}
        >
          <div className="con_bg_dr con_ha facts_bg df_f_ce">
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined fz_normal">
                arrow_upward
              </span>
              <span>Explore</span>
            </div>
          </div>
        </div>
      </div>
      <div className="txt_opa fz_mono all_rights_txt">
        All rights reserved © {new Date().getFullYear()}
      </div>
    </div>
  )
}
