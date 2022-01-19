import {Card, Button, Box, TextInput} from "grommet"
import { useState } from "react";

const ViewCard = ({card, deleteAlbum, setEditMode}) => {
    return(
        <Card pad="large" key={card.albumId}>
            <p>Artist: {card.artistName}</p>
            <p>Album: {card.collectionName}</p>
            <a href={card.url}>YouTube Link</a>
            <Box align="center" pad="medium">
                <Button label="Delete" onClick={() => deleteAlbum(card.albumId)}/>
            </Box>
            <Box align="center" pad="medium">
                <Button label="Edit" onClick={() => setEditMode(true)}/>
            </Box>
        </Card>
    )
}

const EditCard = ({card, setEditMode, saveChanges}) => {
    const [cardData, setCardData] = useState(card);

    const updateData = (newData) => {
        const copy = Object.assign({}, cardData);
        Object.assign(copy, newData);
        setCardData(copy);
    }

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
            <Box align="center" pad="medium">
                <Button label="Save" onClick={() => {
                    saveChanges(cardData);
                    }}/>
            </Box>
            <Box align="center" pad="medium">
                <Button label="Cancel" onClick={() => setEditMode(false)}/>
            </Box>
        </Card>
    )
}

const AlbumCard = ({ card, getAlbums }) => {
    const [editMode, setEditMode] = useState(false);
    // const [cardData, setCardData] = useState(null);

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
          body: JSON.stringify(cardData)
        })
        .then(res => {
          if(res.status <= 299 && res.status >= 200){
            getAlbums();
          }
        })  
    };

    return (
        <>
                { !editMode ? 
                    <ViewCard card={card} setEditMode={setEditMode} deleteAlbum={deleteAlbum} /> : 
                    <EditCard card={card} setEditMode={setEditMode} saveChanges={saveChanges} /> }
        </>
    );
}
 
export default AlbumCard;