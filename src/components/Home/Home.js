import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import image from '../../images/h-01.png';
import imagex from '../../images/h-011.png';
const Home = () => {
  let history = useHistory();
  const handleDashboard = () => {
    console.log('btn ckiclk');
    history.push('/Dashboard');
  };
  return (
    <>
      <h2 className='yellow-600 h2 my-5'>Innovations Everywhere!</h2>

      <button
        className='yellow-600 btn-custom mr-auto float-left'
        title='Goto Dashboard Page and Make CRUD Operation!'
        onClick={handleDashboard}
      >
        /Goto Dashboard
      </button>

      <div className='row w-100 text-center m-auto'>
        <div className='col-md-4 my-3'>
          <Card style={{ width: '80%' }} className='m-auto h-100'>
            <Card.Img className='h-50' variant='top' src={image} />
            <Card.Body>
              <Card.Title>Audio Ads in Mumbai Metro</Card.Title>
              <Card.Text>
                The Metro has become the megapolis’ East-West lifeline,
                providing not just rapid, but a clean.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-4 my-3'>
          <Card style={{ width: '80%' }} className='m-auto h-100'>
            <Card.Img className='h-50' variant='top' src={imagex} />
            <Card.Body>
              <Card.Title>Audio Ads in Mumbai Metro</Card.Title>
              <Card.Text>
                The Metro has become the megapolis’ East-West lifeline,
                providing not just rapid, but a clean.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-4 my-3'>
          <Card style={{ width: '80%' }} className='m-auto h-100'>
            <Card.Img className='h-50' variant='top' src={image} />
            <Card.Body>
              <Card.Title>Audio Ads in Mumbai Metro</Card.Title>
              <Card.Text>
                The Metro has become the megapolis’ East-West lifeline,
                providing not just rapid, but a clean.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
