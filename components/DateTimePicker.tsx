import { Platform } from "react-native"
import { Hstack } from "./HStack"
import Text from "./Text"
import CustomButton from "./Button"
import React from "react"
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


interface DateTimePickerProps{
    onChange: (value: Date) => void
    currentDate: Date
}

export default function DateTimePicker(props :DateTimePickerProps){
    if (Platform.OS === "android") {
        return  <AndroidDateTimePicker {...props} />
    }

    if (Platform.OS === "ios") {
        return  <IOSDateTimePicker {...props} />
    }

    return null
}

export function AndroidDateTimePicker({onChange, currentDate}: DateTimePickerProps){
    const showDatepicker = () => {
        DateTimePickerAndroid.open({
          value: currentDate,
          onChange: (_, date?: Date) => onChange(date || new Date()),
          mode: "date",
        });
      };
    return (
        <Hstack p={10} alignItems="center" justifyContent="space-between">
            <Text>{currentDate.toLocaleDateString()}</Text>
            <CustomButton variant="outlined" onPress={showDatepicker}>Open calendar</CustomButton>
        </Hstack>
    )

}

export const IOSDateTimePicker = ({ onChange, currentDate }: DateTimePickerProps) => {
    return (
      <RNDateTimePicker
        style={ { alignSelf: "flex-start" } }
        accentColor='black'
        minimumDate={ new Date() }
        value={ currentDate }
        mode={ "date" }
        display='default'
        onChange={ (_, date) => onChange(date || new Date()) }
      />
    )
  }