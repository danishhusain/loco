// import React from 'react';
// import { Image } from 'react-native';
// import { moderateScale } from '../styles/responsiveSize';

// const RoundImg = (props) => {
//     const { img, size = 64, bgColor, style,key } = props;
//     return (
//         <Image
//             style={{
//                 width: moderateScale(size),
//                 height: moderateScale(size),
//                 borderRadius: moderateScale(size / 2),
//                 backgroundColor: bgColor,
//                 ...(style || {})
//             }}
            
//             source={{ uri: img }}
//             // source={img}
//         />
//     );
// };

// export default RoundImg;


import React from 'react';
import { Image } from 'react-native';
import { moderateScale } from '../styles/responsiveSize';
import ImagePath from '../constants/ImagePath';

const RoundImg = (props) => {
    const { img, size = 64, bgColor, style } = props;

    // Use a placeholder image if 'img' prop is not provided
    const imageSource = img ? { uri: img } : ImagePath.JennyWilson;

    return (
        <Image
            style={{
                width: moderateScale(size),
                height: moderateScale(size),
                borderRadius: moderateScale(size / 2),
                backgroundColor: bgColor,
                ...(style || {}),
            }}
            source={imageSource}
        />
    );
};

export default RoundImg;
