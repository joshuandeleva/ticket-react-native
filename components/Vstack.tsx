import { Stack, StackProps } from "./Stack"

interface VstackProps extends StackProps{}
export function Vstack (props:VstackProps){
    return <Stack {...props} direction="column"/>
}