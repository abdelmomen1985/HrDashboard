import React, { useCallback, SyntheticEvent, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Box,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { LeafletMouseEvent, LocationEvent, LatLng } from "leaflet";
import Axios from "axios";
import LocateSVG from "../../assets/location_searching.svg";
/*
import MarkerIcon from "../../assets/pink_marker.svg";


const markerIcon = new Icon({
  iconUrl: MarkerIcon,
  iconAnchor: [0, 50],
  iconSize: [50, 50],
});

*/

interface NewBranchFormProps {
  handleSave: () => void;
}

export default function NewBranchForm({ handleSave }: NewBranchFormProps) {
  /*
  const handleSubmit = (e: any) => {
    // Todo validation
    e.preventDefault();
    console.log("data submitted");
    handleSave();
  };
  */
  const [position, setPosition] = useState(new LatLng(30.05576, 31.357623));

  const mapRef = React.createRef<Map>();
  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { name } = e.target as any;
      const branchName = name.value;
      console.log(branchName, position);
      // Now Add Branch
      const { status } = await Axios.post(
        "http://13.90.214.197:8000/api/Company/AddBranch",
        {
          company_id: 1,
          ar_name: branchName,
          latitude: position.lat,
          longitude: position.lng,
        }
      );
      if (status === 200) handleSave();
      else alert("error");
    },
    [handleSave, position]
  );

  const handleClick = (e: LeafletMouseEvent) => {
    setPosition(e.latlng);
  };

  const handleLocate = () => {
    const map = mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  const handleLocationFound = (e: LocationEvent) => {
    setPosition(e.latlng);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl required={true}>
          <InputLabel htmlFor="my-input">الاسم</InputLabel>
          <Input
            inputRef={(input) => input && input.focus()}
            id="my-input"
            name="name"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">اسم الفرع</FormHelperText>
        </FormControl>
        <div>
          <Map
            center={position}
            onlocationfound={handleLocationFound}
            onclick={handleClick}
            zoom={14}
            ref={mapRef}
          >
            <TileLayer
              attribution='Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                New Branch Location <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
          <img
            src={LocateSVG}
            alt=""
            style={{ width: "30px" }}
            onClick={handleLocate}
          />

          {/** <span onClick={handleLocate}>جدة</span> */}
        </div>
        <Box m={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            type="submit"
          >
            حفظ
          </Button>
        </Box>
      </form>
    </>
  );
}
