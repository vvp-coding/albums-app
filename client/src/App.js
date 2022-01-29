import { useEffect, useState, useRef } from "react";
import { Header, Nav, Main, Box, Grid, Text, Footer, Button, TextInput, Layer } from 'grommet';
import { Search } from "grommet-icons"
import "./style.css"
import AlbumCard from "./Components/AlbumCard";
import NewAlbum from "./Components/NewAlbum";
import VideoPlayer from "./Components/VideoPlayer";

function App() {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [watchVideo, setWatchVideo] = useState(false);
  const videoLink = useRef(null);

  const onClose = () => setOpen(undefined);

  const stopSearching = () => setSearching(undefined);

  const toggleWatch = (isWatching, url) => {
    videoLink.current = url;
    setWatchVideo(isWatching);
  };

  const getAlbums = () => fetch("http://localhost:4000/albums")
                    .then(res => res.json())
                    .then(data => setCards(data))

  const search = (searchData) => fetch("http://localhost:4000/search?search=" + searchData)
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
            <Button label="Add Album" onClick={() => setOpen(true)} />
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
      { open && <NewAlbum onClose={onClose} getAlbums={getAlbums} /> }
      { watchVideo && <VideoPlayer url={videoLink.current} toggleWatch={toggleWatch} /> }
      {searching && 
          <Layer
            full={false}
            position="top"
            onClickOutside={stopSearching}
            onEsc={stopSearching}
          >
            <Box
              pad="medium"
              gap="small"
              width={{ min: 'medium' }}
              height={{ min: 'small' }}
              fill
            >
              <TextInput icon={<Search />} reverse placeholder="Search..." onChange={(e) => search(e.target.value)} />
            </Box>
          </Layer>}
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
