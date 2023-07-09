import { MapContainer, ImageOverlay, useMap, useMapEvents, Polygon  } from 'react-leaflet';
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
  <IconButton sx={{ color: "#000000" }} onClick={() => { map.zoomIn(); }}>
    <ZoomInIcon fontSize='large'/>
  </IconButton>
  <IconButton sx={{ color: "#000000" }} onClick={() => { map.zoomOut(); }}>
    <ZoomOutIcon fontSize='large'/>
  </IconButton>
</Box>
  );
}

function Map() {
  const imageUrl = '/assets/known_world.png';
  const imageBounds: L.LatLngBoundsExpression = [[400, -400], [-400, 400]];// Cover the entire world
  const center: [number, number] = [
    (imageBounds[0][0] + imageBounds[1][0]) / 2, // average of latitudes
    (imageBounds[0][1] + imageBounds[1][1]) / 2, // average of longitudes
  ];

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column',  backgroundColor: '#36454F' }}>
      <AppBar position="static" sx={{ backgroundColor: "#000000"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Known World
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <MapContainer 
          center={center} 
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
