export default function getPerson(person, i) {
  return (
    <div className="con_bg_gradient active_bg_anim active" key={i}>
      <div className="con_bg_dr facts_bg list_y df_ai_ce">
        <div className="avatar df_f_ce">
          <img src={person.img.img} alt={person.title} />
        </div>
        <b className="fz_big">{person.name}</b>
        <div className="txt_opa fz_small">{person.title}</div>
        <div className="social_media list_x">
          {person.socialMedia?.map((social, j) => {
            return (
              <a
                href={social.link}
                rel="noreferrer"
                className="con_bg_df con_ha df_f_ce"
                key={j}
              >
                <i className={`${social.logo} fz_big`}></i>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
