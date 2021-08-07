import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';

import { TextField } from '@material-ui/core';
import '../css/AddProductModal.scss'
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import ApiCalls from '../axios/ApiCalls';
import { productBaseUrl } from '../globalConstant/globalConstant';
import CancelIcon from '@material-ui/icons/Cancel';
import _, { update } from 'lodash';
const useStyles = makeStyles({

});

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    showAddNew: any;
    closeModal: any;
    updateData:any
}

function SimpleDialog(props: SimpleDialogProps) {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const [title, setTitle] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [price, setPrice] = React.useState('');

    const [titleErr, setTitleErr] = React.useState(false);
    const [categoryErr, setCategoryErr] = React.useState(false);
    const [descriptionErr, setDescriptionErr] = React.useState(false);
    const [imageErr, setImageErr] = React.useState(false);
    const [priceErr, setPriceErr] = React.useState(false);
    const [disabledBtn,setDisabledBtn] = React.useState(false);

    const { onClose, open, showAddNew, closeModal,updateData } = props;

    const handleClose = () => {

    };

    useEffect(()=>{
        console.log(' ia moda;',updateData);
        if(_.isEmpty(updateData) == false){
            console.log('i am not empty')
            console.log(updateData.title)
            setTitle(updateData.title);
            setCategory(updateData.category);
            setPrice(updateData.price);
            setDescription(updateData.description);
            setImage(updateData.image);
        }
    },[])
    useEffect(()=>{
        console.log('referst')
    },[image])
    // This function is used to call the save product api for saving the product
    const saveProduct = async () => {
        if (!titleErr && !descriptionErr && !priceErr && !imageErr && !categoryErr) {
            setDisabledBtn(true)
            let parmas = JSON.stringify(
                {
                    title: title,
                    price: Number(price),
                    description: description,
                    image: image,
                    category: category
                }
            )
            let responseData: any = await ApiCalls(productBaseUrl + 'products', 'post', parmas);
            console.log(responseData);
            setDisabledBtn(false)
            if (responseData.status == 200) {
                setTitle('');
                setCategory('');
                setDescription('')
                setImage('');
                setPrice('')
                toast.success('Product Added SuccessFully');
                let data 
                if(_.isEmpty(updateData) == false){
                    data = {
                        title: title,
                        price: Number(price),
                        description: description,
                        image: image,
                        category: category,
                        id: updateData.id != undefined ? updateData.id : ''
                    
                    }
                }else{
                    data = {
                        title: title,
                        price: Number(price),
                        description: description,
                        image: image,
                        category: category,
                        id: 'd'
                    
                    }
                }
               
                showAddNew(data)
            }
        }

    }


    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            style={{ width: '100%' }} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Add New Product</DialogTitle>
            <div className="addProductMainContainer">
                <div className="addProductForm">
                    <div className="addProductInputs">
                        <TextField
                            error={titleErr}
                            id="standard-error-helper-text"
                            label="Title"
                            value={title}
                            defaultValue=""
                            helperText={titleErr ? "Please enter valid title" : ''}
                            onChange={(e) => {
                                let data = e.target.value.trim();
                                if (data == '') {
                                    setTitleErr(true)
                                } else {
                                    setTitleErr(false)
                                    setTitle(e.target.value)
                                }
                            }}
                        />
                    </div>

                    <div className="addProductInputs">
                        <TextField
                            error={categoryErr}
                            id="standard-error-helper-text"
                            label="Category"
                            value={category}
                            defaultValue=""
                            helperText={categoryErr ? "Please enter valid category." : ''}
                            onChange={(e) => {
                                let data = e.target.value.trim();
                                if (data == '') {
                                    setCategoryErr(true)
                                } else {
                                    setCategoryErr(false)
                                    setCategory(e.target.value)
                                }
                            }}
                        />
                    </div>

                    <div className="addProductInputs">
                        <TextField
                            error={descriptionErr}
                            id="standard-error-helper-text"
                            label="Description"
                            value={description}
                            defaultValue=""
                            helperText={descriptionErr ? "Please enter valid description." : ''}
                            onChange={(e) => {
                                let data = e.target.value.trim();
                                if (data == '') {
                                    setDescriptionErr(true)
                                } else {
                                    setDescriptionErr(false)
                                    setDescription(e.target.value)
                                }
                            }}
                        />
                    </div>

                    <div className="addProductInputs">
                        <TextField
                            error={priceErr}
                            id="standard-error-helper-text"
                            label="Price"
                            value={price}
                            defaultValue=""
                            helperText={priceErr ? "Please enter valid price." : ''}
                            onChange={(e) => {
                                let data: any = e.target.value.trim();
                                console.log(Number(data), isNaN(data));
                                if (isNaN(data)) {
                                    setPriceErr(true);
                                    return;
                                }
                                if (data == '') {
                                    setPriceErr(true)
                                } else {
                                    setPriceErr(false)
                                    setPrice(e.target.value)
                                }
                            }}
                        />
                    </div>

                    <div className="addProductInputs">
                        <TextField
                            error={imageErr}
                            id="standard-error-helper-text"
                            label="Image Url"
                            value={image}
                            defaultValue=""
                            helperText={imageErr ? "Please enter the vaild image url." : ''}
                            onChange={(e) => {
                                let data = e.target.value.trim();

                                let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi

                                if (!data.match(regex)) {
                                    setImageErr(true)
                                    return;
                                }

                                if (data == '') {
                                    setImageErr(true)
                                } else {
                                    setImageErr(false)
                                    setImage(e.target.value)
                                }
                            }}
                        />
                    </div>

                </div>
                <div className="addProductSaveBtn">
                    <div>
                        <Button variant="contained" disabled={disabledBtn} className="btnSave"fullWidth  color="primary" onClick={saveProduct}>
                            <SaveIcon /> Save Product
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" disabled={disabledBtn} fullWidth color="secondary" onClick={closeModal}>
                            <CancelIcon /> Cancel
                        </Button>

                    </div>

                </div>
            </div>
        </Dialog>
    );
}
function AddProductModal(props: any) {
    const [open, setOpen] = React.useState(true);



    const handleClose = (value: string) => {
        setOpen(false);

    };
    return (
        <div>
            <SimpleDialog open={open} onClose={handleClose} closeModal={props.closeModal} updateData={props.updateData} showAddNew={(data: any) => props.showAddNew(data)} />
        </div>
    )
}

export default AddProductModal
