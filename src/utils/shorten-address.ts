export const shortenAddress = (address?: string | null): string => {
  //   if (!address) return "0x0";

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  return address?.replace(/^(.{6})(.+)(.{4})/, "$1...$3")!;
};
