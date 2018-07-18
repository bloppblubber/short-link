import {Meteor} from "meteor/meteor";
import Modal from 'react-modal';
import React from 'react';

export default class AddLink extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onChange(e){
        this.setState({
            url: e.target.value.trim()
        })
    }

    onSubmit(e){
        const url = this.state.url;

        e.preventDefault();

            Meteor.call('links.insert',url, (err,result) =>{
                if(!err){
                    this.closeModal().bind(this);
                }
                else{
                    this.setState({ error: err.reason });
                }
            })
    }

    closeModal(){
        this.setState({url: '', isOpen:false, error : ''})
    }

    render(){
        return (
            <div>
                <button className={"button"} onClick={() => {this.setState({isOpen: true})}}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel={"Add Link"}
                    onAfterOpen={() =>{ this.refs.url.focus()}}
                    onRequestClose={this.closeModal.bind(this)}
                    className={"boxed-view__box"}
                overlayClassName={"boxed-view boxed-view--modal"}>
                    <p>Add Link</p>
                    {this.state.error ? <p> {this.state.error} </p> : null}
                    <form onSubmit={this.onSubmit.bind(this)} className={"boxed-view__form"}>
                        <input ref={"url"} type="text" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
                        <button className={"button"}>Add Link</button>
                        <button  type="button" className={"button button--secondary"} onClick={this.closeModal.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}