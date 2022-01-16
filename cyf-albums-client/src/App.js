import { useContext, useEffect, useState } from "react";
import { Anchor, Header, Nav, Main, Box, Card, Grid, ResponsiveContext, Text, Footer } from 'grommet';
import "./style.css"

function App() {
  const [cards, setCards] = useState([]);

  const size = useContext(ResponsiveContext);

  useEffect(() => {
    fetch("http://localhost:4000/albums")
      .then(res => res.json())
      .then(data => setCards(data))
  }, [])

  return (
    <>
      <Header background="light-4" pad="small">
        <Nav direction="row">
          <Anchor label="Home" href="#" />
          <Anchor label="Profile" href="#" />
        </Nav>
      </Header>
      <Main pad="small">
      <Box pad="large">
        <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
          {cards.map((card, index) => {
            return(
              <Card pad="large" key={index}>
                <p>Artist: {card.artistName}</p>
                <p>Album: {card.collectionName}</p>
                <a href={card.url}>YouTube Link</a>
              </Card>
            );
          })}
        </Grid>
      </Box>
      </Main>
      <Footer background="light-4" justify="center" pad="small">
        <Text textAlign="center" size="small">
          © 2021 By Veronika Lopatiuk
        </Text>
      </Footer>
    </>
  );
}

export default App;
