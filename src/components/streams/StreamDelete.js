import React from 'react';
import Modal from '../Modal';
import {connect} from 'react-redux';
import history from '../..//history'
import {fetchStream, deleteStream} from '../../actions'
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderAction(){
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(id)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }
    renderContent(){
        if(!this.props.stream){
            return 'Are you sure want to delete this stream'
        }
        return `Are you sure want to delete this stream with title: ${this.props.stream.title}`
    }
    render(){
        return (
            <Modal 
                title="Delete Stream"
                description={this.renderContent()}
                actions = {this.renderAction()}
                onDismiss = {()=>history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)