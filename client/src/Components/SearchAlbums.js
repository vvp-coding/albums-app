import {Layer, Box, TextInput} from "grommet";
import { Search } from "grommet-icons";

const SearchAlbums = ({ stopSearching, searchAlbums }) => {
    return (
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
              <TextInput icon={<Search />} reverse placeholder="Search..." onChange={(e) => searchAlbums(e.target.value)} />
            </Box>
          </Layer>
    );
}
 
export default SearchAlbums;