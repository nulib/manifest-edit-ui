import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Section,
  TextField,
} from "@radix-ui/themes";
import React, { FormEventHandler } from "react";

const Login = () => {
  const { dispatch } = useAppContext();

  const handleLogin: FormEventHandler<HTMLFormElement> = () => {
    dispatch({ type: ActionTypes.LOGIN });
  };

  return (
    <Section>
      <Container size="1">
        <Heading align="center">Maktaba Editor</Heading>
        <Box pt="4" asChild>
          <form onSubmit={handleLogin}>
            <Grid columns="1" gap="2">
              <TextField.Input placeholder="Username" />
              <TextField.Input placeholder="Password" type="password" />
              <Button type="submit" style={{ cursor: "pointer" }}>
                Login
              </Button>
            </Grid>
          </form>
        </Box>
      </Container>
    </Section>
  );
};

export default Login;
