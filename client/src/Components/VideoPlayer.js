import { Layer, Box } from "grommet";
import ResponsivePlayer from "react-player";

const VideoPlayer = ({ url, toggleWatch }) => {
    return (
        <Layer
            full={false}
            position="center"
            onClickOutside={() => toggleWatch(false, null)}
            onEsc={() => toggleWatch(false, null)}
        >   <Box
                pad="small"
                gap="small"
                width="large"
                height="medium"
                fill
            >
                <ResponsivePlayer id="player" url={url} playing={true} controls={true} width='100%' height='100%' />
            </Box>
        </Layer>
    );
}
 
export default VideoPlayer;