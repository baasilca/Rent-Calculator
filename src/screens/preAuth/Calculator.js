import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {useTheme, Modal, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {CalculatorDatas} from '../../dummyJson';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {s} from './utils/scale';
import LinearGradient from 'react-native-linear-gradient';

function Calculator({navigation}) {
  const flatListRef = useRef(null);
  const {colors} = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showComponentsModal, setShowComponentsModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [total, setTotal] = useState(0);
  const [takeCopy, setTakeCopy] = useState({});
  const [loaded, setloaded] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    location: 280,
    area: 280,
    quality: 0,
    age: 0,
    Component: {
      bedroom: {
        count: 2,
        value: 0,
      },
      bathroom: {
        count: 2,
        value: 0,
      },
      maidroom: {
        count: 0,
        value: 0,
      },
      livingroom: 1,
      kitchen: 1,
    },
    security: {
      // parking: (3.5 / 100) * 280,
      parking: 0,
      security: 0,
      swimmingpool: 0,
      gym: 0,
    },
  });

  useEffect(() => {
    setTotal(
      selectedValues.area +
        (selectedValues.quality / 100) * selectedValues.area -
        (selectedValues.age / 100) * selectedValues.area +
        selectedValues.Component.bedroom.value +
        selectedValues?.Component?.bathroom.value +
        selectedValues?.Component?.maidroom.value +
        selectedValues?.security?.parking +
        selectedValues?.security?.security +
        selectedValues?.security?.swimmingpool +
        selectedValues?.security?.gym,
    );
  }, [selectedValues]);

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      index: selectedIndex,
      viewPosition: 0.5, // 0 is the start, 0.5 is the center, and 1 is the end
      animated: true,
    });
  }, [selectedIndex]);

  useEffect(() => {
    setTimeout(() => {
      setloaded(true);
    }, 100);
  }, []);

  const getColor = value => {
    if (selectedIndex == 0 && value == selectedValues.location) {
      return colors.primary;
    } else if (selectedIndex == 1 && value == selectedValues.area) {
      return colors.primary;
    } else if (selectedIndex == 2 && value == selectedValues.quality) {
      return colors.primary;
    } else if (selectedIndex == 3 && value == selectedValues.age) {
      return colors.primary;
    } else {
      return '0';
    }
  };

  const checkedOrNot = index => {
    if (index == 0) {
      console.log('[][][][][', selectedValues.security.parking);
      return selectedValues.security.parking != 0 ? true : false;
    } else if (index == 1) {
      return selectedValues.security.security != 0 ? true : false;
    } else if (index == 2) {
      return selectedValues.security.swimmingpool != 0 ? true : false;
    } else if (index == 3) {
      return selectedValues.security.gym != 0 ? true : false;
    }
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: '#fff'}]}>
      <StatusBar barStyle="light-content" backgroundColor="#d1d0e7" />
      <LinearGradient
        colors={[colors.BG1, colors.BG2]}
        style={{
          flex: 5,
          borderBottomRightRadius: s(20),
          borderBottomLeftRadius: s(20),
        }}>
        <View style={{padding: s(10),marginLeft:s(10)}}>
          <Text style={styles.title}>Your Rent Value</Text>
          <Text style={styles.amount}>KD {total.toFixed(3)}</Text>
          <TouchableOpacity
            onPress={() => {
              if (selectedIndex < CalculatorDatas?.length - 1) {
                setSelectedIndex(selectedIndex + 1);
              } else {
                setSelectedIndex(0);
              }
            }}
            style={{
              flexDirection: 'row',
              marginTop: s(20),
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: s(20), fontWeight: '500', color: '#030303'}}>
              SELECT PREFERENCES{' '}
            </Text>
            <Image
              source={require('../../assets/rightArrow.png')}
              style={{height: s(20), width: s(20), marginLeft: s(100)}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          style={{marginTop: s(20)}}
          data={CalculatorDatas}
          keyExtractor={item => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <LinearGradient
              colors={[
                selectedIndex == index ? colors.PCG1 : colors.SCG1,
                selectedIndex == index ? colors.PCG2 : colors.SCG2,
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: s(122),
                margin: s(10),
                borderRadius: s(10),
                // backgroundColor:
                //   selectedIndex == index ? colors.primary : colors.secondary,
                padding: s(10),
                minWidth: s(200),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(index);
                }}
                style={{top: s(-10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: '400', fontSize: s(16)}}>
                    STEP {item?.step}
                  </Text>
                  <Image
                    source={item.icon}
                    style={[
                      {height: s(50), width: s(90)},
                      index == 5 ? {top: s(15)} : {top: s(10)},
                    ]}
                  />
                </View>
                <Image
                  source={require('../../assets/barcode.png')}
                  style={{height: s(20), width: s(85), right: 14}}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    fontSize: s(20),
                    marginTop: s(10),
                  }}>
                  {item?.title} {item?.subtitle}
                </Text>

                {/* <View style={{marginLeft: s(10), marginRight: s(10)}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: s(24),
                      }}>
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: s(24),
                      }}>
                      {item?.subtitle}
                    </Text>
                  </View> */}
              </TouchableOpacity>
            </LinearGradient>
          )}
        />
      </LinearGradient>
      <View
        style={{
          flex: 5,
          backgroundColor: '#fff',
        }}>
        <View style={{padding: s(20), minHeight: s(140)}}>
          <Text
            style={{
              color: '#030303',
              textAlign: 'center',
              fontWeight: '400',
              fontSize: s(16),
              alignSelf: 'center',
            }}>
            {CalculatorDatas?.[selectedIndex].description}
          </Text>
        </View>

        <View style={{padding: s(10), flex: 1}}>
          {CalculatorDatas?.[selectedIndex]?.popUp ? (
            <LinearGradient
              colors={[colors.PBG1, colors.PBG2]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                padding: s(8),
                backgroundColor: colors.primary,
                borderRadius: s(22),
                margin: s(2),
                alignSelf: 'center',
                height: s(36),
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: s(250),
                elevation: 4,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setTakeCopy(selectedValues);
                  if (
                    CalculatorDatas?.[selectedIndex]?.subtitle == 'Components'
                  ) {
                    setShowComponentsModal(true);
                  }
                  if (
                    CalculatorDatas?.[selectedIndex]?.subtitle == 'Amenities'
                  ) {
                    setShowAmenitiesModal(true);
                  }
                }}>
                <Text
                  style={{
                    color: '#fff',
                    alignSelf: 'center',
                    fontWeight: '500',
                    fontSize: s(14),
                  }}>
                  CLICK HERE TO CONFIGURE
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <View
              style={{
                // backgroundColor: '#fff',
                // borderRadius: s(51),
                // padding: s(4),
                width: '100%',
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
                style={
                  {
                    // backgroundColor: '#fff',
                    // borderRadius: s(51),
                    // padding: s(4),
                    // width: '100%',
                  }
                }>
                {CalculatorDatas?.[selectedIndex]?.values?.map(
                  (item, index) => {
                    return (
                      <LinearGradient
                        colors={[
                          getColor(item.value) != '0'
                            ? colors.PBG1
                            : colors.SBG1,
                          getColor(item.value) != '0'
                            ? colors.PBG2
                            : colors.SBG2,
                        ]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          // padding: s(15),
                          // backgroundColor: getColor(item.value),
                          borderRadius: s(22),
                          minWidth: s(110),
                          height: s(36),
                          margin: s(8),
                          opacity:!loaded? 0 :10,
                          justifyContent: 'center',
                          elevation:
                            getColor(item.value) != '0' || !loaded ? 4 : 0,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setForceRefresh(!forceRefresh);
                            if (selectedIndex == 0) {
                            } else if (selectedIndex == 1) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                area: item.value,
                                Component: {
                                  ...prevValues.Component,
                                  bedroom: {
                                    ...prevValues.Component.bedroom,
                                    count: index == 2 ? 3 : 2,
                                  },
                                  bathroom: {
                                    ...prevValues.Component.bathroom,
                                    count: index == 2 ? 3 : 2,
                                  },
                                  maidroom: {
                                    ...prevValues.Component.maidroom,
                                    count: 0,
                                  },
                                },
                              }));
                            } else if (selectedIndex == 2) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                quality: item.value,
                              }));
                            } else if (selectedIndex == 3) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                age: item.value,
                              }));
                            }
                          }}
                          disabled={selectedIndex == 0}
                          key={item.label} // Make sure to use a unique key
                        >
                          <Text
                            style={{
                              color: '#fff',
                              alignSelf: 'center',
                              fontWeight: '500',
                              fontSize: s(14),
                            }}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    );
                  },
                )}
              </ScrollView>
            </View>
          )}
          {CalculatorDatas?.[selectedIndex]?.buttonLabel?.length ? (
            <LinearGradient
              colors={[colors.PBG1, colors.PBG2]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[
                {
                  backgroundColor: colors.primary,
                  alignSelf: 'flex-end',
                  padding: s(5),
                  borderRadius: s(5),
                  marginTop: s(20),
                  height: s(36),
                  borderRadius: s(30),
                  marginRight: s(20),
                  justifyContent: 'center',
                },
                // !selected?.buttonLabel && {opacity: 0},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(selectedIndex + 1);
                }}
                style={[
                  {
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  // !selected?.buttonLabel && {opacity: 0},
                ]}>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: s(10),
                    marginRight: s(-20),
                    fontSize: s(14),
                  }}>
                  {CalculatorDatas?.[selectedIndex]?.buttonLabel}
                </Text>
                <Image
                  source={require('../../assets/rightArrow.png')}
                  style={{
                    height: s(21),
                    width: s(21),
                    marginLeft: s(30),
                    marginRight: s(5),
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <View style={{minHeight: s(40)}} />
          )}
          {/* </TouchableOpacity> */}
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            padding: s(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: s(4),
            borderTopRightRadius: s(60),
            borderTopLeftRadius: s(60),
            borderColor: '#ededed',
            top: s(10),
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedIndex(0);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: s(20),
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: s(14),
                color: '#c6c6c6',
                marginLeft: s(5),
              }}>
              HOME
            </Text>
            <Image
              source={require('../../assets/home.png')}
              style={{
                height: s(67),
                width: s(60),
                tintColor: '#c6c6c6',
                // marginLeft: s(10),
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedIndex(CalculatorDatas?.length - 1);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: s(20),
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: s(14),
                color: '#c6c6c6',
                // marginRight: s(10),
              }}>
              LAST STEP
            </Text>
            <Image
              source={require('../../assets/toggle.png')}
              style={{height: s(67), width: s(60), tintColor: '#c6c6c6'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modal visible={showComponentsModal}>
          <LinearGradient
            colors={[colors.BG1, '#f6f6f6']}
            style={{
              // backgroundColor: '#f7f5ff',
              // height: s(700),
              height: '100%',
              // margin: s(10),
            }}>
            <View
              style={{
                padding: s(20),
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: s(5),
                }}>
                <Text
                  style={{
                    color: '#030303',
                    marginBottom: s(20),
                    fontWeight: '400',
                    fontSize: s(18),
                  }}>
                  CONFIGURE YOUR APARTMENT{'\n'}PREFERENCES.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedValues(takeCopy);
                    setShowComponentsModal(false);
                  }}>
                  <Image
                    source={require('../../assets/close.png')}
                    style={{
                      height: s(25),
                      width: s(25),
                      marginLeft: s(20),
                      tintColor: 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                {CalculatorDatas?.[selectedIndex]?.values?.map(
                  (item, index) => {
                    return (
                      <View
                        key={item.label} // Make sure to use a unique key
                        style={{
                          // padding: s(1),
                          backgroundColor: '#f0f1fa',
                          borderRadius: s(10),
                          margin: s(7),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          elevation: 4,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={item.icon}
                            style={[
                              {
                                height: s(80),
                                width: s(90),
                                resizeMode: 'contain',
                              },
                              index == 3 && {marginLeft: s(-5)},
                            ]}
                          />
                          <Text
                            style={[
                              {
                                color: '#9d9d9c',
                                alignSelf: 'center',
                                fontWeight: '500',
                                fontSize: s(18),
                                // marginLeft: s(20),
                                width: s(140),
                              },
                              index == 3 && {marginLeft: s(5)},
                            ]}>
                            {item.label}
                          </Text>
                        </View>

                        {index !== 3 && index !== 4 ? (
                          <>
                            <LinearGradient
                              colors={[colors.PBG1, colors.PBG2]}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={{
                                height: s(30),
                                width: s(30),
                                justifyContent: 'center',
                                marginLeft: s(-50),
                                backgroundColor: 'blue',
                                borderRadius: 30,
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  // marginBottom: s(5),
                                  // marginLeft: s(5),
                                  color: '#fff',
                                  fontWeight: 'bold',
                                }}>
                                0
                                {index == 0
                                  ? selectedValues?.Component?.bedroom?.count
                                  : index == 1
                                  ? selectedValues?.Component?.bathroom?.count
                                  : index == 2
                                  ? selectedValues?.Component?.maidroom?.count
                                  : index == 3
                                  ? selectedValues?.Component?.livingroom?.count
                                  : index == 2
                                  ? selectedValues?.Component?.kitchen?.count
                                  : 0}
                              </Text>
                            </LinearGradient>
                            <View style={{right: s(20), top: s(5)}}>
                              <Icon
                                name="plus"
                                size={s(20)}
                                color="#9d9d9c"
                                style={{bottom: s(5)}}
                                onPress={() => {
                                  if (
                                    index == 0 &&
                                    selectedValues?.Component?.bedroom.count <
                                      (selectedValues.area == 309 ? 3 : 2)
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        bedroom: {
                                          count:
                                            prevValues.Component.bedroom.count +
                                            1,
                                          value:
                                            (((prevValues.Component.bedroom
                                              .count -
                                              (selectedValues.area == 309
                                                ? 3
                                                : 2) +
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  } else if (
                                    index == 1 &&
                                    selectedValues?.Component?.bathroom.count <
                                      3
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        bathroom: {
                                          count:
                                            prevValues.Component.bathroom
                                              .count + 1,
                                          value:
                                            (((prevValues.Component.bathroom
                                              .count -
                                              (selectedValues.area == 309
                                                ? 3
                                                : 2) +
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  } else if (
                                    index == 2 &&
                                    (selectedValues.area == 309
                                      ? selectedValues?.Component?.maidroom
                                          .count < 1
                                      : false)
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        maidroom: {
                                          count:
                                            prevValues.Component.maidroom
                                              .count + 1,
                                          value:
                                            (((prevValues.Component.maidroom
                                              .count -
                                              1 +
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  }
                                }}
                              />
                              <Icon
                                name="minus"
                                size={s(20)}
                                color="#9d9d9c"
                                style={{top: s(5)}}
                                onPress={() => {
                                  if (
                                    index == 0 &&
                                    selectedValues?.Component?.bedroom.count >
                                      (selectedValues.area == 309 ? 2 : 1)
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        bedroom: {
                                          count:
                                            prevValues.Component.bedroom.count -
                                            1,
                                          value:
                                            (((prevValues.Component.bedroom
                                              .count -
                                              (selectedValues.area == 309
                                                ? 3
                                                : 2) -
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  } else if (
                                    index == 1 &&
                                    selectedValues?.Component?.bathroom.count >
                                      (selectedValues.area == 309 ? 2 : 1)
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        bathroom: {
                                          count:
                                            prevValues.Component.bathroom
                                              .count - 1,
                                          value:
                                            (((prevValues.Component.bathroom
                                              .count -
                                              (selectedValues.area == 309
                                                ? 3
                                                : 2) -
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  } else if (
                                    index == 2 &&
                                    selectedValues.Component.maidroom.count > 0
                                  ) {
                                    setSelectedValues(prevValues => ({
                                      ...prevValues,
                                      Component: {
                                        ...prevValues.Component,
                                        maidroom: {
                                          count:
                                            prevValues.Component.maidroom
                                              .count - 1,
                                          value:
                                            (((prevValues.Component.maidroom
                                              .count -
                                              1 -
                                              1) *
                                              item.value) /
                                              100) *
                                            selectedValues.area,
                                        },
                                      },
                                    }));
                                  }
                                }}
                              />
                            </View>
                          </>
                        ) : (
                          <>
                            <LinearGradient
                              colors={[colors.PBG1, colors.PBG2]}
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              style={{
                                height: s(30),
                                width: s(30),
                                justifyContent: 'center',
                                marginLeft: s(-50),
                                backgroundColor: 'blue',
                                borderRadius: 30,
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                }}>
                                01
                              </Text>
                            </LinearGradient>
                            <View style={{width: s(10)}} />
                          </>
                        )}
                      </View>
                    );
                  },
                )}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: s(20),
                }}>
                <LinearGradient
                  colors={[colors.PBG1, colors.PBG2]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    padding: s(5),
                    minWidth: s(120),
                    borderRadius: s(30),
                    elevation: 4,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedValues(takeCopy);
                      setShowComponentsModal(false);
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        alignSelf: 'center',
                        fontSize: s(18),
                      }}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <View style={{width: s(10)}} />
                <LinearGradient
                  colors={[colors.PBG1, colors.PBG2]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    padding: s(5),
                    minWidth: s(120),
                    borderRadius: s(30),
                    elevation: 4,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowComponentsModal(false);
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        alignSelf: 'center',
                        fontSize: s(18),
                      }}>
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#f6f6f6',
                padding: s(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: s(4),
                borderTopRightRadius: s(60),
                borderTopLeftRadius: s(60),
                borderColor: '#ededed',
                top: s(10),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(0);
                }}
                disabled={true}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: s(20),
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: s(14),
                    color: '#c6c6c6',
                    marginLeft: s(5),
                  }}>
                  HOME
                </Text>
                <Image
                  source={require('../../assets/home.png')}
                  style={{
                    height: s(67),
                    width: s(60),
                    tintColor: '#c6c6c6',
                    // marginLeft: s(10),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(CalculatorDatas?.length - 1);
                }}
                disabled={true}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: s(20),
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: s(14),
                    color: '#c6c6c6',
                    // marginRight: s(10),
                  }}>
                  LAST STEP
                </Text>
                <Image
                  source={require('../../assets/toggle.png')}
                  style={{height: s(60), width: s(60), tintColor: '#c6c6c6'}}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={showAmenitiesModal}
          //  onDismiss={hideModal}
          //  contentContainerStyle={containerStyle}
        >
          <LinearGradient
            colors={[colors.BG1, '#f6f6f6']}
            style={{
              // backgroundColor: '#f7f5ff',
              // height: s(700),
              height: '100%',
              // margin: s(10),
            }}>
            <View
              style={{
                padding: s(20),
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: s(5),
                }}>
                <Text
                  style={{
                    color: '#030303',
                    marginBottom: s(20),
                    fontWeight: '400',
                    fontSize: s(18),
                  }}>
                  CONFIGURE YOUR APARTMENT{'\n'}PREFERENCES.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedValues(takeCopy);
                    setShowAmenitiesModal(false);
                  }}>
                  <Image
                    source={require('../../assets/close.png')}
                    style={{
                      height: s(25),
                      width: s(25),
                      marginLeft: s(20),
                      tintColor: 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                {CalculatorDatas?.[selectedIndex]?.values?.map(
                  (item, index) => {
                    return (
                      <View
                        key={item.label} // Make sure to use a unique key
                        style={{
                          // padding: s(25),
                          backgroundColor: '#f0f1fa',
                          borderRadius: s(10),
                          margin: s(7),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          elevation: 4,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={item.icon}
                            style={{
                              height: s(80),
                              width: s(100),
                              marginLeft: s(-10),
                            }}
                          />
                          <Text
                            style={{
                              color: '#9d9d9c',
                              alignSelf: 'center',
                              fontWeight: '500',
                              fontSize: s(18),
                              marginLeft: s(-10),
                              width: s(140),
                            }}>
                            {item.label}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            if (index == 0) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                security: {
                                  ...prevValues.security,
                                  parking:
                                    selectedValues.security.parking == 0
                                      ? item.value
                                      : 0, // Set parking value to 3
                                },
                              }));
                            } else if (index == 1) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                security: {
                                  ...prevValues.security,
                                  security:
                                    selectedValues.security.security == 0
                                      ? (item.value / 100) * selectedValues.area
                                      : 0, // Set parking value to 3
                                },
                              }));
                            } else if (index == 2) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                security: {
                                  ...prevValues.security,
                                  swimmingpool:
                                    selectedValues.security.swimmingpool == 0
                                      ? (item.value / 100) * selectedValues.area
                                      : 0, // Set parking value to 3
                                },
                              }));
                            } else if (index == 3) {
                              setSelectedValues(prevValues => ({
                                ...prevValues,
                                security: {
                                  ...prevValues.security,
                                  gym:
                                    selectedValues.security.gym == 0
                                      ? (item.value / 100) * selectedValues.area
                                      : 0, // Set parking value to 3
                                },
                              }));
                            }
                          }}>
                          {checkedOrNot(index) ? (
                            <Image
                              source={require('../../assets/checked.png')}
                              style={{
                                height: s(30),
                                width: s(30),
                                marginRight: s(40),
                              }}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/unchecked.png')}
                              style={{
                                height: s(30),
                                width: s(30),
                                marginRight: s(40),
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  },
                )}
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: s(20),
                  }}>
                  <LinearGradient
                    colors={[colors.PBG1, colors.PBG2]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      padding: s(5),
                      minWidth: s(120),
                      borderRadius: s(30),
                      elevation: 4,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedValues(takeCopy);
                        setShowAmenitiesModal(false);
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          alignSelf: 'center',
                          fontSize: s(18),
                        }}>
                        CANCEL
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <View style={{width: s(10)}} />
                  <LinearGradient
                    colors={[colors.PBG1, colors.PBG2]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      padding: s(5),
                      minWidth: s(120),
                      borderRadius: s(30),
                      elevation: 4,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowAmenitiesModal(false);
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          alignSelf: 'center',
                          fontSize: s(18),
                        }}>
                        SAVE
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#f6f6f6',
                padding: s(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: s(4),
                borderTopRightRadius: s(60),
                borderTopLeftRadius: s(60),
                borderColor: '#ededed',
                top: s(10),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(0);
                }}
                disabled={true}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: s(20),
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: s(14),
                    color: '#c6c6c6',
                    marginLeft: s(5),
                  }}>
                  HOME
                </Text>
                <Image
                  source={require('../../assets/home.png')}
                  style={{
                    height: s(67),
                    width: s(60),
                    tintColor: '#c6c6c6',
                    // marginLeft: s(10),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(CalculatorDatas?.length - 1);
                }}
                disabled={true}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: s(20),
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: s(14),
                    color: '#c6c6c6',
                    // marginRight: s(10),
                  }}>
                  LAST STEP
                </Text>
                <Image
                  source={require('../../assets/toggle.png')}
                  style={{height: s(67), width: s(60), tintColor: '#c6c6c6'}}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    color: '#030303',
    fontWeight: '500',
    fontSize: s(20),
    marginTop: s(20),
  },
  amount: {
    color: '#030303',
    fontWeight: '700',
    fontSize: s(32),
    marginTop: s(20),
  },
});

export default Calculator;
