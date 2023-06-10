import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackArrowIcon from '../../../assets/icons/back-arrow.svg';

const SafetyHeader = () => {
  const navigate = useNavigate();

  const handleMoveHome = () => {
    navigate('/');
  };

  return (
    <StyledHeader>
      <button onClick={handleMoveHome}>
        <img src={BackArrowIcon} alt='뒤로가기' />
      </button>
      <p>알림</p>
    </StyledHeader>
  );
};

export default SafetyHeader;

const StyledHeader = styled.div`
  position: relative;
  height: 50px;
  width: 100%;

  & > p {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.125rem;
    font-weight: 600;
  }

  & > button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 13px;
    padding: 0;
    background: none;
    border: none;
    transform: translateY(-50%);
  }
`;
