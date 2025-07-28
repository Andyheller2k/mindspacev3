import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  input: {
    height: 70,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  switchButton: {
    marginTop: 70,
  },
  switchButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});
