import { deviceIsPhone } from '../../../../../../js/utils/device'

export default function HomeFacts() {
  const isPhone = deviceIsPhone()

  return (
    <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
      <div className="list_y df_ai_ce two_blur_balls">
        <b className="main_big_text">
          <span className="txt_gradient">Facts</span>
        </b>
        <div className="txt_opa txt_wrap_b txt_alg_ce">
          Discover the secrets of the Quran ✨ - Start your enlightening
          journey! 📖
        </div>
      </div>
      <div className="list_y df_ai_ce">
        <div className={`list_${isPhone ? 'y' : 'x'} facts`}>
          <div className="con_bg_gradient">
            <div className="con_bg_dr facts_bg"></div>
            <div className="con_bg_dr facts_con df_jc_sb">
              <b>Surahs</b>
              <div className="df_ai_end">
                <div></div>
                <div>144</div>
              </div>
            </div>
          </div>
          <div className="con_bg_gradient">
            <div className="con_bg_dr facts_bg"></div>
            <div className="con_bg_dr facts_con df_jc_sb">
              <b>Ayahs</b>
              <div className="df_ai_end">
                <div></div>
                <div>6 236</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
