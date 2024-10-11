import React from "react";
import { t } from "i18next";
// import Image from "next/image";
import { Trans } from "react-i18next";
import { TableData } from "components/ui/table";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { createColumnHelper } from "@tanstack/react-table";
import { RANKNETWORK, IRankNetwork } from "constant";
import { Heading, Text, Icon, Stack } from "@chakra-ui/react";

const columnHelper = createColumnHelper<IRankNetwork>();

const columns = [
  columnHelper.accessor("rank", {
    cell: info => (
      <Stack
        direction="row"
        align="center"
        w={{ base: 40, md: "20em" }}
        whiteSpace="pre-wrap"
      >
        <Icon
          as={MdOutlineDoubleArrow}
          color="teal.400"
          w={{ base: "3", md: "5" }}
          h={{ base: "3", md: "7" }}
        />
        <Text
          fontSize={{ base: "sm", md: "xl" }}
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.rankNft") ?? "",
  }),

  columnHelper.accessor("activeDownline", {
    cell: info => (
      <Text
        fontSize={{ base: "sm", md: "xl" }}
        textTransform="capitalize"
        textAlign="left"
      >
        {info.getValue()}
      </Text>
    ),
    header: t("common.activeDownline") ?? "",
  }),

  columnHelper.accessor("totalNftBuy", {
    cell: info => (
      <Stack
        direction="row"
        w={{ base: 20, md: 20 }}
        whiteSpace="pre-wrap"
        justify="center"
      >
        <Text
          fontSize={{ base: "sm", md: "xl" }}
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.totalNftBuy") ?? "",
  }),

  columnHelper.accessor("leadershipBonus", {
    cell: info => (
      <Stack
        direction="row"
        w={{ base: 20, md: "10em" }}
        whiteSpace="pre-wrap"
        justify="center"
      >
        <Text
          fontSize={{ base: "sm", md: "xl" }}
          textTransform="capitalize"
          color="gray.300"
        >
          {info.getValue()}
        </Text>
      </Stack>
    ),
    header: t("common.leadershipBonus") ?? "",
  }),
];

export const TableNetwork = () => {
  return (
    <Stack
      textAlign="center"
      pt={{ base: "10", sm: "20" }}
      align="center"
      justify="center"
      pos="relative"
      overflow="hidden"
    >
      <Heading
        textAlign="center"
        textTransform="uppercase"
        pb={10}
        _after={{
          content: `'${t("common.bnbPlan")}'`,
          display: "block",
          textAlign: "center",
          alignSelf: "center",
          color: "whiteAlpha.100",
          transform: {
            md: "scale(3) translateY(-20px)",
            base: "scale(3) translateY(-10px)",
          },
        }}
        fontSize={{ md: "6xl", base: "4xl" }}
      >
        <Trans i18nKey="common.bnbPlan" />
      </Heading>
      <TableData
        data={RANKNETWORK}
        columns={columns}
        tableCustom={{
          variant: "variantCrowd",
          maxWidth: "100%",
          zIndex: "2",
        }}
      />
    </Stack>
  );
};
