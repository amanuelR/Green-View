import React, {
    useState,
    useCallback,
    useEffect,
    useLayoutEffect,
} from "react";
import { GiftedChat, InputToolbar, Send, Bubble } from "react-native-gifted-chat";
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView} from "react-native";
import db from "../../firebase";
import { updateDoc, arrayUnion, doc, onSnapshot } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { async } from "@firebase/util";
//import firebase from "firebase/app";
import MapTopIcon from "../components/MapTopIcon";
import { render } from "react-dom";
export default function ChatScreen({ route, navigation }) {
    const [messages, setMessages] = useState([]);
    const { user, userData } = useAuthentication();
    console.log("Chatscreen route => ", route);
    useEffect(() => {
        let unsubscribeFromNewSnapshots = onSnapshot(
            doc(db, "chats", route.params.paramKey.toString()),
            (snapshot) => {
              let updatedMessage = snapshot.data().messages.map((message) => {
                message.createdAt = message.createdAt.seconds * 1000;
                return message;
              });
              setMessages(updatedMessage);
            });

        return function cleanupBeforeUnmounting() {
            unsubscribeFromNewSnapshots();
        };
    }, [route]);
    // console.log("Message after effect---",route.params.paramKey.toString(), messages)
    const onSend = useCallback(
        async (messages = []) => {
            await updateDoc(
                doc(db, "chats", route.params.paramKey.toString()),
                {
                    messages: arrayUnion(messages[0]),
                }
            );
        },
        [route]
    );

    const renderSend = (props) => {
      return (
          <Send {...props}>
              <View>
                  <MaterialCommunityIcons
                      name="send-circle"
                      style={{ marginBottom: 5, marginRight: 5 }}
                      size={32}
                      color="green"
                  />
              </View>
          </Send>
      );
  };
  const renderBubble = (props) => {
      return (
          <Bubble
              {...props}
              wrapperStyle={{
                  right: {
                      backgroundColor: '#009900',
                  },
                  left: {
                      backgroundColor: '#CCFFCC',
                  },
              }}
              textStyle={{
                  right: {
                      color: '#fff',
                  },
              }}
          />
      );
  };
    // //const [userId, setUserID] = useState([]);
    if (user == null || userData == null) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    
    return (
          <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        // current "blue bubble" user
                        _id: userData._id,
                        name: userData.name,
                        avatar: userData.avatar,
                    }}
                    inverted={false}
                    showUserAvatar={true}
                    renderUsernameOnMessage={true}
                    alwaysShowSend
                    bottomOffset={110}
                    renderBubble = {renderBubble}
                    renderSend = {renderSend}
                />
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: "column",
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    profileTopContainer: {
        width: "100%",
        height: 70,
        position: "absolute",
        top: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
    },
    profileTopLeft: {},
    profileTopRight: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: 108,
    },
    profileContainer: {
        height: "70%",
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    profileContent: {
        marginTop: 50,
        marginLeft: 40,
    },
    reward: {
        position: "absolute",
        marginLeft: 200,
    },
});
