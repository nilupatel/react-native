import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import {RFPercentage} from "react-native-responsive-fontsize";
import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Components",
    "Profile",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: '4%', paddingRight: '4%' }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: '8%', marginVertical: '2%', paddingHorizontal: '4%' }}>
          <Block
            style={{ borderColor: 'black', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
        </Block>
        <DrawerCustomItem title="LOGOUT" navigation={navigation}/>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: '15%',
    width:'100%',
    paddingHorizontal: '6%',
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  logo: {
    height: RFPercentage(8),
    width:  RFPercentage(8)
  }
});

export default CustomDrawerContent;
