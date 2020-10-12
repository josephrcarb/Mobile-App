
import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';

export const AppButton = ({btnTitle, btnBgColor, textColor, btnPress})=>(
    <TouchableOpacity style={
                {
                    backgroundColor: btnBgColor, 
                    borderRadius:10,
                    borderWidth: 2,
                    borderColor: 'white',
                    height:40, 
                    width: Dimensions.get('window').width/2,
                    marginTop: 250,
                    alignItems: 'center',
                    justifyContent: 'center'
                }} 
        onPress={btnPress}>
        <Text style={{  color:textColor}}>
            {btnTitle}
        </Text>
    </TouchableOpacity>
)
