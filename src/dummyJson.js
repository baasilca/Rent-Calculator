export const CalculatorDatas = [
  {
    id: '1',
    step: '1',
    title: 'Select',
    popUp:false,
    subtitle: 'Location',
    icon: require('./assets/map.png'),
    description: `Select your property's location from our curated list of cities. This step ensures that your rent estimation is finely tuned to the unique dynamics of your area's rental market.`,
    values: [
      {
        label: 'SALMIYA',
        value: 280,
        id:1
      },
      {
        label: 'KHAITAN',
        value: 294,
        id:2
      },
      {
        label: 'HAWALI',
        value: 309,
        id:3
      },
    ],
    buttonLabel: "Let's Find Out",
  },
  {
    id: '2',
    step: '2',
    title: 'Property',
    popUp:false,
    subtitle: 'Area',
    icon: require('./assets/area.png'),
    description: `Select the size of your property in square meters to get a tailored rent estimation. Whether it's cozy or sprawling, Rent Calculator adjusts its calculations to match your property's footprint accurately.`,
    values: [
      {
        label: '60',
        value: 280,
        id:4
      },
      {
        label: '65',
        value: 294,
        id:5
      },
      {
        label: '70',
        value: 309,
        id:6
      },
    ],
    buttonLabel: "Ready To Roll",
  },
  {
    id: '3',
    step: '3',
    title: 'Construction',
    subtitle: 'Quality',
    popUp:false,
    icon: require('./assets/quality.png'),
    description: `Normal, Good, Premium, choose the construction quality that best represents your property. This selection ensures that your rent estimation reflects the premium features and finishes of your space.`,
    values: [
      {
        label: 'NORMAL',
        value: 0,
        id:8
      },
      {
        label: 'GOOD',
        value: 7,
        id:9
      },
      {
        label: 'PREMIUM',
        value: 10,
        id:10
      },
    ],
    buttonLabel: "Let's Enhance It!",
  },
  {
    id: '4',
    step: '4',
    title: 'Property',
    subtitle: 'Age',
    popUp:false,
    icon: require('./assets/age.png'),
    description: `Categorize your property's age to account. Rent Calculator adjusts its calculations based on the age range you select, providing an accurate reflection of your property's condition.`,
    values: [
      {
        label: '00 to 09',
        value: 0,
      },
      {
        label: '10 to 19',
        value: 6,
      },
      {
        label: '20 to 30',
        value: 10,
      },
    ],
    buttonLabel: "Continue the Journey!",
  },
  {
    id: '5',
    step: '5',
    title: 'Apartment',
    subtitle: 'Components',
    popUp:true,
    popUpTitle:"CONFIGURE YOUR APARTMENT PREFERENCES",
    icon: require('./assets/component.png'),
    description: `Customize the number of bedrooms, bathrooms, and maid rooms in your property to match its unique layout. Flexible adjustments ensure that your rent estimation aligns perfectly with your property's configuration.`,
    values: [
      {
        label: 'BEDROOM',
        value: 10,
        icon:require('./assets/bed.png')
      },
      {
        label: 'BATHROOM',
        value: 8,
        icon:require('./assets/bath.png')
      },
      {
        label: 'MAID ROOM',
        value: 5,
        icon:require('./assets/maid.png')
      },
      {
        label: 'LIVING ROOM',
        value: 0,
        icon:require('./assets/living.png')
      },
      {
        label: 'KITCHEN',
        value: 0,
        icon:require('./assets/kitchen.png')
      },
    ],
    buttonLabel: "Let's Get Personal!",
  },
  {
    id: '6',
    step: '6',
    title: 'Property',
    subtitle: 'Amenities',
    popUp:true,
    icon: require('./assets/amenities.png'),
    description: `Select desired amenities and services to enhance your property's appeal and value. From parking valet to fitness forge, Rent Calculator factors in these luxurious additions to provide a comprehensive rent estimation.`,
    values: [
      {
        label: 'PARKING',
        value: 3.5,
        icon:require('./assets/parking.png')
      },
      {
        label: 'SECURITY',
        value: 2,
        icon:require('./assets/security.png')
      },
      {
        label: 'SWIMMING POOL',
        value: 3,
        icon:require('./assets/pool.png')
      },
      {
        label: 'GYM',
        value: 3,
        icon:require('./assets/gym.png')
      },
    ],
  },
];
