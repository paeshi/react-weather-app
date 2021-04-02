import { useRef } from 'react';
import styles from './Map.module.css';
import mapStyle from './map-style';

function Map(props) {

  const mapDiv = useRef();

  if (props.lat && props.lng) {
    const location = {
      lat: props.lat,
      lng: props.lng
    };
    const map = new window.google.maps.Map(
      mapDiv.current, {
        zoom: props.zoom || 12,
        center: location,
        disableDefaultUI: true,
        styles: mapStyle
      }
    );
    new window.google.maps.Marker({
      position: location,
      map: map
    });
  }

  return (
    <div ref={mapDiv} className={styles.Map}></div>
  );
}

export default Map;