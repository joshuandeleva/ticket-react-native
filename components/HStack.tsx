import { Stack, StackProps } from "./Stack"

interface HstackProps extends StackProps{}
export function Hstack (props:HstackProps){
    return <Stack {...props} direction="row"/>
}