import {
   Box,
   Card,
   CardBody,
   CardHeader,
   HStack,
   Heading,
   Skeleton,
   Stack,
} from "@chakra-ui/react";

/**
 *
 * @param {title} header
 * @param {val} number
 * @param {Icon} IconType
 * @param {isLoading} bool skeleton loading
 * @returns
 */
const CardSummary = ({ title, val, Icon, isLoading }) => {
   return (
      <Card minW="180px">
         {isLoading ? (
            <Stack spacinf="2">
               <Skeleton height="10" />
               <Skeleton height="12" />
            </Stack>
         ) : (
            <>
               <CardHeader bg="primary.700" color="white" py="2.5">
                  <Heading fontSize="18">{title}</Heading>
               </CardHeader>
               <CardBody py="3">
                  <HStack w="full" justify="space-between">
                     <Heading fontSize="18">{val}</Heading>
                     <Box bg="primary.700" p="2" color="white">
                        <Icon size={25} />
                     </Box>
                  </HStack>
               </CardBody>
            </>
         )}
      </Card>
   );
};

export default CardSummary;
