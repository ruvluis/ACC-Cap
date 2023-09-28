import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function LoginSignup({ isOpen, onClose }) {
  // State for login form
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  // Function to handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Here, you can add your login logic
    // For now, let's just close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Log In Form */}
          <form onSubmit={handleLoginSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={loginData.loginEmail}
                onChange={(e) =>
                  setLoginData({ ...loginData, loginEmail: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={loginData.loginPassword}
                onChange={(e) =>
                  setLoginData({ ...loginData, loginPassword: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
              Log In
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoginSignup;












