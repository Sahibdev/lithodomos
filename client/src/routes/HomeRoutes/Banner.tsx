import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Banner = styled.div<{ img: string }>`
  height: 600px;
  max-height: 50vh;
  background-color: ${colors.secondaryBackground};
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
