import { Heading } from "@chakra-ui/react";

const ContentLayout = ({ title, children }) => {
   return (
      <>
         <Heading
            textTransform="capitalize"
            ml="16"
            fontSize={{ base: 22, md: "26" }}
            mb="6">
            {title}
         </Heading>
         {children}
      </>
   );
};

export default ContentLayout;
