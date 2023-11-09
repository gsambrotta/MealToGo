declare module 'react-native-credit-card-input' {
    import { StyleProp, ViewStyle } from 'react-native';
  
    interface CreditCardInputProps {
      containerStyle?: StyleProp<ViewStyle>;
      inputContainerStyle?: StyleProp<ViewStyle>;
      labelStyle?: StyleProp<ViewStyle>;
      inputStyle?: StyleProp<ViewStyle>;
      validColor?: string;
      invalidColor?: string;
      placeholderColor?: string;
      allowScroll?: boolean;
      onFocus?: () => void;
      onChange?: (formData: CreditCardFormData) => void;
    }
  
    export default class CreditCardInput extends React.Component<CreditCardInputProps> {}
  }
  