import { MapContainer, ImageOverlay, useMap, useMapEvents  } from 'react-leaflet';
import L from 'leaflet';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'; 
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

function SetViewOnClick({ coords }: SetViewOnClickProps) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  const maxBounds: L.LatLngBoundsExpression = [[-1000, -500], [1000, 500]];
  map.setMaxBounds(maxBounds);

  return null;
}

interface SetViewOnClickProps {
  coords: [number, number];
}

function CustomZoomControl() {
  const map = useMapEvents({
    zoomend: () => {
      console.log(`Zoom level changed to: ${map.getZoom()}`);
    },
  });

  return (
    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
      <IconButton color="primary" onClick={() => { map.zoomIn(); }}>
        <ZoomInIcon fontSize='large'/>
      </IconButton>
      <IconButton color="primary" onClick={() => { map.zoomOut(); }}>
        <ZoomOutIcon fontSize='large'/>
      </IconButton>
    </Box>
  );
}

function Map() {
  const imageUrl = '/assets/known_world.png';
  const imageBounds: L.LatLngBoundsExpression = [[-400, -400], [400, 400]];// Cover the entire world

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column',  backgroundColor: '#36454F' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Known World
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <MapContainer 
          center={[100, -0.09]} 
          zoom={1} 
          style={{ height: "100%", width: "100%" }} 
          dragging={true} 
          touchZoom={false}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
        >
          <SetViewOnClick coords={[-70, -0.09]} />
          <ImageOverlay
            url={imageUrl}
            bounds={imageBounds}
          />
          <CustomZoomControl />
        </MapContainer>
      </Box>
    </Box>
  );
}

export default Map;
