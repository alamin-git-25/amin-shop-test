
import React from 'react'
import "../../globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import AdminNav from '@/components/navbar/adminNav';
import ReduxProvider from '@/redux/storeProvider';
export default function layout({ children }) {
    return (
        <html>
            <body >
                <ReduxProvider>
                    <SidebarProvider >
                        <AppSidebar />
                        <SidebarInset>
                            <main className='bg-gray-100 min-h-screen overflow-hidden '>
                                < AdminNav />
                                {children}
                            </main>
                        </SidebarInset>
                    </SidebarProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}

