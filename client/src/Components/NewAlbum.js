import { useState, useEffect } from "react";
import { Box, Button, CardHeader, Layer, Card, Select, Text, TextInput, DateInput } from "grommet"
import { FormClose } from "grommet-icons";

const NewAlbum = ({onClose, getAlbums}) => {
    const [date, setDate] = useState();
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [options, setOptions] = useState([]);

    const getGenre = () => fetch("http://localhost:4000/genre")
                        .then(res => res.json())
                        .then(data => setOptions(data));

    useEffect(() => {
        getGenre();
        }, [])


    const post = () => {
        fetch("http://localhost:4000/albums", {
            method: "POST",
            body: JSON.stringify({
                artistName: artist,
                collectionName: album,
                releaseDate: date,
                url: url,
                genreId: options.find( ({ name }) => name === genre ).id
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
        <Card
            pad="medium"
            gap="small"
            width={{ min: 'large' }}
            height={{ min: 'small' }}
            fill
        >
            <Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
            <CardHeader alignSelf="center">Add New Album</CardHeader>
            <Box width="large">
                <Box>
                    Artist:<TextInput value={artist} onChange={(e) => setArtist(e.target.value)} />
                </Box>
                <Box>
                    Album:<TextInput value={album} onChange={(e) => setAlbum(e.target.value)} />
                </Box>
                <Box>
                    <Text>Genre:</Text>
                    <Select
                        placeholder="Clear Selection"
                        value={genre}
                        options={options.map(genre => genre.name)}
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}
                    />
                </Box>
                <Box>
                    Url:<TextInput value={url} onChange={(e) => setUrl(e.target.value)} />
                </Box>
                <Box>
                    Release Date:<DateInput format="dd/mm/yyyy" value={date} onChange={(e) => setDate(e.value)} />
                </Box>
                <Box alignSelf="center" pad="medium" direction="row">
                    <Button label="Save" margin={{right: "10px"}} onClick={() => {
                        post();
                        onClose();
                    }}/>
                    <Button label="Cancel" margin={{left: "10px"}} onClick={onClose}/>
                </Box>
            </Box>
        </Card>
        </Layer>
    );
}
 
export default NewAlbum;