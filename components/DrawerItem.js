import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import nowTheme from "../constants/Theme";
import {RFPercentage} from "react-native-responsive-fontsize";
class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={RFPercentage(2.5)}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK }
            style={{ opacity: 0.5 }}
          />
        );
      case "Components":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={RFPercentage(2.5)}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
            style={{ opacity: 0.5 }}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={RFPercentage(2.5)}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
            style={{ opacity: 0.5 }}
          />
        );
      case "Register":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={RFPercentage(2.5)}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
            style={{ opacity: 0.5 }}
          />
        );
      case "GETTING STARTED":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={RFPercentage(2.5)}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="user-run2x"
            family="NowExtra"
            size={RFPercentage(2.5)}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: RFPercentage(8) }}
        onPress={() =>
          title == "GETTING STARTED"
            ? Linking.openURL(
                "https://demos.creative-tim.com/now-ui-pro-react-native/docs/"
              ).catch(err => console.error("An error occurred", err))
            : navigation.navigate(title == 'LOGOUT' ? 'Onboarding' : title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: '2%' }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                textTransform: "uppercase",
                fontWeight: "300"
              }}
              size={RFPercentage(2)}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.WHITE : nowTheme.COLORS.BLACK}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    color: "white"
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.ACTIVE,
    borderRadius: 30,
    color: "white"
  },
  shadow: {
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
