import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    VStack,
    useToast
  } from "@chakra-ui/react";
import { useForm } from "react-hook-form"  ;
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";  
import Link from "next/link";
import { Input } from "../components/input";
import { useCallback } from "react";
import { api } from "../services/api";
 type UserProps ={
    name: string;
    phone: string;
    email: string;
 }

  const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    phone: yup.string().required("Telefone obrigatório"),
    email: yup
      .string()
      .required("E-mail obrigatório")
      .email("Digite um e-mail válido"),
    
  });
  
  export default function CreateUser() {
    const toast = useToast();
    const { register, handleSubmit, formState } = useForm<UserProps>({
      resolver: yupResolver(CreateUserFormSchema),
      
    });
  
    const { errors } = formState;
  
    const createUser = useCallback(
        async data => {
          try {
            await api.post('users', data);
            
            toast({
              title: 'Usuário cadastrado.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            toast({
              title: 'Problema ao cadastrar usuário.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        },
        [toast],
      );
    return (
      <Box>
       
        <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6">
          
          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p="8"
            onSubmit={handleSubmit(createUser)}
          >
            <Heading fontSize="lg" fontWeight="normal">
              Criar usuários
            </Heading>
            <Divider my="6" borderColor="gray.700" />
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Input
                  name="name"
                  label="Nome completo"
                  error={errors.name}
                  {...register("name")}
                />
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Input
                  name="phone"
                  label="Telefone"
                  error={errors.phone}
                  {...register("phone")}
                />
                
              </SimpleGrid>
              
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/">
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  colorScheme="pink"
                  
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    );
  }