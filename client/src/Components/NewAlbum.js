import { useState } from "react";
import { Box, Button, Text, Layer, TextInput, DateInput } from "grommet"
import { FormClose } from "grommet-icons";

const NewAlbum = ({onClose, getAlbums}) => {
    const [date, setDate] = useState();
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");

    const onChange = (event) => {
        const nextDate = event.value;
        setDate(nextDate);
    };

    const post = () => {
        fetch("http://localhost:4000/albums", {
            method: "POST",
            body: JSON.stringify({
                artistName: artist,
                collectionName: album,
                releaseDate: date,
                url: url
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => {
            if(res.status <= 299 && res.status >= 200){
                getAlbums();
              }
        })

    }

    return (
        <Layer
            full={false}
            position="center"
            onClickOutside={onClose}
            onEsc={onClose}
        >
        <Box
            pad="medium"
            gap="small"
            width={{ min: 'medium' }}
            height={{ min: 'small' }}
            fill
        >
            <Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
            <Text>Add New Album</Text>
            <Box width="medium">
                <Box>
                    Artist:<TextInput value={artist} onChange={(e) => setArtist(e.target.value)} />
                </Box>
                <Box>
                    Album:<TextInput value={album} onChange={(e) => setAlbum(e.target.value)} />
                </Box>
                <Box>
                    Url:<TextInput value={url} onChange={(e) => setUrl(e.target.value)} />
                </Box>
                <Box>
                    Release Date:<DateInput format="dd/mm/yyyy" value={date} onChange={onChange} />
                </Box>
                <Box align="center" pad="medium">
                <Button label="Save" onClick={() => {
                    post();
                    onClose();
                }}/>
                </Box>
                <Box align="center" pad="medium">
                    <Button label="Cancel" onClick={onClose}/>
                </Box>
            </Box>
        </Box>
        </Layer>
    );
}
 
export default NewAlbum;