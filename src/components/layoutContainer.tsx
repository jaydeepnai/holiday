'use client'

import { usePathname } from "next/navigation"
import ClientOnly from "./ClientOnly";
import Navbar from "./Navbar/Navbar";

export const Layout= async({
    child,
  }: Readonly<{
    child: React.ReactNode;
  }>)=>{
  const pathname = usePathname()
    return (
        <div>
            {(pathname == '/signin' || pathname == '/signup') ? (
                <>{child}</>
              ) : (<>
                <ClientOnly >
                  {/* <SearchModel />
                  <RentModel />
                  <RegisterModel />
                  <LoginModel />
                  <ToastProvider /> */}
                <Navbar />
                </ClientOnly>
                <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                  <div className="flex h-screen flex-col justify-between font-sans">
                    <main className="mb-auto">{child}</main>
                  </div>
                </section>
              </>
              )}
        </div>
    )

}