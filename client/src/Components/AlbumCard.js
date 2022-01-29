import {Card, Button, Box, TextInput, Select} from "grommet"
import { useState, useEffect } from "react";
import { Trash, Edit, CirclePlay } from "grommet-icons";

const ViewCard = ({card, deleteAlbum, setEditMode, toggleWatch}) => {
    return(
        <Card pad="large">
            <Box direction="row" alignContent="end" justify="end" pad="small">
                <Button icon={<CirclePlay />} hoverIndicator onClick={() => toggleWatch(true, card.url)} />
                <Button icon={<Edit />} hoverIndicator onClick={() => setEditMode(true)}/>
                <Button icon={<Trash color="red" />} hoverIndicator onClick={() => deleteAlbum(card.albumId)}/>
            </Box>
            <p>Artist: {card.artistName}</p>
            <p>Album: {card.collectionName}</p>
            <p>Genre: {card.genreName}</p>
        </Card>
    )
}

const EditCard = ({card, setEditMode, saveChanges}) => {
    const [cardData, setCardData] = useState({...card});
    const [options, setOptions] = useState([]);

    const getGenre = () => fetch("http://localhost:4000/genre")
                        .then(res => res.json())
                        .then(data => setOptions(data));

    const updateData = (newData) => {
        setCardData({...cardData, ...newData});
    }

    const addGenreId = (data) => {
        return {...data, ...{genreId: options.find(genre => genre.name === data.genreName).id}}
    }

    useEffect(() => {
        getGenre();
      }, [])

    return (
        <Card pad="large">
            <Box width="medium">
                <TextInput value={cardData.artistName} onChange={(e) => {
                    updateData({artistName: e.target.value});
                }} />
            </Box>
            <Box width="medium">
                <TextInput value={cardData.collectionName} onChange={(e) => {
                    updateData({collectionName: e.target.value});
                }} />
            </Box>
            <Box width="medium">
                <Select
                    value={card.genreName}
                    options={options.map(genre => genre.name)}
                    onChange={(e) => {
                        updateData({ genreName: e.target.value });
                    }}
                />
            </Box>
            <Box align="center" pad="medium">
                <Button label="Save" onClick={() => {
                    saveChanges(addGenreId({...card, ...cardData}));

                }}/>
            </Box>
            <Box align="center" pad="medium">
                <Button label="Cancel" onClick={() => {
                    setEditMode(false);
                }}/>
            </Box>
        </Card>
    )
}

const AlbumCard = ({ card, getAlbums, toggleWatch}) => {
    const [editMode, setEditMode] = useState(false);

    const deleteAlbum = (albumId) => {
        fetch("http://localhost:4000/albums/" + albumId, {
          method: "DELETE"
        })
        .then(res => {
          if(res.status <= 299 && res.status >= 200){
            getAlbums();
          }
        })      
    };

    const saveChanges = (cardData) => {
        fetch("http://localhost:4000/albums/" + cardData.albumId, {
          method: "PUT",
          body: JSON.stringify(cardData),
          headers: {
              "Content-type": "application/json"
          }
        })
        .then(res => {
            if(res.status <= 299 && res.status >= 200) {
                setEditMode(false);
                getAlbums();
            }
        })  
    };

    return (
        <>
            { !editMode ? 
                <ViewCard card={card} setEditMode={setEditMode} deleteAlbum={deleteAlbum} toggleWatch={toggleWatch} /> : 
                <EditCard card={card} setEditMode={setEditMode} saveChanges={saveChanges} /> }
        </>
    );
}
 
export default AlbumCard;