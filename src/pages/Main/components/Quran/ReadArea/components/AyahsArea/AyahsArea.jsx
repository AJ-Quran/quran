import { useEffect, useRef, useState } from 'react'

import ProgressBar from '../ProgressBar/ProgressBar'
import AyahsAreaButtons from './components/AyahsAreaButtons/AyahsAreaButtons'

import { ceil } from '../../../../../../../js/math/number'
import { progressPercent } from '../../../../../../../js/math/percent'
import { deviceIsPhone } from '../../../../../../../js/utils/device'
import { pause, play } from '../../../../../../../js/utils/audio'
import { read, readStop } from '../../../../../../../js/utils/read'
import { getFontSize } from '../../../../Settings/utils/getFontSize'

import './AyahsArea.css'

export default function AyahsArea({ arAyahs, engAyahs, surahI, setSurahI }) {
  const audioRef = useRef()
  const engText = useRef()
  const [arPlaying, setArPlaying] = useState(false)
  const [enPlaying, setEnPlaying] = useState(false)
  const fontSizes = getFontSize()

  const ayahsLen = arAyahs?.length || 0
  const { ayah } = surahI

  const progress = progressPercent(ayah, arAyahs?.length)
  const isPhone = deviceIsPhone()

  useEffect(() => {
    const audio = audioRef?.current
    audio.addEventListener('ended', audioFinished)

    return () => {
      audio.removeEventListener('ended', audioFinished)
    }
  }, [arPlaying])

  useEffect(() => {
    if (enPlaying) readEnglish()
  }, [surahI?.ayah])

  function toggleAudio() {
    if (arPlaying) return stopArabic(audioRef?.current)

    stopEnglish()
    readArabic(audioRef?.current)
  }

  function toggleEngAudio() {
    if (enPlaying) return stopEnglish()

    stopArabic(audioRef?.current)
    readEnglish()
  }

  function readArabic(audio) {
    play(audio)
    setArPlaying(true)
  }

  function stopArabic(audio) {
    pause(audio)
    setArPlaying(false)
  }

  function readEnglish() {
    read(engText.current.textContent, () => {
      audioFinished()
    })
    setEnPlaying(true)
  }

  function stopEnglish() {
    readStop()
    setEnPlaying(false)
  }

  function audioFinished() {
    setSurahI((cur) => ({ ...cur, ayah: cur.ayah + 1 }))
  }

  return (
    <div className="ayahs_area list_y df_jc_sb h_100">
      <div className="list_y">
        <div className="ayahs_area_info list_y mar_ce">
          <div className="list_y_small">
            <ProgressBar value={ayah} max={ayahsLen} />
            <div className="df_jc_sb fz_small">
              <div>
                {ayah}/{ayahsLen}{' '}
                <b className="txt_red">{ayahsLen - ayah} left</b>
              </div>
              <div>{ceil(progress) || 0}%</div>
            </div>
          </div>
          {!isPhone && (
            <AyahsAreaButtons
              surahI={surahI}
              setSurahI={setSurahI}
              setArPlaying={setArPlaying}
            />
          )}
        </div>
        {ayah < ayahsLen && (
          <div className="list_y">
            <div className="con_bg_df ayahs_text_area df_f_ce list_y">
              <div className="df_f w_100">
                <div className="con_bd_df con_ha df_f_ce" onClick={toggleAudio}>
                  <span className={`material-symbols-outlined fz_normal`}>
                    {arPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <audio
                    ref={audioRef}
                    src={arAyahs[ayah]?.audio}
                    autoPlay={arPlaying}
                  ></audio>
                </div>
              </div>
              <div className="line_x_small line_dark"></div>
              <p
                className="txt_ar w_100 font_size_transition"
                style={{ fontSize: `${fontSizes.ar}px` }}
              >
                {arAyahs[ayah]?.text}
              </p>
            </div>
            <div className="con_bg_df ayahs_text_area df_f_ce ayahs_eng_area list_y">
              <div className="df_f w_100">
                <div
                  className="con_bd_df con_ha df_f_ce"
                  onClick={toggleEngAudio}
                >
                  <span className={`material-symbols-outlined fz_normal`}>
                    {enPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </div>
              </div>
              <div className="line_x_small line_dark"></div>
              <p
                ref={engText}
                className="w_100 font_size_transition"
                style={{ fontSize: `${fontSizes.en}px` }}
              >
                {engAyahs[ayah]?.text}
              </p>
            </div>
          </div>
        )}
      </div>
      {isPhone && (
        <AyahsAreaButtons
          surahI={surahI}
          setSurahI={setSurahI}
          setArPlaying={setArPlaying}
        />
      )}
    </div>
  )
}
