import { useEffect, useState, useRef } from "react";
import { Header, Nav, Main, Box, Grid, Text, Footer, Button} from 'grommet';
import "./style.css"
import AlbumCard from "./Components/AlbumCard";
import NewAlbum from "./Components/NewAlbum";
import VideoPlayer from "./Components/VideoPlayer";
import SearchAlbums from "./Components/SearchAlbums";

function App() {
  const [cards, setCards] = useState([]);
  const [openAlbum, setOpenAlbum] = useState(false);
  const [searching, setSearching] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const videoLink = useRef(null);

  const onClose = () => setOpenAlbum(false);

  const stopSearching = () => setSearching(false);

  const toggleWatch = (isWatching, url) => {
    videoLink.current = url;
    setWatchVideo(isWatching);
  };

  const getAlbums = () => fetch("/api/albums")
                    .then(res => res.json())
                    .then(data => setCards(data))

  const searchAlbums = (text) => fetch("/api/search?search=" + text)
                                  .then(res => res.json())
                                  .then(data => setCards(data))

  useEffect(() => {
    getAlbums();
  }, [])

  return (
    <>
      <Header background="light-4" pad="small">
        <Nav direction="row">
          <Box>
            <Button label="Add Album" onClick={() => setOpenAlbum(true)} />
          </Box>
          <Box>
            <Button label="Search" onClick={() => {
              setSearching(true)
  
            }} />
          </Box>
        </Nav>
      </Header>
      <Main pad="small">
      <Box pad="large">
        <Grid columns="30%" gap="medium">
          {cards.map((card) => {
            return (
              <AlbumCard card={card} getAlbums={getAlbums} key={card.albumId} toggleWatch={toggleWatch} />
            );
          })}
        </Grid>
      </Box>
      { openAlbum && <NewAlbum onClose={onClose} getAlbums={getAlbums} /> }
      { watchVideo && <VideoPlayer url={videoLink.current} toggleWatch={toggleWatch} /> }
      {searching && <SearchAlbums stopSearching={stopSearching} searchAlbums={searchAlbums} />}
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
