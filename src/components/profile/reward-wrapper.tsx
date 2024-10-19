import { Stack, Heading, Text } from "@chakra-ui/react"
import { ButtonCustom } from "components/ui"
import { t } from "i18next"

interface RewardType {
    title: string;
    value: number;
    loading: boolean;
    claim: () => void;
}

export const RewardWrapper = ({title, value, loading, claim}: RewardType) => {
    return (
        <Stack textAlign="center" gap={5} p={{ base: 10 }} zIndex={1}>
        <Text fontFamily={"Protest Strike, sans-serif"} fontSize="4xl">
          {title}
        </Text>
        <Heading
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 5px rgba(78, 251, 224, 0.5), -2px -2px 5px rgba(77, 176, 250, 0.6)"  // Glowing effect
        >
          {value} CRWD
        </Heading>
        <ButtonCustom
          typeButton={2}
          size="md"
          borderRadius="lg"
          isLoading={loading}
          onClick={() => claim}
          boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
        >
          <Text color="yellow">{t("common.claim")}</Text>
        </ButtonCustom>
      </Stack>
    )
}