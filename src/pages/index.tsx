import { Container, Box } from "@chakra-ui/react";
import { Layout } from "components/layout";
import {
  Header,
  SectionNftList,
  TableFarmMatching,
  TableNetwork,
  TableRank,
} from "components/section";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box pt={{ base: "5rem", md: "8rem" }}>
        <Container maxW="container.xl">
          <Header
            title={t("common.header.title")}
            description={t("common.header.description")}
            typeDaps={t("common.header.typeDeps")}
          />
        </Container>
      </Box>
      <Box
        backgroundImage="https://ik.imagekit.io/msxxxaegj/nirvana/bg-card-section.jpg?updatedAt=1728144026830"
        backgroundSize="cover"
      >
        <Box bgGradient="linear(rgba(33,36,40,1), rgba(17,17,17,0.4),rgba(17,17,17,1))">
          <SectionNftList />
        </Box>
      </Box>
      <Box backgroundImage="/bg-banner-section.webp" backgroundSize="cover">
        <Box
          bgGradient="linear(rgba(17,17,17,1), rgba(17,17,17,0.3),rgba(17,17,17,1))"
          pb="10rem"
        >
          <TableNetwork />
        </Box>
      </Box>
      <Box bgGradient={"radial(#330066, #1d1d1b)"}>
        <Box
          bgGradient="linear(rgba(17,17,17,1), rgba(17,17,17,0.3),rgba(17,17,17,1))"
          pb="10rem"
        >
          <TableRank />
        </Box>
      </Box>
      <Box bgGradient={"radial(#330066, #1d1d1b)"}>
        <Box
          bgGradient="linear(rgba(17,17,17,1), rgba(17,17,17,0.3),rgba(17,17,17,1))"
          pb="10rem"
        >
          <TableFarmMatching />
        </Box>
      </Box>
    </Layout>
  );
}
