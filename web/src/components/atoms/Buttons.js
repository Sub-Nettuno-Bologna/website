import styled from 'styled-components';

export const PlainButton = styled.button`
  line-height: 1;
  border: 0;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  text-align: left;
  font-size: 1em;
  font-family: 'Montserrat', sans-serif;
`;

export const ButtonAsLink = styled(PlainButton)`
  color: ${p => p.theme.blue};
`;

export const PrimaryButton = styled(PlainButton)`
  margin: 0.2em 0;
  background: ${p => p.theme.black};
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  color: #ffffff;
  padding: 0.625em 0.4375em;
  font-size: 1em;
  padding: 0.5em;
  cursor: pointer;
`;
