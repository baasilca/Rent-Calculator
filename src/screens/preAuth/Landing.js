// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import {useTheme, Button} from 'react-native-paper';
// import {s} from './utils/scale';
// // import Icon from 'react-native-vector-icons/FontAwesome';

// function Landing({navigation}) {
//   const {colors} = useTheme();

//   return (
//     <View style={[styles.mainContainer, {backgroundColor: "#575af6"}]}>
//       {/* <ImageBackground style={{flex:1,height:s(100),width:s(100)}} source={require('../../assets/hand.png')}> */}
//       <View style={{flex: 5,justifyContent:"center",alignItems:"center"}}>
//         <Image
//           style={{
//             height: s(400),
//             width: s(400),
//             resizeMode: 'contain',
//             marginTop:s(300),
//             marginLeft:s(100)
//           }}
//           source={require('../../assets/hand.png')}
//         />
//       </View>
//       <View style={{padding: s(20)}}>
//         <Image
//           source={require('../../assets/Text.png')}
//           style={{height: s(300), width: s(250), resizeMode: 'contain'}}
//         />
//         <Text style={styles.description}>
//           Simply the process of estimating rental values for properties
//         </Text>
//       </View>
//       {/* <View style={{padding: 100}}>
//         <Image
//           source={require('../../assets/html.png')}
//           style={styles.imageStyle}
//         />
//       </View> */}
//       {/* <View style={{padding: 20, flex: 1}}>
//         <Text style={styles.welcomeText}>
//           Welcome {'\n'}to Rent {'\n'}Calculator
//         </Text>
//         <Text style={styles.description}>
//           Simply the process of estimating rental values for properties
//         </Text>
//       </View> */}
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('Calculator');
//         }}
//         style={{
//           justifyContent: 'center',
//           flexDirection: 'row',
//           alignItems: 'center',
//           alignContent: 'center',
//           marginBottom: '10%',
//         }}>
//         <Text style={styles.getStarted}>Get Started !</Text>
//         <View
//           style={{
//             borderRadius: s(60),
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderWidth: s(1),
//             borderColor: '#5e74f1',
//             padding: s(10),
//             marginLeft: s(15),
//           }}>
//           <View
//             style={{
//               borderRadius: s(60),
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderWidth: s(1),
//               borderColor: '#7a89ee',
//               // padding: s(10),
//               backgroundColor:"#7a89ee"
//             }}>
//               <Image
//               source={require('../../assets/arrowRight.png')}
//               style={{height: s(50), width: s(50)}}
//             />
//           </View>
//         </View>
//       </TouchableOpacity>
//       {/* </ImageBackground> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   welcomeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: s(35),
//   },
//   description: {
//     color: '#fff',
//     fontSize: s(18),
//     bottom:s(30)
//   },
//   getStarted: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: s(24),
//     alignSelf: 'center',
//   },
//   imageStyle: {
//     height: s(200),
//     width: s(200),
//     alignSelf: 'center',
//   },
// });

// export default Landing;
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {useTheme, Button} from 'react-native-paper';
import {s} from './utils/scale';
// import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

function Landing({navigation}) {
  const {colors} = useTheme();

  return (
    <View style={[styles.mainContainer, {backgroundColor: '#fff'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#8dc0ff" />
      <View style={{flex: 5}}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            borderBottomRightRadius: s(30),
            borderBottomLeftRadius: s(30),
          }}
          source={require('../../assets/BG_01.jpg')}
        />
      </View>
      <View style={{flex: 5, justifyContent: 'space-around'}}>
        {/* <Text
          style={{
            color: '#030303',
            fontWeight: '700',
            fontSize: s(32),
            textAlign: 'center',
          }}>
          Welcome to{'\n'}Rent Calculator
        </Text> */}
        <Image
          source={require('../../assets/wtext.png')}
          style={{height: s(100), width: s(250), resizeMode:"contain",alignSelf:"center",marginTop:s(20)}}
        />
        <Text style={styles.description}>
          Simplify the process of estimating {'\n'}rental values for properties{' '}
        </Text>
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Calculator');
            }}>
        <LinearGradient
          colors={[colors.PBG1, colors.PBG2]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            borderRadius: s(60),
            minWidth: '35%',
            padding:s(10)
          }}>
      
            <Text style={{color: '#fff', fontSize: s(14), fontWeight: '500'}}>
              Let's start
            </Text>
        </LinearGradient>
          </TouchableOpacity>

        <View>
          <Text> </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  welcomeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: s(35),
  },
  description: {
    color: '#030303',
    fontSize: s(18),
    textAlign: 'center',
    bottom:s(30)
  },
  getStarted: {
    color: '#fff',
    fontWeight: '700',
    fontSize: s(24),
    alignSelf: 'center',
  },
  imageStyle: {
    height: s(200),
    width: s(200),
    alignSelf: 'center',
  },
});

export default Landing;
