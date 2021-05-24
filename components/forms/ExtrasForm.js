import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FieldArray, Formik } from 'formik';
import ChipInput from 'material-ui-chip-input';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addExtrasData } from '../../redux/actions/resumeActions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ExtrasForm = ({ closeDrawer, anchor }) => {
    const classes = useStyles();
    // Dispatch
    const dispatch = useDispatch();

    // Get personalData State from globalState
    let extras = useSelector((state) => state.resume.data.extras);

    // Validation Schema for Extras form
    const ValidationSchema = Yup.object().shape({
        extras: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required('Title of the Extra is must.'),
                    type: Yup.string().oneOf(['NEW_LINE', 'COMMA']),
                })
            )
            .min(1, 'Need at least one Extras'),
    });
 
    /*
    extras: [
                {
                    title: '',
                    type: '',
                    items: [],
                },
            ],
    */

    return (
        <Formik
            initialValues={{
                extras: extras
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
            validateOnChange={false}
            validationSchema={ValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    dispatch(addExtrasData(values.extras));
                    resetForm({
                        title: '',
                        type: '',
                        items: [],
                    });
                    setSubmitting(false);
                    closeDrawer();
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
            }) => (
                <form className='pb-10' onSubmit={handleSubmit}>
                    <FieldArray name='extras'>
                        {({ insert, remove, push }) => (
                            <div>
                                {values.extras.length > 0 &&
                                    values.extras.map((extra, index) => (
                                        <div className='' key={index}>
                                            <div className='flex align-center justify-between'>
                                                <h3 className='text-t1-lg font-medium mt-6'>
                                                    {values.extras[index].title ? values.extras[index].title : `Extras Block ${index+1}` }
                                                </h3>

                                                <Button
                                                    className='mt-6'
                                                    variant='outlined'
                                                    color='primary'
                                                    disabled={isSubmitting}
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    - Remove Extras
													{/* <DeleteIcon fontSize='small' /> */}
                                                </Button>
                                            </div>
                                            <FormControl
                                                variant='outlined'
                                                className={`${classes.formControl} mr-10 mt-10`}
                                                fullWidth
                                            >
                                                <InputLabel id='demo-simple-select-outlined-label'>
                                                    Type of Extra Item
												</InputLabel>
                                                <Select
                                                    labelId='demo-simple-select-outlined-label'
                                                    id='demo-simple-select-outlined'
                                                    value={
                                                        values.extras[index]
                                                            .type
                                                    }
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            `extras[${index}].type`,
                                                            e.target.value
                                                        );
                                                    }}
                                                    label='Type of Extra Item'
                                                >
                                                    <MenuItem value=''>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'NEW_LINE'}
                                                    >
                                                        Every Item in new Line
													</MenuItem>
                                                    <MenuItem value={'COMMA'}>
                                                        Every Item in the same
                                                        line
													</MenuItem>
                                                </Select>
                                                <TextField
                                                    id={`extras.${index}.title`}
                                                    className='mt-6'
                                                    rows={1}
                                                    variant='outlined'
                                                    fullWidth
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label={'Enter Title'}
                                                    value={values.extras[index].title}
                                                    error={
                                                        !!(
                                                            errors.extras &&
                                                            errors.extras[
                                                                index
                                                            ]?.title
                                                        )
                                                    }
                                                    helperText={
                                                        errors.extras &&
                                                        errors.extras[index]
                                                            ?.title
                                                    }
                                                />
                                                {values.extras[index].type === 'NEW_LINE' && (
                                                    <ChipInput
                                                        label='Items'
                                                        fullWidth
                                                        className='mt-6 mr-10'
                                                        placeholder='Enter items and hit ENTER'
                                                        allowDuplicates={false}
                                                        alwaysShowPlaceholder={true}
                                                        value={values.extras[index].items}
                                                        onAdd={(chip) => {
                                                            setFieldValue(`extras[index].items`, values.extras[index].items.push(chip))
                                                        }}
                                                        onDelete={(chip, indexChip) => {
                                                            const items = values.extras[index].items.filter((_,i) => {
                                                                return i !== indexChip
                                                            })
                                                            setFieldValue(`extras[${index}].items`, items)
                                                        }}
                                                    />
                                                )}
                                                {values.extras[index].type === 'COMMA' && (
                                                    <ChipInput
                                                        label='Items'
                                                        InputLabelProps={{shrink: true}}
                                                        fullWidth
                                                        className='mt-4 mr-10'
                                                        placeholder='Enter items and hit ENTER'
                                                        allowDuplicates={false}
                                                        alwaysShowPlaceholder={true}
                                                        value={values.extras[index].items}
                                                        onAdd={(chip) => {
                                                            setFieldValue(`extras[index].items`, values.extras[index].items.push(chip))
                                                        }}
                                                        onDelete={(chip, indexChip) => {
                                                            const items = values.extras[index].items.filter((_,i) => {
                                                                return i !== indexChip
                                                            })
                                                            setFieldValue(`extras[${index}].items`, items)
                                                        }}
                                                    />
                                                )}

                                            </FormControl>
                                            <Divider className='mt-8 -ml-10 -mr-10' />
                                        </div>
                                    ))}
                                <FormHelperText className={'Mui-error'}>
                                    {errors.extras ===
                                        'Need at least one Extras' &&
                                        errors.extras}
                                </FormHelperText>
                                <Button
                                    className='mt-6 mr-10'
                                    variant='outlined'
                                    color='primary'
                                    disabled={isSubmitting}
                                    onClick={() =>
                                        push({
                                            title: '',
                                            type: '',
                                            items: [],
                                        })
                                    }
                                >
                                    + Add More Extras
								</Button>
                            </div>
                        )}
                    </FieldArray>

                    <Button
                        className='mt-6'
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={isSubmitting}
                    >
                        Submit
					</Button>
                </form>
            )}
        </Formik>
    );
};

export default ExtrasForm;
