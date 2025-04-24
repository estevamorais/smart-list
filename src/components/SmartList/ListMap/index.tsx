import React from 'react';
import { Grid } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface ListMapProps {
  data: Record<string, any>[]; 
  properties: { name: string; type: string }[];
}

const ListMap: React.FC<ListMapProps> = ({ data, properties }) => {
  // Filtra as propriedades de tipo lat e long
  const latProp = properties.find((prop) => prop.type === 'lat');
  const longProp = properties.find((prop) => prop.type === 'long');

  if (!latProp || !longProp) {
    return <div>Não há coordenadas de latitude e longitude disponíveis.</div>;
  }

  const markers = data.filter((item) => {
    const lat = item[latProp.name];
    const long = item[longProp.name];
    return lat !== undefined && long !== undefined;
  });

  const centerLat = markers.length > 0 ? markers[0][latProp.name] : 0;
  const centerLong = markers.length > 0 ? markers[0][longProp.name] : 0;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12}}>
        <MapContainer
          center={[centerLat, centerLong]}
          zoom={6} 
          style={{ width: '100%', height: '400px' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((item, index) => {
            const lat = item[latProp.name];
            const long = item[longProp.name];
            return (
              <Marker
                key={index}
                position={[lat, long]}
              >
                <Popup>
                  <strong>{item.nome}</strong>
                  <br />
                  {item.localizacao}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Grid>
    </Grid>
  );
};

export default ListMap;
