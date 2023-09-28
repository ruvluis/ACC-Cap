import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  SimpleGrid,
  Spinner,
  Center,
  GridItem,
  Image,
  Heading,
  Tag,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Text, 
} from "@chakra-ui/react";
import Header from "./Header";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LoginSignup from "./LoginSignup"; 

const StoreItem = ({ title, price, image, id, addToCart }) => {
  return (
    <Box p={4} borderRadius="lg" borderWidth="1px">
      <Center>
        <Image src={image} boxSize="24" />
      </Center>
      <Heading mt={4} noOfLines={2} size="sm" fontWeight="normal">
        {title}
      </Heading>
      <Tag mt={4}>${price}</Tag>
      <Button
        mt={4}
        leftIcon={<AiOutlineShoppingCart />}
        colorScheme="purple"
        onClick={() => addToCart({ id, title, price, image })}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

function Store() {
  const [storeItem, setStoreItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false); 

  
  const [checkoutLoginData, setCheckoutLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(({ data }) => {
      setLoading(false);
      setStoreItem(data);
      setFilteredItems(data);
    });
  }, []);

  const addToCart = (item) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    };
    setCartItems([...cartItems, cartItem]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    setIsModalOpen(false);
    setIsPurchaseComplete(true); 
  };

  const handleCheckoutLoginSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2); 
  };

  return (
    <Box>
      <Header title="Com-Store" />
      <Box p={2}>
        {}
        <LoginSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {}
        {isLoggedIn && (
          <Box
            position="fixed"
            top="2rem"
            right="4rem"
            bg="purple.500"
            color="white"
            p={2}
            borderRadius="md"
          >
            Welcome Back
          </Box>
        )}

        {isPurchaseComplete && (
          <Box p={4} textAlign="center" position="fixed" top="2rem" right="4.6rem" bg="purple.500" color="white" borderRadius="md">
            <Heading size="lg" >Thank you for your purchase!</Heading>
            <Text mt={4} position='left' left="8rem">We'll be back soon.</Text>
          </Box>
        )}

        <Input
          onChange={(e) => {
            let f = storeItem.filter((item) =>
              item.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setFilteredItems(f);
          }}
          placeholder="Search"
          mt={4}
        />

        <IconButton
          icon={<AiOutlineShoppingCart />}
          colorScheme="purple"
          aria-label="Open Cart"
          onClick={() => setIsCartOpen(true)}
          position="fixed"
          right="2rem"
          top="2rem"
        />

        <SimpleGrid columns={4} spacing={4} mt={4}>
          {filteredItems.map((item) => {
            return (
              <GridItem key={item.id}>
                <StoreItem {...item} addToCart={addToCart} />
              </GridItem>
            );
          })}
        </SimpleGrid>
      </Box>

      <Drawer
        placement="right"
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          {item.title} - ${item.price}
                        </div>
                        <div>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => removeFromCart(item)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div>
                  <strong>Total: ${calculateTotalPrice()}</strong>
                </div>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            {isPurchaseComplete ? (
              <Button colorScheme="purple" onClick={() => setIsPurchaseComplete(false)} marginBottom="8px">
                Continue Shopping
              </Button>
            ) : (
              <Button
                colorScheme="purple"
                onClick={handleCheckout}
                marginBottom="8px"
              >
                Checkout
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login to Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCheckoutLoginSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <ChakraInput
                  type="email"
                  value={checkoutLoginData.loginEmail}
                  onChange={(e) =>
                    setCheckoutLoginData({ ...checkoutLoginData, loginEmail: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <ChakraInput
                  type="password"
                  value={checkoutLoginData.loginPassword}
                  onChange={(e) =>
                    setCheckoutLoginData({ ...checkoutLoginData, loginPassword: e.target.value })
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
    </Box>
  );
}

export default Store;





