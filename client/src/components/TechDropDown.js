import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function TechDropDown({ options, label, onChange }) {
  const loading = options.length === 0;

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      onChange={(event, value) => onChange(event, value)} // prints the selected value
      getOptionLabel={(option) => option.name}
      style={{ width: 200 }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
