import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackArrowIcon from '../../../assets/icons/back-arrow.svg';

type Props = { title: string };

const PageHeader = ({ title }: Props) => {
  const navigate = useNavigate();

  const handleMoveHome = () => {
    navigate('/');
  };

  return (
    <StyledHeader>
      <button onClick={handleMoveHome}>
        <img src={BackArrowIcon} alt='뒤로가기' />
      </button>
      <p>{title}</p>
    </StyledHeader>
  );
};

export default PageHeader;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: #fff;

  & > p {
    margin: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }

  & > button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 7px 0 10px;
    background: none;
    border: none;
  }
`;
