import {
  Dialog,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  Button,
  withTheme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import statesCitiesData from './../../utils/state-city-map';
import resourceData from './../../utils/resources';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headingRoot: {
    background: theme.palette.primary.main,
    width: "100vw",
    padding: theme.spacing(4.75, 5.5, 10.25),
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "418px",
    width: "100%",
    marginTop: theme.spacing(7),

    "& > *": {
      marginBottom: theme.spacing(2),
    },
    alignItems: "center",
  },
}));


const CREATE_TICKET = gql`
  mutation(
    $state: String
    $city: String
    $address: String
    $supplierDonorName: String
    $supplierDonorContactNumber: String
    $resourceType: String
    $subResourceType: String
    $costPerUnit: String
    $availableUnits: String
    $otherInfo: String
  ) {
    createTicket(
      input: {
        state: $state
        city: $city
        address: $address
        supplierDonorName: $supplierDonorName
        supplierDonorContactNumber: $supplierDonorContactNumber
        resourceType: $resourceType
        subResourceType: $subResourceType
        costPerUnit: $costPerUnit
        availableUnits: $availableUnits
        otherInfo: $otherInfo
      }
    ) {
      status
    }
  }
`;

const AddResources = (props) => {
  const classes = useStyles();

  const { theme } = props;

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [resource_type, setResourceType] = useState("");
  const [resource_subtype, setResourceSubtype] = useState("");
  const [availability, setAvailability] = useState(null);
  const [cost_per_unit, setCostPerUnit] = useState(null);
  const [contact_name, setContactName] = useState(null);
  const [contact_number, setContactNumber] = useState(null);
  const [lead_source, setLeadSource] = useState(null);

  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [resourceError, setResourceError] = useState(false);
  const [subResourceError, setSubResourceError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [createTicket] = useMutation(CREATE_TICKET, {
    variables: {
      state,
      city,
      address: location,
      supplierDonorName: contact_name,
      supplierDonorContactNumber: contact_number,
      resourceType: resource_type,
      subResourceType: resource_subtype,
      costPerUnit: cost_per_unit,
      availableUnits: availability,
      otherInfo: lead_source,
    },
    update(proxy, result) {
      console.log(result);
      if (
        result &&
        result.data &&
        result.data.createTicket &&
        result.data.createTicket.status === "200"
      ) {
        //
        setDialogMessage("Resource Uploaded Successfully");
        setDialogOpen(true);
      } else {
        setDialogMessage("Error uploading resource, Please try again later.");
        setDialogOpen(true);
      }
    },
    onError(err) {
      setDialogMessage("Error uploading resource, Please try again later.");
      setDialogOpen(true);
    },
  });

  const checkDataAndSubmit = () => {
    let error = false;

    if (!city) {
      setCityError(true);
      error = true;
    }
    if (!state) {
      setStateError(true);
      error = true;
    }
    if (!resource_type) {
      setResourceError(true);
      error = true;
    }
    if (!resource_subtype) {
      setSubResourceError(true);
      error = true;
    }
    if (!contact_name) {
      setNameError(true);
      error = true;
    }
    if (!contact_number) {
      setNumberError(true);
      error = true;
    }

    if (!error) createTicket();
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.headingRoot}>
          <Typography variant="h5">Add Verified Information</Typography>
          <Typography
            variant="body1"
            style={{
              marginTop: theme.spacing(3),
              opacity: 0.6,
              maxWidth: theme.spacing(67.75),
            }}
          >
            Every information / lead suggested by you could end up saving someon’e life. We sincerely thank you from the bottom of our hearts. Please fill the form below to add information.
            <br /><br /> 
            Our team of volunteers will verify the details before making it accessible to others.
          </Typography>
        </div>
        <div className={classes.formRoot}>
          <Autocomplete
            options={statesCitiesData.map(object => object.state)}
            getOptionLabel={(option) => option}
            style={{ width: "100%" }}
            onChange={(event, state) =>
              setState(state) ||
              setCity("") ||
              setStateError(false) ||
              setCityError(false)
            }
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                {...params}
                error={stateError}
                label="State"
                variant="outlined"
                required
              />
            )}
          />

          <Autocomplete
            options={ statesCitiesData.find(object => object.state === state) ? statesCitiesData.find(object => object.state === state).cities : []}
            disabled={statesCitiesData.find(object => object.state === state) ? false : true}
            getOptionLabel={(option) => option}
            style={{ width: "100%" }}
            onChange={(event, city) => setCity(city) || setCityError(false)}
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                {...params}
                error={cityError}
                label="City"
                variant="outlined"
                required
              />
            )}
          />

          <TextField
            style={{ width: "100%" }}
            variant="outlined"
            rows={5}
            label="Address"
            multiline
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <TextField
            select
            error={resourceError}
            style={{ width: "100%" }}
            variant="outlined"
            value={resource_type}
            label="Resource Type"
            onChange={(event) =>
              setResourceType(event.target.value) ||
              setResourceError(false) ||
              setResourceSubtype("") ||
              setSubResourceError(false)
            }
          >
            {resourceData.map(object => (
                <MenuItem value={object.resource} key={object.resource}>
                    {object.resource}
                </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            error={subResourceError}
            variant="outlined"
            style={{ width: "100%" }}
            value={resource_subtype}
            disabled={resource_type.length ? false : true}
            label="Resource Subtype"
            onChange={(event) =>
              setResourceSubtype(event.target.value) ||
              setSubResourceError(false)
            }
          >
            {resource_type.length ? resourceData.find(object => object.resource === resource_type).subtypes.map(type => (
                <MenuItem value={type} key={type}>
                    {type}
                </MenuItem>
            )) : []}
          </TextField>

          <TextField
            select
            variant="outlined"
            style={{ width: "100%" }}
            value={availability}
            label="Availability"
            disabled={
              resource_type === "Blood" || resource_type === "Food / Tiffin"
            }
            onChange={(event) => setAvailability(event.target.value)}
          >
            <MenuItem value={"Availabel"} key={"Available"}>
              {"Available"}
            </MenuItem>

            <MenuItem value={"Unavailable"} key={"Unavailable"}>
              {"Unavailable"}
            </MenuItem>
          </TextField>

          <TextField
            style={{ width: "100%" }}
            variant="outlined"
            label="Cost per Unit (in ₹)"
            type="number"
            value={cost_per_unit}
            onChange={(e) => setCostPerUnit(e.target.value)}
          />
          <TextField
            style={{ width: "100%" }}
            error={nameError}
            variant="outlined"
            required
            label="Contact Name"
            value={contact_name}
            onChange={(e) =>
              setContactName(e.target.value) || setNameError(false)
            }
          />
          <TextField
            style={{ width: "100%" }}
            error={numberError}
            variant="outlined"
            required
            label="Phone Number"
            type="phone"
            value={contact_number}
            onChange={(e) =>
              setContactNumber(e.target.value) || setNumberError(false)
            }
          />
          <TextField
            style={{ width: "100%" }}
            variant="outlined"
            label="Information Source"
            value={lead_source}
            onChange={(e) => setLeadSource(e.target.value)}
          />

          <Button
            name="Add resource"
            onClick={() => checkDataAndSubmit()}
            style={{
              marginTop: theme.spacing(2),
              width: theme.spacing(20),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        style={{ padding: "56px", alignItems: "center" }}
      >
        <Typography variant="h4">{dialogMessage}</Typography>
      </Dialog>
    </>
  );
};

export default withTheme(AddResources);
