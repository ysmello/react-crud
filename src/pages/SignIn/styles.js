import styled from 'styled-components';

export const Container = styled.section`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 400px;
  background: #f8f8f8;
  border-radius: 6px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  place-content: center;
  padding: 20px;
  text-align: center;

  h1 {
    color: #333;
    margin-bottom: 20px;
  }

  div {
    margin-bottom: 10px;
  }
`;
