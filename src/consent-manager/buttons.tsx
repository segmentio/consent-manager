import styled, { css } from 'react-emotion'

const baseStyles = css`
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  color: inherit;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: box-shadow 80ms ease-in-out;
`

export const DefaultButton = styled('button')`
  ${baseStyles};
  margin-right: 8px;
  background-color: #fff;
  background-image: linear-gradient(to top, rgba(67, 90, 111, 0.041), rgba(255, 255, 255, 0.041));
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.146), inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  &:hover {
    background-image: linear-gradient(to top, rgba(67, 90, 111, 0.057), rgba(67, 90, 111, 0.025));
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.255),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.114);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(1, 108, 209, 0.146), inset 0 0 0 1px rgba(67, 90, 111, 0.38),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  }
  &:active {
    background: rgba(1, 108, 209, 0.079);
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.146),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.079);
  }
`

export const GreenButton = styled('button')`
  ${baseStyles};
  background-color: #47b881;
  background-image: linear-gradient(to top, #3faf77, #47b881);
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.204), inset 0 -1px 1px 0 rgba(67, 90, 111, 0.204);
  color: #fff;
  &:hover {
    background-image: linear-gradient(to top, #37a56d, #3faf77);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(71, 184, 129, 0.477), inset 0 0 0 1px rgba(71, 184, 129, 0.204),
      inset 0 -1px 1px 0 rgba(71, 184, 129, 0.204);
  }
  &:active {
    background-image: linear-gradient(to top, #2d9760, #248953);
    box-shadow: inset 0 0 0 1px rgba(71, 184, 129, 0.204),
      inset 0 -1px 1px 0 rgba(71, 184, 129, 0.204);
  }
`

export const RedButton = styled('button')`
  ${baseStyles};
  background-color: #f36331;
  background-image: linear-gradient(to top, #f4541d, #f36331);
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.204), inset 0 -1px 1px 0 rgba(67, 90, 111, 0.204);
  color: #fff;
  &:hover {
    background-image: linear-gradient(to top, #f4450a, #f4541d);
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(243, 99, 49, 0.477), inset 0 0 0 1px rgba(243, 99, 49, 0.204),
      inset 0 -1px 1px 0 rgba(243, 99, 49, 0.204);
  }
  &:active {
    background-image: linear-gradient(to top, #dd3c06, #c63403);
    box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.204),
      inset 0 -1px 1px 0 rgba(67, 90, 111, 0.204);
  }
`
