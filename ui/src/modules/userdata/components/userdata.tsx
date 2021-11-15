import Spinner from 'modules/common/components/Spinner';
import { IRouterProps } from 'modules/common/types';
import { __ } from 'modules/common/utils';
// import Left from 'modules/growthHacks/components/priorityMatrix/Left';
import Wrapper from 'modules/layout/components/Wrapper';
import React, { useEffect, useState } from 'react';
import { IDashboard } from '../types';
// import Button from 'modules/common/components/Button';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import { Link } from 'react-router-dom';
import loanData from '../create-loan-application.json';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type Props = {
    queryParams: any;
    dashboards: IDashboard[];
    loading: boolean;
};

type FinalProps = {} & Props & IRouterProps;

const UserList = (props: FinalProps) => {
    useEffect(() => {
    });
    var loanDatas = loanData && loanData.data
    var loanOffer = Array();
    loanOffer = Object.values(loanDatas.loanOffers)
    const [tableData, setTableData] = useState<string[]>(loanOffer);
    const [selectedData, setSelectedData] = useState({});
    const [dropdownTitle, setdropdownTitle] = useState('Search with');
    const [textValue, setTextvalue] = useState('Value');
    const [showModal, setShowModal] = useState(false);
    // const [field, setField] = useState([]);
    // const options = [{ name: 'Trisha', value: 'trisha' }, { name: 'tetc', value: 'tetc' }]

    if (props.loading) {
        return <Spinner />;
    }

    const detailsOnClick = () => {
        // console.log("selectedDATA", selectedData, selectedData == null)
        // setSelectedData({})
        let loanDatas = loanData.data
        // console.log("clicked===================================", loanDatas)
        let loanOffer = Array();
        loanOffer = Object.values(loanDatas.loanOffers)
        setTableData(loanOffer)
        // setSelectedData(loanOffer)
    }

    const detailClick = () => {
        // console.log("selectedDATuuuuA", selectedData, selectedData == null)
        setSelectedData({})
        let newArr = Array();
        let loanDatas = loanData.data
        // console.log("clicked===================================", loanDatas)
        let loanOffer = Array();
        loanOffer = Object.values(loanDatas.applicationDocuments)
        // console.log("loanOffer", loanOffer)
        loanOffer.map(data => {
            delete data['documentVerificationDetails']
            newArr.push(data)
        })
        setSelectedData(newArr[0])
    }
    const changeText = (e) => {
        setTextvalue(e.target.value)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const renderFilter = () => {
        const { queryParams } = props;
        const { state, id = '' } = queryParams;
        // console.log("queryParams--------------------------=====================", queryParams)
        // console.log("selectedData===================", selectedData)
        let selectedKey = Object.keys(selectedData)
        // console.log("selectedKey===================", selectedKey)

        return (
            <div style={{ marginTop: '10%' }}>
                <Tabs grayBorder={true}>
                    <Link to={`/userlist?id=${id}`}>
                        <TabTitle className={!state ? 'active' : ''} onClick={detailsOnClick}>
                            {__('Application Data')}
                        </TabTitle>
                        {/* {!state ? <TabContent>
                            {selectedKey && selectedKey.length ? selectedKey.map(data => (
                                <div> <input type="radio" id="html" name="fav_language" value="HTML" />
                                    <label>{data}</label>
                                </div>)) : ''
                            }
                            <div className="btn-group" style={{ display: 'flex', marginTop: '20%' }}>
                                <button>Edit and Comment</button>
                                <button>Approve</button>
                                <button>Reject</button>
                            </div>
                        </TabContent> : ''} */}
                    </Link>
                    <Link to={`/userlist?id=${id}&state=BorrowerData`}>
                        <TabTitle className={state === 'BorrowerData' ? 'active' : ''} onClick={detailsOnClick}>
                            {__('Borrowor data')}
                        </TabTitle>
                        {/* {state === 'BorrowerData' ? <TabContent>
                            {selectedKey && selectedKey.length ? selectedKey.map(data => (<div>
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label>{data}</label>
                            </div>)) : ''
                            }

                            <div className="btn-group" style={{ display: 'flex', marginTop: '20%' }}>
                                <button>Edit and Comment</button>
                                <button>Approve</button>
                                <button>Reject</button>
                            </div>
                        </TabContent> : ''} */}

                    </Link>
                    <Link to={`/userlist?id=${id}&state=coborrower`}>
                        <TabTitle className={state === 'coborrower' ? 'active' : ''} onClick={detailClick}>
                            {__('Co Borrower Data')}
                        </TabTitle>
                        {/* {state === 'coborrower' ? <TabContent>
                            {selectedKey && selectedKey.length ? selectedKey.map(data => (<div>
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label>{data}</label>
                            </div>)) : ''
                            }
                            <div className="btn-group" style={{ display: 'flex', marginTop: '20%' }}>
                                <button>Edit and Comment</button>
                                <button>Approve</button>
                                <button>Reject</button>
                            </div>
                        </TabContent> : ''} */}
                    </Link>
                    <Link to={`/userlist?id=${id}&state=docsandimages`}>
                        <TabTitle className={state === 'docsandimages' ? 'active' : ''} onClick={detailsOnClick}>
                            {__('Docs and Images')}
                        </TabTitle>
                        {/* {state === 'docsandimages' ? <TabContent>   {selectedKey && selectedKey.length ? selectedKey.map(data => (<div>
                            <input type="radio" id="html" name="fav_language" value="HTML" />
                            <label>{data}</label>
                        </div>)) : ''
                        }
                            <div className="btn-group" style={{ display: 'flex', marginTop: '20%' }}>
                                <button>Edit and Comment</button>
                                <button>Approve</button>
                                <button>Reject</button>
                            </div>
                        </TabContent> : ''} */}
                    </Link>
                </Tabs>
                <div>
                    {/* {!state ?  */}
                    <>
                        <div style={{ columns: '3 auto', paddingLeft: '12px', paddingTop: '5px' }}>
                            {selectedKey && selectedKey.length ? selectedKey.map(data => (
                                <div style={{ margin: '2px' }}>
                                    <input type="radio" id="html" name="fav_language" value="HTML" />
                                    <label>{data}</label>
                                </div>)) : ''
                            }
                        </div>
                        <div className="btn-group" style={{ display: 'flex', marginTop: '2%', float: 'right' }}>
                            <button>Edit and Comment</button>
                            <button >Approve</button>
                            <button onClick={() => { setShowModal(true) }}> Reject </button>
                        </div>
                        {/* <Grid>
                            <Presentation>
                                {selectedKey.map((data, index) => (
                                    <Row key={index}>
                                        <RowWrapper>
                                            <Cell
                                            >
                                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                                <label>{data}</label>
                                            </Cell>
                                            <Cell
                                            >
                                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                                <label>{data}</label>
                                            </Cell>
                                            <Cell
                                            >
                                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                                <label>{data}</label>
                                            </Cell>
                                        </RowWrapper>
                                    </Row>
                                ))}
                            </Presentation>
                        </Grid>
                        <div className="btn-group" style={{ display: 'flex', marginTop: '20%' }}>
                            <button>Edit and Comment</button>
                            <button>Approve</button>
                            <button>Reject</button>
                        </div> */}
                    </>
                    {/* : ''} */}
                </div>
            </div>
        );
    };

    const RadioClick = (item) => {
        // console.log("item-==============", item)
        setSelectedData(item)
    }
    const changeValue = (e) => {
        // console.log("e.target.value", e.currentTarget.textContent)
        setdropdownTitle(e.currentTarget.textContent)
    }
    const renderContent = () => {
        // console.log("tableData", tableData)
        let headerData = tableData && tableData.length ? Object.keys(tableData[0]) : []
        headerData.unshift("")
        // console.log("headerData----------------------------", headerData)
        return (
            <>
                <div className="btn-group">
                    <button style={{
                        float: 'right', marginLeft: '83%',
                        marginTop: '3%', marginBottom: '1%'
                    }}>Create New</button>
                    <br />
                    <div style={{ float: 'right', display: 'flex' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {dropdownTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={changeValue}>Appln ID</Dropdown.Item>
                                <Dropdown.Item onClick={changeValue} >Mobile No.</Dropdown.Item>
                                <Dropdown.Item onClick={changeValue}>Fullname</Dropdown.Item>
                                <Dropdown.Item onClick={changeValue}>PAN</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control style={{
                            marginTop: '-21px',
                            marginRight: '23px', marginLeft: '-35px', height: '40px'
                        }}
                            type="text"
                            name="Value"
                            defaultValue={textValue}
                            onChange={changeText}
                        />
                    </div>
                </div>

                <div style={{ height: '40%' }}>
                    <table id="userTable">
                        <thead>
                            <tr>
                                {headerData && headerData.length && headerData.map((columnId, index) => {
                                    return index !== 0 ? <th key={index}>{columnId} </th> : <th
                                        key={index}>{columnId} </th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index}>
                                    <td >
                                        <input value="1" id="type_radio_1" name="type_radio" type="radio" onClick={() => RadioClick(item)} />
                                    </td>
                                    {Object.values(item).map((val) => (
                                        <td>
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {renderFilter()}

                <Modal show={showModal} onHide={handleClose}
                >
                    <Modal.Header closeButton style={{ background: '#aee0ae' }}>
                        {/* <Modal.Title>Reject Data</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body style={{ background: '#aee0ae' }}>
                        <div style={{ display: 'flex' }}>
                            {/* Reason for Rejection */}
                            <Form.Control
                                type="text"
                                name="Value"
                                defaultValue={'Reason for Rejection'}
                                style={{
                                    width: '65%',
                                    marginRight: '8px'
                                }}
                                readOnly
                            />
                            <Form.Control
                                type="text"
                                name="Value"
                                defaultValue={''}
                                onChange={changeText}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '2%' }}>
                            <span style={{
                                borderRadius: '5px',
                                background: 'white',
                                border: '1px solid #ccc',
                                padding: '5px',
                                width: '39%',
                                marginRight: '8px',
                                height: '54px'
                            }}>Field with contradicting value</span>
                        </div>
                        <div className="btn-group" style={{ marginTop: '20%' }}>
                            <button style={{
                                float: 'right',
                                background: '#8de1ec',
                                width: '121px',
                                // height: '42px',
                                verticalAlign: 'middle',
                                border:'1px solid black'
                            }}>Submit</button>
                        </div>

                    </Modal.Body>

                </Modal>
            </>
        );
    };

    return (<>
        <Wrapper
            header={
                <Wrapper.Header
                    title={`${'UserList' || ''}`}
                    breadcrumb={[{ title: __('UserList'), link: '/dashboard' }]}
                />
            }
            content={renderContent()}
        />
    </>
    );
};

export default UserList;
