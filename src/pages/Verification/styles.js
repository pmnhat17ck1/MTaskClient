import Colors from '../../configs/Colors';

export default {
  colRight: {
    height: '100vh',
    padding: '45px 40px 120px',
  },
  textBack: {
    fontSize: 16,
    marginLeft: 17,
  },
  bodyWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '92%',
  },
  forgotPassword: {
    width: 405,
  },

  toGetVerification: {
    marginTop: 20,
    marginBottom: 24,
  },
  textOtp: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: Colors.Gray8,
  },
  textCountDown: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 12,
    color: Colors.Gray6,
  },
  button: {
    width: '100%',
    marginTop: 30,
    height: 45,
    borderRadius: 50,
    boderWidth: 1,
    color: Colors.White,
  },
  inputControl: {
    display: 'block',
    with: '100%',
  },
  wrapSignUp: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  textSignUp: {
    color: Colors.Secondary,
    marginLeft: 5,
    fontWeight: 'bold',
    padding: 0,
    height: 0,
  },
  inputOtp: {
    border: '1px solid White',
    borderBottom: `1px solid ${Colors.Gray4}`,
    color: Colors.Gray9,
    width: '54px',
    height: '54px',
    fontSize: '16px',
    fontWeight: '400',
    caretColor: Colors.Red,
  },
  otpInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusOtpInput: {
    borderBottom: `1px solid ${Colors.Primary}`,
    outline: 'none',
  },
};
