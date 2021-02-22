import React from "react";
import './editor.css'
import Helmet from 'react-helmet'
import { connect, Provider } from 'react-redux';
import { editing } from '../actions/code_editor';
import { render } from "@testing-library/react";
import Loader from 'react-loader-spinner';

class Editor extends React.Component {

    state = {
        input_file_name: '',
        code_file_name: '',
        mobile_number: '',
        input_flag: '',
        finaloutput : ''
    }
    componentDidMount() {

    }

    submitHandler = () => {
        var getText = document.getElementById('texteditor').value;
        console.log(getText)
        var base64_encode = btoa(unescape(encodeURIComponent(getText)))
        console.log(base64_encode)
        this.props.editing('a.py', '1', base64_encode, 'ABSENT')
        this.setState({
            finaloutput : this.props.output
        })
    }

    render() {
        this.props.output !== undefined ? console.log(this.props.output) : console.log('no')
        return (
            <div>
                <Helmet>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                </Helmet>
                <div className='row'>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="menu-bar">
                            <button className="btn btn-sm btn-primary submit-btn" style={{ position: 'relative', top: '20%' }} onClick={this.submitHandler}>Submit</button>
                        </div>
                        <textarea id="texteditor" className="editor_area">पश्य("hello ,world")</textarea>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="menu-bar"></div>


                        {this.props.output != undefined ?
                            <textarea className="output_area">{this.state.finaloutput}</textarea> :
                            // <Loader style={{ display: 'inline-block', transform: 'translateY(30%)', color:'#007bff' }} type="Puff" height={100} width={100}></Loader>
                            <div></div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    output: state.code_editor.output,
    isUploading: state.code_editor.isUploading
})

export default connect(
    mapStateToProps,
    { editing },
)(Editor);