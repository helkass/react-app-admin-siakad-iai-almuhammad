import * as Chakra from "@chakra-ui/react";

/**
 *
 * @param {modal} Modal chakta ui modal props
 * @returns
 */
const ModalDefault = ({ onClose, isOpen, children }) => {
   return (
      <Chakra.Modal isOpen={isOpen} onClose={onClose}>
         <Chakra.ModalOverlay />
         <Chakra.ModalContent>
            <Chakra.ModalCloseButton onClick={onClose} />
            <Chakra.ModalBody>{children}</Chakra.ModalBody>
         </Chakra.ModalContent>
      </Chakra.Modal>
   );
};

export default ModalDefault;
