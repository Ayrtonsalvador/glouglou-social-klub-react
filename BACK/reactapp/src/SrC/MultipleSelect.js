import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const couleurs = [
  'Rouge',
  'Blanc',
  'Bulles',
  'Rosé',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ listVin, setlistVin, reload, setreload }) {
  const classes = useStyles();
  const theme = useTheme();
  const [CouleurVin, setCouleurVin] = React.useState([]);

  const handleChange = async (event) => {
    setCouleurVin(event.target.value);
    console.log("EVENT", event.target.value);

    var rawresponse = await fetch(`/filtre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `filtreFF=${event.target.value}`
    });
    var response = await rawresponse.json();
    console.log(response)
    setlistVin(response.filtre)

  }

  return (
    <Grid container
      direction="row"
      justify="flex-start"
      alignItems="flex-end"
      style={{ paddingTop: 70, paddingBottom: 20, paddingLeft: 15 }} >

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Couleur</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={CouleurVin}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {couleurs.map((couleur) => (
            <MenuItem key={couleur} value={couleur} style={getStyles(couleur, CouleurVin, theme)}>
              {couleur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => {setreload(!reload); setCouleurVin([])}} aria-label="Cancel">
          <CancelIcon style={{ color: "#fdd835" }} />
      </IconButton>

    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
