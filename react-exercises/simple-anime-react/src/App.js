import React from 'react';
import './App.css';
import { Bounce, Fade, Pulse, Slide } from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';


const App = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Simple Anime Library</h1>

      <div className="row">
        <div className="col-md-3">
          <Bounce animationIterationCount='Infinite'>
            <img style={{ height: '300px' }} src="https://lh3.googleusercontent.com/proxy/XcRijctCnv9piNAXFEmqcpAmXi0XFDR6ONXIDmG8oNC9DUGzmQP1vVg_rISrBR8uFm0OtTMbadoctWY1xPEeH32wzrkuvUzhZlTOKAhY-OhTdj22_X3KKCwzkmmPxLGHSscxLZdg" alt="ball" />
          </Bounce>
        </div>

        <div className="col-md-3" style={{ marginTop: "5%" }} >
          <Fade cascade={true} delay="500" duration="2000">
            <Alert color="primary">This is a primary alert — check it out!</Alert>
            <Alert color="secondary">This is a secondary alert — check it out!</Alert>
            <Alert color="success">This is a success alert — check it out!</Alert>
            <Alert color="danger">This is a danger alert — check it out!</Alert>
            <Alert color="warning">This is a warning alert — check it out!</Alert>
            <Alert color="info">This is a info alert — check it out!</Alert>
            <Alert color="light">This is a light alert — check it out!</Alert>
            <Alert color="dark">This is a dark alert — check it out!</Alert>
          </Fade>
        </div>

        <div className="col-md-3" style={{ marginTop: "5%" }} >
          <Fade duration="2000" delay="500" cascade={true} method="fadeOut">
            <Alert color="primary">This is a primary alert — check it out!</Alert>
            <Alert color="secondary">This is a secondary alert — check it out!</Alert>
            <Alert color="success">This is a success alert — check it out!</Alert>
            <Alert color="danger">This is a danger alert — check it out!</Alert>
            <Alert color="warning">This is a warning alert — check it out!</Alert>
            <Alert color="info">This is a info alert — check it out!</Alert>
            <Alert color="light">This is a light alert — check it out!</Alert>
            <Alert color="dark">This is a dark alert — check it out!</Alert>
          </Fade>
        </div>


        <div className="col-md-3" style={{ marginTop: "5%" }} animationIterationCount='Infinite'>
          <Pulse duration="400" delay="300" className="parent">
            <img src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Sound-Wave-icon.png" alt="sound wave" style={{ width: '400px' }} />
          </Pulse>
        </div>

        <div className="col-md-3" style={{ marginTop: "5%" }} animationIterationCount='Infinite'>
          <Slide duration="5000" delay="1000" className="parent" method="up">
            <div className="block-blue">
              <p>Slide up</p>
            </div>
          </Slide>
        </div>
      </div>
    </>
  );
}

export default App;
