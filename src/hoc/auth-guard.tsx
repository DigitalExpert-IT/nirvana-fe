import { useGetAccount } from "hooks";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";


export const withAuthGuard = (WrappedComponent: React.ComponentType) => {
  return function AuthGuard(props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data, error } = useGetAccount();

    useEffect(() => {
      if (pathname === "/profile" && error !== undefined) {
        router.push(`/`); 
      }
    }, [pathname, data, router, error]);

    
    return <WrappedComponent {...props} />;
  };
};
