import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from "./RouterConfig";

class App extends React.Component {

    render() {
        return (
            <div>
                <AppRouter/>
            </div>
        )
    }
}

export default App;