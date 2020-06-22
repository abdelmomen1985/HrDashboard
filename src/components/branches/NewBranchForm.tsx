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

import { PostBranch } from '../../queries/Branches';

import { strings } from '../../localization';

interface NewBranchFormProps {
  handleSave: () => void;
}

export default function NewBranchForm({ handleSave }: NewBranchFormProps) {

  const [position, setPosition] = useState(new LatLng(30.05576, 31.357623));
  const mapRef = React.createRef<Map>();

  // HTTP Request
  const [mutate, {status: status, error: error}] = PostBranch();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { name } = e.target as any;
      const branchName = name.value;

      const payload =   {
            company_id: 1,
            ar_name: branchName,
            latitude: position.lat,
            longitude: position.lng,
          };

      await mutate(payload);

      if(status === "error")
      alert(error)
      else handleSave();
     
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
          <InputLabel htmlFor="my-input">{strings.name}</InputLabel>
          <Input
            inputRef={(input) => input && input.focus()}
            id="my-input"
            name="name"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">{strings.branchName}</FormHelperText>
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
        </div>
        <Box m={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            type="submit"
          >
            {strings.save}
          </Button>
        </Box>
      </form>
    </>
  );
}
