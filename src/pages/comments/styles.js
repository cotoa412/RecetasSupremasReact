import { ColorPropType } from 'react-native';
import styled from 'styled-components/native';

export const Post = styled.View`
  margin-top: 10px;
`;

export const Header = styled.View`
    padding-top: 5px;
    padding-bottom: 15px;
    padding-left: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 35px;
    height 32px;
    padding-top: 9%
    border-radius: 16px;
    margin-right: 10px;
`;

export const Name = styled.Text`
    color: #333;
    font-weight: bold;
`;

export const Image = styled.Image`
    width: 100%;
    padding-top: 75%
`;

export const Description = styled.Text`
    padding: 10px;
    line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'small',
    color: '999',
})`
 margin: 30px 0;
`;