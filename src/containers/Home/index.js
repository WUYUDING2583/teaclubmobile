import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Flex, Tabs } from "@ant-design/react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as customersActions, getByCustomers, getCustomers } from "../../redux/modules/customer";
import { getUser } from "../../redux/modules/auth";

class Home extends React.Component {
    state = {
        ws: null,
    }

    componentDidMount() {
        var ws = new WebSocket(`ws://192.168.1.228:8080/websocket/${this.props.user.uid}`);
        ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
        };

        ws.onmessage = (e) => {
            // a message was received
            console.log("receive message", JSON.parse(e.data));
            this.props.receieveCustomers(JSON.parse(e.data));
        };

        ws.onerror = (e) => {
            // an error occurred
            console.log("websocket error", e.message);
        };

        ws.onclose = (e) => {
            // connection closed
            console.log("websocket close", e.code, e.reason);
        };
    }

    render() {
        const { customers, byCustomers, user } = this.props;
        const tabs = [
            { title: 'First Tab' }
        ];
        const style = {
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            backgroundColor: '#fff',
        };
        return (
            <Flex style={{ width: "100%", height: "100%" }}>
                <Flex.Item style={{ flex: 2, backgroundColor: "green" }}><Text>asdf</Text></Flex.Item>
                <Flex.Item style={{ flex: 1, height: "100%", borderLeftWidth: 1, borderColor: "black" }}>
                    <Flex direction="column" style={{ width: "100%", height: "100%" }}>

                        {/* {
                                customers.map(uid => (
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 100,
                                            resizeMode: 'contain',
                                        }}
                                        key={uid}
                                        source={{ uri: byCustomers[uid].image }} />
                                ))
                            } */}
                    </Flex>
                </Flex.Item>
            </Flex>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        customers: getCustomers(state),
        byCustomers: getByCustomers(state),
        user: getUser(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(customersActions, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);