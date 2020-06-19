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
import LocateSVG from "../../assets/location_searching.svg";

import { EditBranch } from '../../queries/Branches';

interface EditBranchFormProps {
  handleSave: () => void,
  branch: {
    id: string,
    ar_name: string,
    latitude: number,
    longitude: number
  }
}

export default function EditBranchForm({ handleSave, branch }: EditBranchFormProps) {

  const currentPosition = branch.latitude ? new LatLng(branch.latitude, branch.longitude) : new LatLng(30.05576, 31.357623)

  const [position, setPosition] = useState(currentPosition);
  const mapRef = React.createRef<Map>();

  // HTTP Request
  const [mutate, {status: status, error: error}] = EditBranch();

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

      const variables = {
        payload: payload,
        id: branch.id
      }

      await mutate(variables);

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
          <InputLabel htmlFor="my-input">الاسم</InputLabel>
          <Input
            inputRef={(input) => input && input.focus()}
            defaultValue={branch.ar_name}
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