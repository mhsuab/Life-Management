//import React, { useEffect, useState, useRef, memo } from 'react'
//import { Modal, Header, Form, Input, TextArea, Button, Select, Icon } from 'semantic-ui-react'
//import PropTypes from 'prop-types'
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

//const options = [
//    { key: 'm', text: 'Male', value: 'male' },
//    { key: 'f', text: 'Female', value: 'female' },
//    { key: 'o', text: 'Other', value: 'other' },
//]

//class MyModal extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            startDate: new Date(),
//            endDate: new Date(),
//        }
//        this.handleStartChange = this.handleStartChange.bind(this);
//        this.handleEndChange = this.handleEndChange.bind(this);
//        this.onFormSubmit = this.onFormSubmit.bind(this);
//    }

//    handleStartChange(date) {
//        this.setState({
//            startDate: date
//        })
//    }

//    handleEndChange(date) {
//        this.setState({
//            endDate: date
//        })
//    }

//    onFormSubmit(e) {
//        e.preventDefault();
//        console.log(this.state.startDate)
//    }

//    confirmClick = (event, data) => {
//        console.log("Passed in Prop Value: " + this.props.valueIntoModal);
//        console.log(this.state.startDate);
//        this.props.handleClose();
//    }

//    render() {
//        return (
//            <Modal
//                key='modal1'
//                open={modalOpen}
//                size='small'
//                closeOnEscape={true}
//                closeOnRootNodeClick={true}
//            >
//                <Header icon='browser' content='Event' />
//                <Modal.Content>
//                    <Form>
//                        <Form.Field
//                            id='form-input-control-event-title'
//                            control={Input}
//                            label='Event Title'
//                            placeholder='Event Title'
//                        />
//                        <Form.Group widths='equal'>
//                            <Form.Field>
//                                <Form.Field
//                                    id='form-input-control-start-time'
//                                    label='Start Time'
//                                />
//                                <DatePicker
//                                    selected={this.state.startDate}
//                                    onChange={this.handleStartChange}
//                                    showTimeSelect={true}
//                                    timeIntervals={15}
//                                    dateFormat="MM/dd/yyyy h:mm aa"
//                                />
//                            </Form.Field>
//                            <Form.Field>
//                                <Form.Field
//                                    id='form-input-control-end-time'
//                                    label='End Time'
//                                />
//                                <DatePicker
//                                    selected={this.state.endDate}
//                                    onChange={this.handleEndChange}
//                                    showTimeSelect={true}
//                                    timeIntervals={15}
//                                    dateFormat="MM/dd/yyyy h:mm aa"
//                                />
//                            </Form.Field>
//                            <Form.Select
//                                label='Tag'
//                                options={options}
//                                placeholder='Event Type'
//                            />
//                        </Form.Group>
//                    </Form>
//                </Modal.Content>
//                <Modal.Actions>
//                    <Button
//                        negative
//                        type='button'
//                        icon='remove'
//                        labelPosition='right'
//                        onClick={
//                            (e) => {
//                                setModalOpen(false)
//                            }
//                        }
//                        content='Cancel'
//                    />
//                    <Button
//                        positive
//                        type='button'
//                        icon='checkmark'
//                        labelPosition='right'
//                        onClick={this.confirmClick}
//                        content='Confirm'
//                    />
//                </Modal.Actions>
//            </Modal>
//        )
//    }
//}

//MyModal.propTypes = {
//    modalOpen: PropTypes.bool.isRequired,
//    handleClose: PropTypes.func.isRequired,
//    valueIntoModal: PropTypes.string.isRequired
//}

//export default MyModal

///*  Class version

//class MyModal extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            startDate: new Date(),
//            endDate: new Date(),
//        }
//        this.handleChange = this.handleChange.bind(this);
//        this.onFormSubmit = this.onFormSubmit.bind(this);
//    }

//    handleChange(date) {
//        this.setState({
//            startDate: date
//        })
//    }

//    onFormSubmit(e) {
//        e.preventDefault();
//        console.log(this.state.startDate)
//    }

//    confirmClick = (event, data) => {
//        console.log("Passed in Prop Value: " + this.props.valueIntoModal);
//        console.log(this.state.startDate);
//        this.props.handleClose();
//    }

//    render() {
//        return (
//            <Modal
//                open={this.props.modalOpen}
//                size='small'
//                closeOnEscape={true}
//                closeOnRootNodeClick={true}
//            >
//                <Header icon='browser' content='Event' />
//                <Modal.Content>
//                    <Form>
//                        <Form.Field
//                            id='form-input-control-event-title'
//                            control={Input}
//                            label='Event Title'
//                            placeholder='Event Title'
//                        />
//                        <Form.Group widths='equal'>
//                            <Form.Field>
//                                <Form.Field
//                                    id='form-input-control-start-time'
//                                    label='Start Time'
//                                />
//                                <DatePicker
//                                    selected={this.state.startDate}
//                                    onChange={this.handleChange}
//                                    showTimeSelect={true}
//                                    timeIntervals={15}
//                                    dateFormat="MM/dd/yyyy h:mm aa"
//                                />
//                            </Form.Field>
//                            <Form.Field>
//                                <Form.Field
//                                    id='form-input-control-end-time'
//                                    label='End Time'
//                                />
//                                <DatePicker
//                                    selected={this.state.endDate}
//                                    onChange={this.handleChange}
//                                    showTimeSelect={true}
//                                    timeIntervals={15}
//                                    dateFormat="MM/dd/yyyy h:mm aa"
//                                />
//                            </Form.Field>
//                            <Form.Select
//                                label='Tag'
//                                options={options}
//                                placeholder='Event Type'
//                            />
//                        </Form.Group>
//                    </Form>
//                </Modal.Content>
//                <Modal.Actions>
//                    <Button
//                        negative
//                        type='button'
//                        icon='remove'
//                        labelPosition='right'
//                        onClick={this.props.handleClose}
//                        content='Cancel'
//                    />
//                    <Button
//                        positive
//                        type='button'
//                        icon='checkmark'
//                        labelPosition='right'
//                        onClick={this.confirmClick}
//                        content='Confirm'
//                    />
//                </Modal.Actions>
//            </Modal>
//        )
//    }
//}

//MyModal.propTypes = {
//    modalOpen: PropTypes.bool.isRequired,
//    handleClose: PropTypes.func.isRequired,
//    valueIntoModal: PropTypes.string.isRequired
//}
//*/