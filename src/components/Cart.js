import React from "react";
import { Box, Text, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Stack, Image } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Cart({ items, onClose, isOpen }) {

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm"> {/* Adjust the size as needed */}
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Shopping Cart</DrawerHeader>
        <DrawerBody>
          {items.length === 0 ? (
            <Text>No items in cart</Text>
          ) : (
            <Stack spacing={4}>
              {items.map((item) => (
                <Box key={item.id} borderWidth="1px" p={2} display="flex" alignItems="center">
                  <Image src={item.image} boxSize="24px" mr={2} />
                  <div>
                    {item.title} - ${item.price}
                  </div>
                </Box>
              ))}
            </Stack>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Continue Shopping
          </Button>
          <Button colorScheme="purple">Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;


