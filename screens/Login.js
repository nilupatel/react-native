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
  },
  password: {
    presence: {
      message: "Password can not be blank. \n"
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
  password: '',
  passwordError: '',
}
class Login extends React.Component {
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
  
  loginSuccess = () => {
    const data = { email:this.state.email,
      password:this.state.password };

      fetch('http://localhost:8080/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((response) => {if (response.accessToken) {this.props.navigation.navigate('App') ; alert("Login Successfully")}
        else{alert("Login Failed")}console.log(response)})
        .catch((error) => {
        console.error('Error:', error);
        });
  };

  logIn = () => {
    let { email, password } = this.state;

    let emailError = validator('email', email)
    let passwordError = validator('password', password)
    this.setState({
      emailError: emailError,
      passwordError: passwordError
    })
    emailError || passwordError ? this.showAlert() : this.loginSuccess()
  }
  clearState = () =>{
    this.setState(state);
    }
  render() {
    const {emailError,passwordError,showAlert } = this.state
    const { navigation } = this.props
    return (
    <Block flex middle>
      {showAlert ? <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert!"
          message={ emailError || passwordError ? 
            emailError +  passwordError 
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
              <Block style={styles.loginContainer}>
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
                          size={RFPercentage(3)}
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
                              value={this.state.email }
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
                        </Block>
                        <Block middle flex marginVertical='4%'>
                          <Text size={RFPercentage(2)} onPress={() => {this.clearState(),navigation.navigate('ForgotPassword')}}> Forgot password?</Text>
                        </Block>
                        <Block center>
                          <Button color="active" round style={styles.createButton} onPress={this.logIn}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={RFPercentage(2)}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Sign-in
                            </Text>
                          </Button>
                          <Button color="default" round style={styles.createButton} onPress={() => {this.clearState() ,navigation.navigate('Register')}}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={RFPercentage(2)}
                              color={nowTheme.COLORS.BLACK}
                            >
                              Go to Register
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
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  loginContainer: {
    
    width: width * 0.9,
    height: height < 720 ? height * 0.85 : height * 0.8,
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

export default Login;
