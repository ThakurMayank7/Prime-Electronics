import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center justify-center">
        <Image src="/images/logo_1.png" alt="Prime Electronics" height={30} width={100} priority />
      </div>

<div className="ml-auto flex gap-2">

<div>
    Search
    {/* TODO Search */}
</div>

      <nav className="ml-auto">
        navigation
        {/* TODO */}
        {/* Cart */}
        {/* Wishlist */}
      </nav>
</div>
    </header>
  );
}

export default Header;
