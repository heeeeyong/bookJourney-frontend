import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 393px;
  height: 855px;
  display: flex;
  flex-direction: column;
  background: #f6f7f9;
  box-sizing: border-box;
  padding-top: 178px;

  * {
    outline: none; /* 기본 포커스 스타일 제거 */
    &:focus {
      outline: none; /* 포커스 상태에서도 기본 포커스 스타일 제거 */
    }
  }

  .buttoncontainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }

  .name {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 40px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: var(--Label-Small-Line-Height, 16px); /* 114.286% */
    letter-spacing: var(--Label-Small-Tracking, 0.5px);

    .countcontainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0px 22px;
      gap: 13px;

      .label {
        color: #000;
        text-align: center;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: var(--Label-Small-Line-Height, 16px); /* 114.286% */
        letter-spacing: var(--Label-Small-Tracking, 0.5px);
      }

      .count {
        color: #a3a3a3;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: var(--Label-Small-Line-Height, 16px); /* 114.286% */
        letter-spacing: var(--Label-Small-Tracking, 0.5px);
      }
    }

    input {
      border: none;
      width: 342px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 8.361px;
      background: #fff;
      margin: auto;
      padding-left: 11px;
      color: #88909b;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: var(--Label-Medium-Line-Height, 16px); /* 114.286% */
      letter-spacing: var(--Label-Medium-Tracking, 0.5px);
    }
  }

  .detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 49px;

    .section-title {
      margin-left: 22px;
      color: #000;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: var(--Label-Small-Line-Height, 16px); /* 114.286% */
      letter-spacing: var(--Label-Small-Tracking, 0.5px);
    }

    .duration {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .date-input {
        display: flex;
        align-items: center;
        gap: 8px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0px 22px;

        .label {
          color: #000;
          font-family: Pretendard;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: var(--Label-Small-Line-Height, 16px); /* 123.077% */
          letter-spacing: var(--Label-Small-Tracking, 0.5px);
        }

        .inputWrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          gap: 12px;

          input {
            border: none;
            width: 108px;
            height: 36px;
            flex-shrink: 0;
            border-radius: 8.361px;
            background: #fff;

            color: #a3a3a3;
            text-align: center;
            font-family: Pretendard;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: var(--Label-Small-Line-Height, 16px); /* 123.077% */
            letter-spacing: var(--Label-Small-Tracking, 0.5px);
          }

          .separator {
            color: #000;
            text-align: center;
            font-family: Pretendard;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: var(--Label-Small-Line-Height, 16px); /* 123.077% */
            letter-spacing: var(--Label-Small-Tracking, 0.5px);
          }
        }
      }
    }

    .num {
      display: flex;
      flex-direction: column;
      gap: 8px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0px 22px;

      .label {
        color: #000;
        font-family: Pretendard;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: var(--Label-Small-Line-Height, 16px); /* 123.077% */
        letter-spacing: var(--Label-Small-Tracking, 0.5px);
      }

      input {
        border: none;
        width: 108px;
        height: 36px;
        flex-shrink: 0;
        border-radius: 8.361px;
        background: #fff;

        color: #a3a3a3;
        text-align: center;
        font-family: Pretendard;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: var(--Label-Small-Line-Height, 16px); /* 123.077% */
        letter-spacing: var(--Label-Small-Tracking, 0.5px);
      }
    }
  }

  .password {
    display: flex;
    flex-direction: column;
    gap: 13px;
    padding-top: 52px;
    padding-bottom: 132px;

    .label {
      margin-left: 22px;
      color: #000;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: var(--Label-Small-Line-Height, 16px); /* 114.286% */
      letter-spacing: var(--Label-Small-Tracking, 0.5px);
    }

    input {
      border: none;
      width: 342px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 8.361px;
      background: #fff;
      margin: auto;

      color: #88909b;
      padding-left: 11px;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: var(--Label-Medium-Line-Height, 16px); /* 114.286% */
      letter-spacing: var(--Label-Medium-Tracking, 0.5px);
    }
  }
`;

export const Button = styled.button`
  width: 152px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 9px;
  border: 1px solid #6aa5f8;
  background: #f6f7f9;

  div {
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.1px;
  }

  &:hover {
    background: #e6f0ff;
  }
`;
