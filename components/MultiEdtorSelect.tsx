import { Chip, createStyles, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core";
import React from "react";

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

  const editorDefault = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

const MultiEdtorSelect = () => {
    const classes = useStyles();
    const [editors, setEditors] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEditors(event.target.value as string[]);
    };

    const handleChangeMultiple = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setEditors(value);
    };
    return (
            <FormControl  className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={editors}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {(selected as string[]).map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}>
                    {editorDefault.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
    
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
  }),
);

export default MultiEdtorSelect;
