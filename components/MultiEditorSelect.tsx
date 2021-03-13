import {
    Chip,
    createStyles,
    FormControl,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme,
} from "@material-ui/core";
import React from "react";
import { UserModel } from "../lib/models";

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

const MultiEditorSelect = ({
    selectPool,
    selected,
    setSelected,
    onChange,
}: {
    selectPool: UserModel[];
    selected:  UserModel[];
    setSelected: React.Dispatch<React.SetStateAction<UserModel[]>>;
    onChange?: () => void;
}) => {
    const classes = useStyles();

    const handleChange = (event:any) => {
        setSelected(event.target.value as UserModel[]);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="select-mutiple-chip-label">Editors</InputLabel>
            <Select
                labelId="select-mutiple-chip-label"
                id="select-mutiple-chip"
                multiple
                value={selected}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as UserModel[]).map((user) => (
                            <Chip
                                color="primary"
                                key={user.uid}
                                label={user.name}
                                style={{ fontWeight: "bold" }}
                            />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}>
                {selectPool.map((user) => (
                    // @ts-ignore
                    <MenuItem key={user.uid} value={user}>
                        {user.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {},
        chips: {
            display: "flex",
            flexWrap: "wrap",
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    })
);

export default MultiEditorSelect;
