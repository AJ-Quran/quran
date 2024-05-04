import { useEffect } from 'react'

import Button from '../../../../../../../../../components/Button/Button'

import { readDone } from '../../../../util/readDone'

export default function AyahsAreaButtons({ surahI, setSurahI, setArPlaying }) {
  function back() {
    setArPlaying(false)

    if (surahI.ayah <= 0) return
    setSurahI({ ...surahI, ayah: surahI.ayah - 1 })
  }

  async function done() {
    await readDone(surahI, setSurahI)
  }

  function next() {
    setArPlaying(false)
    setSurahI({ ...surahI, ayah: surahI.ayah + 1 })
  }

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Enter' || e.code === 'Space') done()

      if (e.key === 'ArrowLeft') back()
      if (e.key === 'ArrowRight') next()
    }

    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [surahI])

  return (
    <div className="con_bg_dr ayah_area_buttons df_jc_sb df_ai_ce_child list_x">
      <Button
        disabled={surahI.ayah === 0}
        className="bd_btn list_x"
        onClick={back}
      >
        <span className="material-symbols-outlined fz_normal">
          chevron_left
        </span>
        <span>Back</span>
      </Button>
      <Button className="con_bg_gradient con_ha" onClick={done}>
        <span>I'm done</span>
      </Button>
      <Button className="bd_btn list_x" onClick={next}>
        <span>Next</span>
        <span className="material-symbols-outlined fz_normal">
          chevron_right
        </span>
      </Button>
    </div>
  )
}
