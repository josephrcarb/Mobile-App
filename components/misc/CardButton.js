import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const CardButton = ({btnTitle, btnBgColor, textColor, btnPress, btnWidth})=>(
    <TouchableOpacity style={
                {
                    backgroundColor: btnBgColor, 
                    borderRadius:10,
                    borderWidth: 2,
                    borderColor: 'black',
                    height: 40, 
                    width: btnWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} 
        onPress={btnPress}>
        <Text style={{  color:textColor, fontWeight: 'bold'}}>
            {btnTitle}
        </Text>
    </TouchableOpacity>
)
