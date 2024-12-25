"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function Asynchronous({ data, setCategory }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1000); // Simulate loading
            setLoading(false);
            setOptions([...data]);
        })();
    };

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    const handleChange = (event, value) => {
        // `value` contains the selected option or null if cleared
        setCategory(value?.name); // Update the selected category
        // Log the selected value
    };

    return (
        <Autocomplete
            sx={{ width: '100%' }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            onChange={handleChange} // Handle value change
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        className:
                            "mt-1 w-full sub-shad h-12 outline-indigo-300 bg-transparent border border-gray-200 px-3 font-poppins rounded-md shadow-sm sm:text-xl",
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
