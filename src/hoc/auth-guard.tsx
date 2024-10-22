import { useGetAccount } from "hooks";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";


export const withAuthGuard = (WrappedComponent: React.ComponentType) => {
  return function AuthGuard(props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data } = useGetAccount();

    useEffect(() => {
      if (pathname === "/profile" && data === undefined) {
        router.push(`/`); 
      }
    }, [pathname, data, router]);

    
    return <WrappedComponent {...props} />;
  };
};
