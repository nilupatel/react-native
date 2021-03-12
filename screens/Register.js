import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import validate from 'validate.js';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { RFPercentage } from "react-native-responsive-fontsize";
import  AwesomeAlert  from "react-native-awesome-alerts";
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('screen');

const constraints = {
  email: {
    presence: {
      message: "Email can not be blank. \n"
    },
    email: {
      message: 'Please enter a valid email address \n'
    }
  },
  password: {
    presence: {
      message: "Password can not be blank. \n"
    },
    length: {
      minimum: 8,
      message: 'Password must be at least 6 characters \n'
    }
  },
  firstName: {
    presence: {
      message: "First name can not be blank. \n"
    },
  },
  confirmPassword: {
    equality: {
      attribute: "password",
      message: "Password do not match\n",
      comparator: function(v1) {
        return v1.confirmPassword === v1.password;
      }
    }
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
  if (value != '' && value != null) {//if null value it will return with the presence validation
     result = validate(object, constraint)
  }

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0]
  }

  return ''
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const state = {
  firstName: '',
  firstNameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
}
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };
   showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  
   hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  registerSuccess = () => {
    const data = { name: this.state.firstName,
    email:this.state.email,
    password:this.state.password };

  fetch('http://localhost:8080/v1/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  }).then(this.props.navigation.navigate('Login'), alert("Registerd Successfully"))
  .catch((error) => {
  console.error('Error:', error);
  });
};
  register = () => {
    let {firstName, email, password, confirmPassword} = this.state;
    let firstNameError = validator('firstName', firstName)
    let emailError = validator('email', email)
    let passwordError = validator('password', password)
    let confirmPasswordError = validator('confirmPassword', { confirmPassword:confirmPassword, password:password})    
    this.setState({
      firstNameError: firstNameError,
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError
    })
    emailError || passwordError || firstNameError || confirmPasswordError ? this.showAlert() : this.registerSuccess()
  }
  onLoginClick = () =>{
    this.setState(state);
    this.props.navigation.navigate('Login');
    }
  render() {
    const {emailError,passwordError,firstNameError,confirmPasswordError,showAlert} = this.state;
    const { navigation } = this.props;
    return (
    <Block flex middle>
      {showAlert ? <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert!"
          message={ firstNameError || confirmPasswordError || emailError || passwordError ? 
            firstNameError + emailError +  passwordError + confirmPasswordError
            : null}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText=" OK "
          confirmButtonColor={nowTheme.COLORS.ACTIVE}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />: null}
        <DismissKeyboard>
          <SafeAreaView>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
            >
            <Block flex middle>
              <Block style={styles.registerContainer} >
                <Block flex space="evenly" style={{marginTop:"5%"}}>
                  <Block flex={1} middle space="evenly">
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Block flex={0.4} middle style={styles.socialConnect}>
                        <Block flex={0.5} middle>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            color="#333"
                            size={RFPercentage(4)}
                          >
                            Register
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
                          size={RFPercentage(3)}
                        >
                          or be classical
                        </Text>
                      </Block>
                      <Block flex={1} middle space="between">
                        <Block center flex={0.9}>
                        <Block flex space="between">
                          <Block>
                            <Block width={width * 0.8} >
                              <Input
                                placeholder="First Name"
                                value={this.state.firstName}
                                style={firstNameError ? styles.errinputs : styles.inputs}
                                onChangeText={(firstNameConstraints,firstNameError) => this.setState({firstName: firstNameConstraints,firstNameError:firstNameError })}
                                iconContent={
                                  <Icon
                                    size={RFPercentage(2)}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8}>
                              <Input
                                placeholder="Email"
                                value={this.state.email}
                                style={emailError ? styles.errinputs : styles.inputs}
                                onChangeText={(emailConstraints,emailError) => this.setState({email: emailConstraints,emailError:emailError })}
                                iconContent={
                                  <Icon
                                    size={RFPercentage(2)}
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
                                secureTextEntry={true}
                                value={this.state.password}
                                style={passwordError ? styles.errinputs : styles.inputs}
                                onChangeText={(passwordConstraints,passwordError) => this.setState({password: passwordConstraints ,passwordError:passwordError })}
                                iconContent={
                                  <Icon
                                    size={RFPercentage(2)}
                                    color="#ADB5BD"
                                    name="key-252x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                            <Block width={width * 0.8} >
                              <Input
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                value={this.state.confirmPassword}
                                style={confirmPasswordError ? styles.errinputs : styles.inputs}
                                onChangeText={(confirmPasswordConstraints,confirmPasswordError) => this.setState({confirmPassword: confirmPasswordConstraints,confirmPasswordError:confirmPasswordError })}
                                iconContent={
                                  <Icon
                                    size={RFPercentage(2)}
                                    color="#ADB5BD"
                                    name="profile-circle"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                  />
                                }
                              />
                            </Block>
                          </Block>
                          <Block center>
                            <Button color="active" round style={styles.createButton} onPress={this.register}>
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={RFPercentage(2)}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Sign-up
                              </Text>
                            </Button>
                            <Button color='default' round style={styles.createButton} onPress={this.onLoginClick}>
                              <Text
                                style={{ fontFamily: 'montserrat-bold' }}
                                size={RFPercentage(2)}
                                color={nowTheme.COLORS.BLACK}
                              >
                                Go to Login
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      </Block>
                      </Block>
                    </ScrollView>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        </SafeAreaView>
      </DismissKeyboard>
    </Block>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    zIndex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  registerContainer: {
    width: width * 0.9,
    height: height < 720 ? height * 0.85 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
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
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: RFPercentage(2)
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
    borderColor: nowTheme.COLORS.ERROR ,
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

export default Register;
