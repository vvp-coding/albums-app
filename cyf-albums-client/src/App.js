import { useContext, useEffect, useState } from "react";
import { Anchor, Header, Nav, Main, Box, Grid, ResponsiveContext, Text, Footer } from 'grommet';
import "./style.css"
import AlbumCard from "./Components/AlbumCard";

function App() {
  const [cards, setCards] = useState([]);
  const size = useContext(ResponsiveContext);

  const getAlbums=() => fetch("http://localhost:4000/albums")
                    .then(res => res.json())
                    .then(data => setCards(data))

  useEffect(() => {
    getAlbums();
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
          {cards.map((card) => {
            return(
              <AlbumCard card={card} getAlbums={getAlbums} key={card.albumId} />
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
