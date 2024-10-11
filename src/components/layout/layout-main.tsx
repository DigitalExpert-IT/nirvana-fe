import React from "react";
import { Box } from "@chakra-ui/react";
import { Metadata } from "components/layout";
import { Navbar } from "components/navbar";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Metadata
        language="en"
        author="CROWD"
        description="The CROWD aims to revolutionize the world of network marketing by decentralizing millions of users through web3 applications"
      />
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};
