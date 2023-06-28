import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { packsActions } from "../../../features/packs/packs-reducer";
import { useAppDispatch } from "../../../app/hooks/useAppDispatch";

type BaseSelectType = {
  pageCount?: number;
  page?: number;
  onChangeSelect: (event: number) => void;
};

const BaseSelect = ({ pageCount, onChangeSelect, page }: BaseSelectType) => {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    onChangeSelect(+event.target.value);
    dispatch(packsActions.setSearchParams({ pageCount: +event.target.value, page }));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        // label={"Page count"}
        value={pageCount?.toString()}
        onChange={handleChange}
      >
        {/*<MenuItem value="">*/}
        {/*  <em>None</em>*/}
        {/*</MenuItem>*/}
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={12}>12</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BaseSelect;
