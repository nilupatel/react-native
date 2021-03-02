import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import validate from 'validate.js';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');


const constraints = {
  email: {
    presence: {
      message: "Cannot be blank."
    },
  },
  password: {
    presence: {
      message: "Cannot be blank."
    },
  }
}

const validator = (field, value) => {

  // Creates an object based on the field name and field value
  // e.g. let object = {email: 'email@example.com'}
  let object = new Object()
  object[field] = value

  let constraint = new Object()
  constraint[field] = constraints[field]

  // Validate against the constraint and hold the error messages
  var result = validate({}, constraint)//
  if (value.trim() != '' && value != null) {//if null value it will return with the presence validation
     result = validate(object, constraint)
  }

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0]
  }

  return null
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Login extends React.Component {
  state = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
  }
  logIn = () => {
    let { email, password } = this.state;

    let emailError = validator('email', email)
    let passwordError = validator('password', password)
    this.setState({
      emailError: emailError,
      passwordError: passwordError
    })
  }
  render() {
    const {emailError, passwordError } = this.state
    const { navigation } = this.props
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.loginContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Login
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: '8%' }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="dribbble"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.DRIBBBLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.7}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              style={emailError ? styles.errinputs : styles.inputs}
                              onChangeText={(emailConstraints,emailError) => this.setState({email: emailConstraints,emailError:emailError })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Password"
                              style={passwordError ? styles.errinputs : styles.inputs}
                              onChangeText={(passwordConstraints,passwordError) => this.setState({password: passwordConstraints ,passwordError:passwordError })}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton} onPress={this.logIn}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Sign-in
                            </Text>
                          </Button>
                          <Button color="default" round style={styles.createButton} onPress={() => navigation.navigate('Register')}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Go to Register
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  loginContainer: {
    marginTop: '5%',
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: '2%',
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  errinputs: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 21.5,
    shadowOffset: {
      width: 3,
      height: 6
    },
    shadowRadius: 21.5,
    shadowOpacity: 0.3,
    elevation: 8
  },
  passwordCheck: {
    paddingLeft: '2%',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  createButton: {
    width: width * 0.5
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: '3%'
  }
});

export default Login;
