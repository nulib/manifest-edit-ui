import { Container, Section } from "@radix-ui/themes";

import Login from "../components/Login";
import React from "react";
import Select from "../components/UI/Select";
import Table from "../components/UI/Table/Table";
import TableRow from "../components/UI/Table/Row";
import { data } from "../data";

const Editor = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleSubmit = () => setLoggedIn(true);

  return (
    <>
      {!loggedIn ? (
        <Login handleSubmit={handleSubmit} />
      ) : (
        <Section size="2">
          <Container>
            <Table>
              {data.map((item) => (
                <TableRow {...item} />
              ))}
            </Table>
          </Container>
        </Section>
      )}
    </>
  );
};

export default Editor;
