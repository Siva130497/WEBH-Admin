// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/profile_default.png'
import { useEffect, useState } from 'react'

const UserDropdown = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState("")
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/login')
  }

  const reset = (e) => {
    e.preventDefault()
   
    navigate('/resetAdmin')
  }
  const routerHandler = () => {
    navigate('/profile')
  }

    useEffect(() => {
    //check whether user has signed in
    if (localStorage.getItem("userAuthToken")) {
        setIsSignedIn(true)
        console.log(isSignedIn)

        //get user data
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
            console.log(user)
        }

    } else {
      setIsSignedIn(false)
    }
  }, [])

  if (user) {
    
  }

  return <>
    {user ? <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{user.firstname} {user.lastname}</span>
          <span className='user-status'>Admin</span>
        </div>
         <Avatar img={user.profilePicture ? user.profilePicture : defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
        
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile' onClick={routerHandler}>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/' onClick={reset}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Reset Credential</span>
        </DropdownItem>
      
        <DropdownItem tag={Link} to='/home' onClick={logout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown> : <></>}
  </>
}

export default UserDropdown
