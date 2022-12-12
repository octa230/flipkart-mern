import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const [zipCode, setzipCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    const handleZipSearch = (e) => {
        e.preventDefault();
        if(zipCode.trim()){
            navigate(`/products/${zipCode}`)
        }else{
            navigate('/products')
        }
    }

    return (
        <Box sx={{width: '80%'}}>
           <Stack spacing={1}>
           <form onSubmit={handleSubmit} className="w-auto flex-1 sm:w-9/12 px-1 gap-3 
           sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} 
            className="text-sm outline-none border-none placeholder-gray-500 flex-1" size='small' type="text" placeholder="Search for products" />
            <button type="submit" className="text-primary-blue"><SearchIcon /></button>
        </form>
        <form onSubmit={handleZipSearch} className="w-300 sm:w-9/12 px-1 gap-3 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
        <input value={zipCode} onChange={(e) => setzipCode(e.target.value)} 
            className="text-sm outline-none border-none placeholder-gray-500 flex-1" size='small' type="text" placeholder="Search for products using zipCode" />
            <button type="submit" className="text-primary-blue"><SearchIcon /></button>
        </form>
            </Stack>                
        
        
        </Box>
    );
};

export default Searchbar;
