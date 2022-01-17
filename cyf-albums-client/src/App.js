import { useContext, useEffect, useState } from "react";
import { Anchor, Header, Nav, Main, Box, Card, Grid, ResponsiveContext, Text, Footer, Button } from 'grommet';
import "./style.css"

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
              <Card pad="large" key={card.albumId}>
                <p>Artist: {card.artistName}</p>
                <p>Album: {card.collectionName}</p>
                <a href={card.url}>YouTube Link</a>
                <Box align="center" pad="medium">
                  <Button label="Delete" onClick={() => {
                    fetch("http://localhost:4000/albums/" + card.albumId, {
                      method: "DELETE"
                    })
                    .then(res => {
                      if(res.status <= 299 && res.status >= 200){
                        getAlbums();
                      }
                    })
                      
                  }}/>
                </Box>
                <Box align="center" pad="medium">
                  <Button label="Edit" onClick={() => {}}/>
                </Box>
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
