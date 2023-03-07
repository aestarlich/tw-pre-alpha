import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, SearchOutlined } from '@mui/icons-material';
import { Autocomplete, Button, capitalize, Checkbox, FormControlLabel, Grid, IconButton, TextField } from '@mui/material';
import { IBodyGroup, ISearchBody } from '../../../interfaces';
import { useLoadingBodyGroups } from '../../../hooks';
import { GET_BODYGROUP_LIST } from '../../../axiosApi';

interface Props {
  defaultName: string,
  handleNewSearch: (newSearch: boolean, body: ISearchBody) => void;
}

export const SearchForm: FC<Props> = ({ handleNewSearch, defaultName }) => {
  const { items, isLoading } = useLoadingBodyGroups(GET_BODYGROUP_LIST)
  const { register, handleSubmit, control, getValues, setValue } = useForm<ISearchBody>({
    defaultValues: {
      name: '',
      bodyGroups: [],
      noEquipement: false
    }
  });

  useEffect(() => {
    setValue("name", defaultName);
  }, [defaultName, setValue]);
  
  return (
    <form onSubmit={handleSubmit(() => handleNewSearch(true, getValues()))}>

    <Grid container spacing={2} display='flex' justifyContent='space-between' alignItems='center' sx={{ my: 4 }}>
      <Grid item xs={12} md={5}>
        <TextField
          label='What are you searching for?'
          variant="outlined"
          defaultValue={ defaultName }
          {...register('name')}
          sx={{ minWidth: 300, width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} sm={8} md={4}>
        <Controller
          name='bodyGroups'
          control={control}
          defaultValue={[]}
          render={({ field: { ref, onChange, ...field } }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={items}
              getOptionLabel={(option) => capitalize(option.name)}
              onChange={(_, data) => { onChange(data); }}
              defaultValue={[]}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    color='primary'
                    icon={<CheckBoxOutlineBlankOutlined />}
                    checkedIcon={<CheckBoxOutlined />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {capitalize(option.name)}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  inputRef={ref}
                  variant="outlined"
                  label="Body groups?"
                  // sx={{ minWidth: 200 }}
                />
              )}
            />
          )}
        />
      </Grid>

      <Grid item textAlign="end" xs={12} sm={4} md={2}>
        <Controller
          name='noEquipement'
          control={control}
          defaultValue={false}
          render={({ field: { onChange, value, ...field } }) => (
            <FormControlLabel
              label='No equipment'
              control={
                <Checkbox color='primary' onChange={onChange} checked={value} {...field} />
              }
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={1} display='flex' justifySelf='end'>
        <Button fullWidth type="submit" color="primary" variant='outlined' size="large" sx={{ display: { xs: 'block', md: 'none' } }}>
          Search
        </Button>

        <IconButton type="submit" color="primary" size="large" sx={{ display: { xs: 'none', md: 'block' } }}>
          <SearchOutlined />
        </IconButton>
      </Grid>
    </Grid>

  </form>
  );
};
