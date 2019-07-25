import React from 'react';
import Header from '../components/header';

const App = (props) => {
    return (
        <div>
            <Header/>
            <div className='page'>
                {props.children}
            </div>
        </div>
    )
}

export default App;