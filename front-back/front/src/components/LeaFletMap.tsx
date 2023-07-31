import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import '../../src/index.css'
import {useState} from "react"
import { useQueryClient } from "react-query";
const LeaFletMap = (props) => {
    console.log(props.events)
    const  [pos, setPos]= useState([0,0])
    
    const zoomLevel = 2;

    function SetViewOnClick( {coords} ) {
        const map = useMap();
        map.setView(pos, zoomLevel);
        return null;
    }

    return (
        <div>
            <MapContainer center={pos} zoom={zoomLevel} scrollWheelZoom={true}>
                <SetViewOnClick coords={pos} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.events.map(event => {
                    console.log(event)
                    if (event.geometry.length == 1){
                        const tmp = event.geometry[0]
                        const coords = [tmp.coordinates[1],tmp.coordinates[0]]
                        return (
                            <Marker position={coords}>
                                <Popup>
                                    <div className="bg-red-200">
                                        {event.title}
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    }else
                    {
                        const popUp = event.geometry.map(geom => {
                            const coords = [geom.coordinates[1], geom.coordinates[0]]
                            console.log(event)
                            return (
                                <Marker position={coords}>
                                    <Popup>
                                        <div className="bg-red-200">
                                            <h3>Evento: {event.title}</h3>
                                            <h5>Fecha: {geom.date}</h5>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        })
                        return popUp;
                    }
                })}
            </MapContainer>
        </div>
    );
};

export default LeaFletMap;