import React from 'react'

import { Layout } from 'antd'

const { Footer } = Layout;

class NewFooter extends React.Component {
    constructor () {
        super()
    }

    render () {

        return (
            <Footer style={{ textAlign: 'center', backgroundColor: "dodgerblue", color: "white", position: "fixed", bottom: 0, width: "100%"}}>
                Asiri Foods ©2018 Created by Yasiru
            </Footer>
        )
    }
}

export default NewFooter;