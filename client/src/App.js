import { useContext, useEffect, useState, useRef } from "react";
import { Header, Nav, Main, Box, Grid, Text, Footer, Button } from 'grommet';
import "./style.css"
import AlbumCard from "./Components/AlbumCard";
import NewAlbum from "./Components/NewAlbum";
import VideoPlayer from "./Components/VideoPlayer";

function App() {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const videoLink = useRef(null);

  const onClose = () => setOpen(undefined);

  const toggleWatch = (isWatching, url) => {
    videoLink.current = url;
    setWatchVideo(isWatching);
  };

  const getAlbums = () => fetch("http://localhost:4000/albums")
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
        <Grid columns="30%" gap="small">
          {cards.map((card) => {
            return (
              <AlbumCard card={card} getAlbums={getAlbums} key={card.albumId} toggleWatch={toggleWatch} />
            );
          })}
        </Grid>
      </Box>
      { open && <NewAlbum onClose={onClose} getAlbums={getAlbums} /> }
      { watchVideo && <VideoPlayer url={videoLink.current} toggleWatch={toggleWatch} /> }
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
