import CustomButton from "@/components/Button";
import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { ticketService } from "@/services/ticket";
import { useCameraPermissions, CameraType ,CameraView ,BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import { ActivityIndicator, Alert, Vibration } from "react-native";

export default function ScanTicketScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [scanningEnabled, setScanningEnabled] = useState(true);
    if (!permission) {
        return <Vstack flex={1} justifyContent='center' alignItems='center'>
            <ActivityIndicator size={"large"} />
        </Vstack>;
    }

    if (!permission.granted) {
        return (
            <Vstack gap={20} flex={1} justifyContent='center' alignItems='center'>
                <Text>Camera access is required to scan tickets.</Text>
                <CustomButton onPress={requestPermission}>Allow Camera Access</CustomButton>
            </Vstack>
        );
    }

    async function onBarcodeScanned({ data }: BarcodeScanningResult) {
        if (!scanningEnabled) return;
    
        try {
          Vibration.vibrate();
          setScanningEnabled(false);
    
          const [ticket, owner] = data.split(",");
          const ticketId = parseInt(ticket.split(":")[1]);
          const ownerId = parseInt(owner.split(":")[1]);
    
          await ticketService.ValidateOne(ticketId, ownerId);
    
          Alert.alert('Success', "Ticket validated successfully.", [
            { text: 'Ok', onPress: () => setScanningEnabled(true) },
          ]);
    
        } catch (error) {
          Alert.alert('Error', "Failed to validate ticket. Please try again.");
          setScanningEnabled(true);
        }
      }

    return (
        <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={onBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
    )
}
