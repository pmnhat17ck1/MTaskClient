import Colors from '../../configs/Colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  layout: {
    display: 'flex',
    flex:1,
    flexDirection: 'row',
    height: '100%',
  },
  sidebar: {
    background: "#FAFBFC",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    width: 280,
  },
  table: {
    padding: 16,
    paddingTop: '80px',
    flex: 1,
  },
  disable: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: Colors.Black,
    opacity: 0.1,
    zIndex: 10,
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
