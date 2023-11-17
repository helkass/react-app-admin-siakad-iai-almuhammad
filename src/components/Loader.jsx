import { Skeleton, Stack } from "@chakra-ui/react";

export const TableLoader = () => {
   return (
      <Stack spacing="2">
         <Skeleton h="14" />
         <Skeleton h="14" />
         <Skeleton h="14" />
      </Stack>
   );
};
