import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #282a36;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #44475a;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#6272a4',
})`
  flex: 1;
  height: 40px;
  background: #44475a;
  border-radius: 4px;
  padding: 0 15px;
  border: ${(props) =>
    props.error ? '1px solid #ff5555' : '1px solid #44475a'};
  color: #f8f8f2;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #6272a4;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #eee;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #ff79c6;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #8be9fd;
  margin-top: 5px;
  text-align: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const DeleteButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #ff5555;
  border-radius: 4px;
  height: 36px;
  width: 36px;
  margin-left: 5px;
`;

export const ProfileButton = styled(RectButton)`
  flex: 1;
  align-self: stretch;
  border-radius: 4px;
  background: #bd93f9;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
