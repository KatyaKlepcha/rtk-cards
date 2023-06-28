import React from 'react'
import Avatar from '../../../images/Avatar.jpg'
import { useAppSelector } from '../../../../app/hooks/useAppSelector'
import { selectName } from '../../../../features/profile/profile-selector'
import s from './ProfileDropdown.module.css'
import user from '../../../images/user.svg'
import logout from '../../../images/log-out.svg'

const ProfileDropdown = () => {
  const name = useAppSelector(selectName)

  return (
    <div>
      <div className={s.nameWrapper}>
        <img src={Avatar} className={s.avatar} alt={'Avatar'} />
        <div className={s.nameBlock}>
          <div className={s.userName}>{name}</div>
          <div className={s.mail}>{name}</div>
        </div>
      </div>
      <div className={s.profileBlock}>
        <div>
          <img src={user} className={s.userImg}></img>
          <span>My Profile</span>
        </div>
        <div>
          <img src={logout} className={s.logoutImg}></img>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
