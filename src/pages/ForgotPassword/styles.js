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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  forgotPassword: {
    width: '60%',
    padding: '16px 40px 120px',
    background: 'white',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },

  toGetVerification: {
    marginTop: 20,
    marginBottom: 35,
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
};
