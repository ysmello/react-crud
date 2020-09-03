import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  ul {
    width: 300px;
    height: auto;
    background-color: #f8f8f8;
    list-style: none;
    border-radius: 5px;

    li {
      color: #333;
    }
  }
`;
