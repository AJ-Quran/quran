import ThemeArea from './components/ThemeArea/ThemeArea'
import OptimizeApp from './components/OptimizeApp/OptimizeApp'

export default function Settings() {
  return (
    <>
      <div className="main_w_small mar_ce list_y df_ai_ce w_100_child">
        <div className="con_bg_df df_jc_sb df_ai_ce">
          <div>App theme</div>
          <ThemeArea />
        </div>
        <div className="df_jc_ce">
          <OptimizeApp />
        </div>
      </div>
    </>
  )
}
