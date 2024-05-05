import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function UserMap({ users }) {

  const usersArray = Array.isArray(users) ? users : [users];
  const hasUsers = usersArray.length > 0;

  const defaultPosition = [-22.7489, -41.8810]; // Coordenadas de Búzios, Rio de Janeiro
  const initialPosition = hasUsers ? [usersArray[0].location.coords.latitude, usersArray[0].location.coords.longitude] : defaultPosition;

  return (
    // @ts-ignore
    <MapContainer center={initialPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasUsers && usersArray.map(user => (
        <Marker
          key={user.id}
          position={[user.location.coords.latitude, user.location.coords.longitude]}
        >
          <Popup>
            {user.name} <br /> {user.location.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
