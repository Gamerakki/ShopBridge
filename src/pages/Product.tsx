import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ApiCalls from '../axios/ApiCalls';
import { productBaseUrl } from '../globalConstant/globalConstant';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import '../css/Product.scss'
import { Button, Modal, TextField } from '@material-ui/core';
import { searchByText } from '../commonFunctions/commonFunctions';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import AddProductModal from '../components/AddProductModal';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
    table: {
        minWidth: 340,
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    }
});

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  



let rows: any = [

];
function Product() {
    const classes = useStyles();
    const classesModal = useStyles2();
    const [modalStyle] = React.useState(getModalStyle);
    const [loader, setLoader] = useState(true);
    const [rows, setRow] = useState<any>([]);
    const [rowsBackUp, setRowBackUp] = useState<any>([]);
    const [searchText, setSearchText] = useState('');
    const [showAddNew, setShowAddNew] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [updateData,setUpdateData] = useState<any>('');
    const history = useHistory()
    useEffect(() => {
        getProductListing()

    }, [])

    // this function is called when user wants to get product listing
    const getProductListing = async () => {
        let responseData: any = await ApiCalls(productBaseUrl + 'products', 'get', '');
        console.log(responseData);
        if (responseData.status = 200) {
            responseData.data.map((data: any) => {
                rows.push(data)
            })
            setRow(rows);
            setRowBackUp(rows)
            setLoader(false);
        } else {
            toast.error('Error in getting the product list');
        }
    }

    const goToAddproduct = () => {
        // history.push('/addproduct');
        setShowAddNew(true)
    }

    return (
        <div className="productListMainContainer">
            {loader &&
                <Loader open={loader} />
            }
            <div>
                {
                    showAddNew && <AddProductModal updateData={updateData} showAddNew={(data: any) => {
                        console.log(data, 'fromapu')
                        let index = rows.findIndex(function(item:any, i:any){
                            return item.id === data.id
                          });
                          if(index != -1) {
                              rows.splice(index, 1);
                              rowsBackUp.splice(index, 1);
                              setRow(rows);
                              setRowBackUp(rowsBackUp);
                          }else{
                            data['id'] = rows.length + 1
                          }

                        
                        
                        rows.unshift(data);
                        setRow(rows);
                        setRowBackUp(rows);
                        setShowAddNew(false);
                        setUpdateData('');
                    }}
                    closeModal={() => {
                        setShowAddNew(false)
                    }}
                    />
                }
                <div className="headerSearch">
                    <div className="inputSearchText">
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            label="Search by title,categories,description, price"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                if (e.target.value == '') {
                                    setRow(rowsBackUp)
                                } else {
                                    let returnData = searchByText(rowsBackUp, searchText, '');
                                    setRow(returnData)
                                }
                            }}
                        />
                    </div>
                    <div className="inputSearchBtn">
                        <Button variant="contained" fullWidth color="primary" onClick={goToAddproduct}>
                            <AddIcon /> Add Prodcut
                        </Button>
                    </div>
                </div>
                <div className="tableContainerDiv" >
                    <TableContainer component={Paper}>
                        <Table style={{ display: 'table', tableLayout: 'fixed', width: '100%' }} className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Description&nbsp;</TableCell>
                                    <TableCell align="center">Image&nbsp;</TableCell>
                                    <TableCell align="center">Price&nbsp;</TableCell>
                                    <TableCell align="center">Delete&nbsp;</TableCell>
                                    <TableCell align="center">Edit&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow key={row.title}>
                                        <TableCell component="td" scope="row">
                                            {row.title}
                                        </TableCell>

                                        <TableCell align="left">{row.category}</TableCell>
                                        <TableCell className="descriptionCell" align="left">{row.description}</TableCell>
                                        <TableCell align="center" ><img className="imageTableCell" src={row.image} /></TableCell>
                                        <TableCell className="priceCell" align="center">$ {row.price}</TableCell>
                                        <TableCell className="deleteCell" align="center"> <div onClick={() => {
                                            setDeleteId(row.id);
                                            setOpenModal(true)

                                        }}
                                            className="deleteIconDiv">
                                            <DeleteForeverIcon />
                                        </div>  </TableCell>

                                        <TableCell className="deleteCell" align="center"> <div onClick={() => {
                                            setUpdateData(row)
                                            setShowAddNew(true)

                                        }}
                                            className="deleteIconDiv">
                                            <EditIcon />
                                        </div>  </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Modal
                className="confrimationPop"
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classesModal.paper}>
                <div className="confrimationPopMain">
                    <div className="confrimationTitle">
                        Are you sure you wanna delete ?
                    </div>
                    <div className="confrimationPopButton">
                        <div className="confrimationPopButtonYes">
                            <Button className="confrimationPopButtonYesBtn" variant="contained" color="primary" onClick={()=>{
                                let index = rows.findIndex(function(item:any, i:any){
                                    return item.id === deleteId
                                  });

                                rows.splice(index, 1);
                                rowsBackUp.splice(index, 1);
                                setRow(rows);
                                setRowBackUp(rowsBackUp);
                                setOpenModal(false);
                                toast.success('Product deleted successfully')

                            }}>
                                Yes
                            </Button>

                        </div>
                        <div className="confrimationPopButtonNo">
                            <Button className="confrimationPopButtonNoBtn" variant="contained" color="secondary" onClick={()=>{
                                setOpenModal(false)
                            }}>
                                No
                            </Button>
                        </div>
                    </div>

                </div>
                </div>
             
            </Modal>
        </div>
    )
}

export default Product
