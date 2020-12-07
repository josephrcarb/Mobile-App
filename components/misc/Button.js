import React from 'react';
import { Text,TouchableOpacity, Dimensions } from 'react-native';


export const AppButton = ({btnTitle, btnBgColor, textColor, btnPress, btnWidth})=>(
    <TouchableOpacity style={
                {
                    backgroundColor: btnBgColor, 
                    borderRadius:10,
                    borderWidth: 2,
                    borderColor: 'white',
                    height:40, 
                    width: btnWidth,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} 
        onPress={btnPress}>
        <Text style={{  color:textColor, fontWeight: 'bold'}}>
            {btnTitle}
        </Text>
    </TouchableOpacity>
)
