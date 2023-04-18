import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import Searchbar from './Searchbar';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#00ff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  return (

<Box sx={{width: '100%'}}>
  <Stack direction={{xs: 'column', sm: 'row'}}
  spacing={{xs: 1, sm: 2, md: 4 }}
  >

{/* <!-- navbar container --> */}
<Item className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative gap-3">

  {/* <!-- logo & search container --> */}
  <div className="flex items-center flex-1 gap-3">
    <Item>
      <Link to={'/'} className="text-white py-2">Home</Link>
    </Item>

    <Searchbar />
  </div>
  {/* <!-- logo & search container --> */}

  {/* <!-- right navs --> */}
  <Stack spacing={2}
  >
    
  <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

{isAuthenticated === false ?
<Item>
<Link to="/login" className="px-1 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer">Login</Link>

</Item>
:
(
<span className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer" 
onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
<span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
</span>
)
}

{togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

{
<span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
<span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
</span>

}
{toggleSecondaryDropDown && <SecondaryDropDownMenu />}

<Item>
<Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
<span><ShoppingCartIcon /></span>
{cartItems.length > 0 &&
<div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute-top-2 left-3 flex justify-center items-center border">
{cartItems.length}
</div>
}
Cart
</Link>
</Item>
</div>

  </Stack>
  {/* <!-- right navs --> */}

</Item>
{/* <!-- navbar container --> */}
  </Stack>
</Box>
  )
};

export default Header;
