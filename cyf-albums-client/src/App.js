import { useContext, useEffect, useState } from "react";
import { Header, Nav, Main, Box, Grid, ResponsiveContext, Text, Footer, Button } from 'grommet';
import "./style.css"
import AlbumCard from "./Components/AlbumCard";
import NewAlbum from "./Components/NewAlbum";

function App() {
  const [cards, setCards] = useState([]);
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(undefined);

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
          <Button label="Add Album" onClick={() => setOpen(true)} />
        </Nav>
      </Header>
      <Main pad="small">
      <Box pad="large">
        <Grid columns={size !== 'small' ? 'small' : '100%'} gap="small">
          {cards.map((card) => {
            return (
              <AlbumCard card={card} getAlbums={getAlbums} key={card.albumId} />
            );
          })}
        </Grid>
      </Box>
      { open && <NewAlbum onClose={onClose} getAlbums={getAlbums} /> }
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
