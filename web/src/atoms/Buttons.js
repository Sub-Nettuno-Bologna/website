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
  color: ${(p) => p.theme.blue};
`;
