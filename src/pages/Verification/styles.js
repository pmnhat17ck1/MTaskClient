import Colors from '../../configs/Colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: "linear-gradient(to right, #ACB6E5, #74ebd5)",
    height:'100%',
    width: '100%',
  },
  col: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBack: {
    fontSize: 16,
    marginLeft: 17,
  },
  bodyWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    width: 486,
    top: '50%',
    left: '50%',
    padding: '16px 40px 120px',
    background: 'white',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
