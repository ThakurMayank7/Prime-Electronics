import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader} from './ui/sidebar'


function MySidebar() {
  return (
    <div className="md:hidden">
        <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        a
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
      </div>
  )
}

export default MySidebar