import ThemeArea from './components/ThemeArea/ThemeArea'
import OptimizeApp from './components/OptimizeApp/OptimizeApp'
import FontSize from './components/FontSize/FontSize'

import { fontSizeData, getFontSize } from './utils/getFontSize'

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
            min={fontSizeData.ar.min}
            max={fontSizeData.ar.max}
            value={fontSizes.ar}
            example="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
          />
          <FontSize
            label="en"
            min={fontSizeData.en.min}
            max={fontSizeData.en.max}
            value={fontSizes.en}
            example="In the name of God, the Most Gracious, the Most Merciful"
          />
        </div>
        <div className="con_bg_df df_ai_ce_child list_y">
          <div className="title df_jc_ce">Optimize app</div>
          <div className="line_x line_dark"></div>
          <OptimizeApp />
        </div>
      </div>
    </>
  )
}
