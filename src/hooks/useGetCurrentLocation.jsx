import { useEffect, useState } from "react";


const useGetCurrentLocation = () => {
    const [location, setLocation] = useState("");
    const fetchLocation = () =>{
        navigator.geolocation.getCurrentPosition(async(position) =>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await res.json();
        const place = data?.address?.city || data?.address?.town || data?.address?.state || data?.address?.country || "Unknown";
        setLocation(place);
    }, (error) =>{
        console.log(`Location not found ${error}`);
        setLocation("Unknown");
    })
    }
    useEffect( () =>{
        fetchLocation();
    }, [])
    return {location};
};

export default useGetCurrentLocation;