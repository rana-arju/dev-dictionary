import React, { ReactNode } from 'react'

function Layout({children}:{children: ReactNode}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      {children}
    </div>
  );
}

export default Layout