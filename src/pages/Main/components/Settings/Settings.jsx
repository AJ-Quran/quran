import ThemeArea from './components/ThemeArea/ThemeArea'

export default function Settings() {
  return (
    <>
      <div className="main_w_small mar_ce">
        <div className="con_bg_df df_jc_sb df_ai_ce">
          <div>App theme</div>
          <ThemeArea />
        </div>
      </div>
    </>
  )
}
