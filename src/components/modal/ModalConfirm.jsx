import * as Chakra from "@chakra-ui/react";

const ModalConfirm = ({ isOpen, onClose, title, handleDelete }) => {
   return (
      <Chakra.Modal isOpen={isOpen} onClose={onClose}>
         <Chakra.ModalOverlay />
         <Chakra.ModalContent>
            <Chakra.ModalCloseButton onClick={onClose} />
            <Chakra.ModalHeader>
               <Chakra.Heading fontSize="md">Konfirmasi</Chakra.Heading>
            </Chakra.ModalHeader>
            <Chakra.ModalBody>
               <Chakra.Text>{title}</Chakra.Text>
            </Chakra.ModalBody>
            <Chakra.ModalFooter gap="3">
               <Chakra.Button bg="primary.700" color="white" onClick={onClose}>
                  Batal
               </Chakra.Button>
               <Chakra.Button colorScheme="red" onClick={handleDelete}>
                  Hapus
               </Chakra.Button>
            </Chakra.ModalFooter>
         </Chakra.ModalContent>
      </Chakra.Modal>
   );
};

export default ModalConfirm;
