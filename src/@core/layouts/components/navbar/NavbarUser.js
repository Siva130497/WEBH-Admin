// ** Dropdowns Imports
import UserDropdown from './UserDropdown'
import NotificationDropdown from './NotificationDropdown'
import CartDropdown from './CartDropdown'
import NavbarBookmarks from './NavbarBookmarks'
import NavbarSearch from './NavbarSearch'


const NavbarUser = () => {
  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/* <NotificationDropdown/> */}
      {/* <CartDropdown/> */}
      {/* <NavbarBookmarks/> */}
      {/* <NavbarSearch/> */}
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
