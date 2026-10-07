import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/theme';

interface ThemedButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    type?: 'primary' | 'secondary';
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({title, onPress, style, textStyle, type = 'primary' }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles[type],
                style
            ]}
        >
            <Text style={[styles[type], textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primary: {
        width: '100%',
        padding: 8,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'Inter'
    },
    secondary: {
        width: '100%',
        backgroundColor: Colors.light.surface2,
        padding: 7,
        borderRadius: 14,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color: Colors.light.ink,
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'Inter'
    }
});