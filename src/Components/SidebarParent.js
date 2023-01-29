import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import Sidebar1 from './Sidebar1'
export default function SidebarParent() {
	return (
		<>
			<ProSidebarProvider>
				<Sidebar1 />
			</ProSidebarProvider>
		</>
	)
}
