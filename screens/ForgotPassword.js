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

const { width, height } = Dimensions.get('screen');

const constraints = {
  email: {
    presence: {
      message: "Email can not be blank. \n"
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
  email: '',
  emailError: '',
}
class ForgotPassword extends React.Component {
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
  forgotpassword = () => {
    let { email} = this.state;

    let emailError = validator('email', email)
    this.setState({
      emailError: emailError,
    })
    emailError ? this.showAlert() : null
  }
  render() {
    const {emailError,showAlert } = this.state
    const { navigation } = this.props
    return (
    <Block flex middle>
      {showAlert ? <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert!"
          message={ emailError ? emailError : null}
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
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
            >
            <Block flex middle>
              <Block style={styles.forgotPasswordContainer}>
                <Block flex space="evenly" style={{marginTop:"5%"}}>
                  <Block flex={1} middle space="evenly">
                    <ScrollView showsVerticalScrollIndicator={false}>
                          <Block flex marginBottom="5%">
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center'
                            }}
                            color="#333"
                            size={RFPercentage(4)}
                          >
                            Forgot Password 
                          </Text>
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Enter your registered email"
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
                        <Block center>
                          <Button color="active" round style={styles.createButton} onPress={this.forgotpassword}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={RFPercentage(2)}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Send email
                            </Text>
                          </Button>
                          <Button color="default" round style={styles.createButton} onPress={() => {this.setState(state),navigation.navigate('Login')}}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={RFPercentage(2)}
                              color={nowTheme.COLORS.BLACK}
                            >
                              Back to Login
                            </Text>
                          </Button>
                        </Block>
                    </ScrollView>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    </Block>
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
  forgotPasswordContainer: {
    
    width: width * 0.9,
    height: height < 720 ? height * 0.45 : height * 0.4,
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
    borderColor: nowTheme.COLORS.ERROR,
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

export default ForgotPassword;
