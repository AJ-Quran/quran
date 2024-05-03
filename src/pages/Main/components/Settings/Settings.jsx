import ThemeArea from './components/ThemeArea/ThemeArea'
import OptimizeApp from './components/OptimizeApp/OptimizeApp'
import FontSize from './components/FontSize/FontSize'

import { getFontSize } from './utils/getFontSize'

export default function Settings() {
  const fontSizes = getFontSize()

  return (
    <>
      <div className="main_w_small mar_ce list_y df_ai_ce w_100_child">
        <div className="con_bg_df df_ai_ce_child list_y">
          <div className="title df_jc_ce">Theme</div>
          <div className="line_x line_dark"></div>
          <div className="list_x df_jc_sb">
            <div>App theme</div>
            <ThemeArea />
          </div>
        </div>
        <div className="con_bg_df df_ai_ce_child list_y">
          <div className="title df_jc_ce">Font Size</div>
          <div className="line_x line_dark"></div>
          <FontSize
            label="ar"
            min="14"
            max="30"
            range="2"
            value={fontSizes.ar}
            example="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
          />
          <FontSize
            label="en"
            min="14"
            max="30"
            range="2"
            value={fontSizes.en}
            example="In the name of God, the Most Gracious, the Most Merciful"
          />
        </div>
        <div className="df_jc_ce">
          <OptimizeApp />
        </div>
      </div>
    </>
  )
}
