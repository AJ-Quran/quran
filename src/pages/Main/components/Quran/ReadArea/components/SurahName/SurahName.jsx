import './SurahName.css'

export default function SurahName({ surahData }) {
  return (
    <div className="con_bg_gradient con_h df_jc_ce surah_name loading_area">
      <div className="w_max df_ai_ce list_y">
        <b>{surahData?.englishName}</b>
        <div>{surahData?.englishNameTranslation}</div>
        <div className="line_x_small"></div>
        <div className="txt_opa fz_small list_x">
          <div>{surahData?.revelationType}</div>
          <div>•</div>
          <div>{surahData?.numberOfAyahs} verses</div>
        </div>
      </div>
    </div>
  )
}
