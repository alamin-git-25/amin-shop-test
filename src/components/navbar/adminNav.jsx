"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { Avatar, Badge, IconButton, styled } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { ShoppingCartIcon } from 'lucide-react'

export default function AdminNav() {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
        <header
            className="flex z-50 sticky top-0 left-0 w-full bg-gray-100 shad justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <div className='pr-5 flex justify-center items-center gap-6'>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <p>Admin</p>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </div>
        </header>
    )
}
