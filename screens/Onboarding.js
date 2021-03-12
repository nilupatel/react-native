import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { RFPercentage } from "react-native-responsive-fontsize"; 
export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
        <Block flex style={styles.container}>
          <ImageBackground
            source={Images.Onboarding}
            style={{ height: height, width, zIndex: 1 , opacity: 0.4}}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.Logo} style={{ width: RFPercentage(25), height: RFPercentage(25), bottom: RFPercentage(30), position: 'absolute' }} />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular', bottom: RFPercentage(8), position: 'absolute', letterSpacing: 2, paddingHorizontal: '2%', textAlign: 'center'
                    }}
                    color="white"
                    size={RFPercentage(5)}
                  >
                    Hotel Management
                  </Text>
                </Block>
              </Block>
              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: RFPercentage(2) }}
                    color={theme.COLORS.BLACK}
                  >
                    GET STARTED
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    height: height
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
});
