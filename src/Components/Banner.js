import { View, Text } from 'react-native'
import React from 'react'
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import { useTheme } from '@react-navigation/native';
import { height, scale, width } from '../styles/responsiveSize';


const Banner = () => {
  const theme = useTheme().colors;
  // height: scale(200)
  return (
    <View style={{ backgroundColor: 'red', height: scale(200) ,marginHorizontal:scale(10)}}>
      <ImageSlider
        data={[
          { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU' },
          { img: 'https://img.freepik.com/free-photo/young-woman-purple-soft-cozy-sweater-with-gift-voucher_343596-7730.jpg?w=996&t=st=1673031936~exp=1673032536~hmac=5a54b125012851676365cc213fb70f7356bf0097d76132d6120e9da8a88d1454' },
          { img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg' },
          { img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' },
          { img: 'https://img.freepik.com/free-vector/gradient-indian-restaurant-sale-banner_23-2149440854.jpg?w=996&t=st=1699436461~exp=1699437061~hmac=318b3b5953ae8133ae0ec1f93c5737852d51e0912c4b39b26a3deb6d0059ce0d' }
        ]}
        // autoPlay={true}
        // onItemChanged={(item) => console.log("item", item)}
        // closeIconColor="#fff"
        closeIconColor={theme.commonWhite}
        // onClick={() => console.log("Pressed on banner")}
        caroselImageContainerStyle={{ backgroundColor: 'green', justifyContent: 'center', alignSelf: 'center', height: '100%' }}
        showIndicator={false}
        preview={false}
        caroselImageStyle={{ resizeMode: 'contain' }}

      />

    </View>
  )
}

export default Banner