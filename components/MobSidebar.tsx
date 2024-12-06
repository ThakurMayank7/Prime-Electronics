import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { MenuIcon } from 'lucide-react'

function MobSidebar() {
  return (
    <Sheet >
          <SheetTrigger asChild>
          <MenuIcon color='white' size={24} className='block sm:hidden mr-1'/>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              
            </div>
            <SheetFooter>
              <SheetClose asChild>
                Close
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
  )
}

export default MobSidebar