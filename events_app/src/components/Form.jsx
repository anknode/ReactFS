import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { makeStyles } from "@mui/styles";
import {
  createTheme,
  useTheme,
} from '@mui/material/styles';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const response = await fetch("/api/cities");
      const cities = await response.json();
      const cityObjects = cities.map(city => ({ name: city }));
      setCities(cityObjects);
    };
    getCities();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      id: uuidv4(),
      ...values,
    };
    const response = await fetch("/api/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  };

  const theme = useTheme();

  return (
    <Box mt={5}>
      <Typography variant="h4">Contact Form</Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={theme.formControl} required fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}> {/* Fix: Set value to city.name */}
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
