import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";




export default function Home() {
  const toast = useToast();
  const [data, setData] = useState([]);
  const userList = useCallback(async () => {
    try {
      const response = await api.get('users');
      setData(response.data);
    } catch (error) {
      toast({
        title: 'Problema ao carregar os usuarios.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => { 
    userList();
  }, []);

  
  return (
    
    
        <Box>
          
          <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6">
            
            <Box flex="1" borderRadius={8} bg="gray.800" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading fontSize="lg" fontWeight="normal">
                  Usuários
                </Heading>
                <Link href="/create" passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="pink"
                    
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>
    
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    
                    <Th>Usuário</Th>
                    <Th>E-mail</Th>
                    <Th>Telefone</Th>
                    
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user) =>(
                  <Tr key={user.name}>
                   
                  <Td>
                    <Text fontWeight="bold">{user.name}</Text>
                    
                  </Td>
                  <Td>
                    <Text>
                      {user.email}
                    </Text>
                  </Td>
                  <Td>
                    <Text>
                      {user.phone}
                    </Text>
                  </Td>
                </Tr>
                ))}
                
                </Tbody>
              </Table>
            
            </Box>
          </Flex>
        </Box>
      );
    
  
}
