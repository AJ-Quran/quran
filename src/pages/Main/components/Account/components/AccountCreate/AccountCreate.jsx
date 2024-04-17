import Avatar from '../utils/Avatar'

export default function AccountCreate() {
  return (
    <>
      <div className="mar_ce list_y df_ai_ce df_jc_ce_child">
        <Avatar style={{ width: '80px', fontSize: '40px' }}></Avatar>
        <div
          className="con_bg_gradient con_ha list_x df_ai_ce w_100"
          onClick={() => (window.location.href = 'account/signup')}
        >
          <span className="material-symbols-outlined fz_normal">person_add</span>
          <span>Sign up</span>
        </div>
        <div
          className="con_bg_df con_ha list_x df_ai_ce w_100"
          onClick={() => (window.location.href = 'account/login')}
        >
          <span className="material-symbols-outlined fz_normal">login</span>
          <span>Log in</span>
        </div>
      </div>
    </>
  )
}
