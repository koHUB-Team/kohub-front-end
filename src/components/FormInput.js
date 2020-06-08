import React, { Component } from "react";
import "./FormInput.scss";
import Cleave from "cleave.js/react";
import { ValidateUtil } from "../common/kohubUtil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//****FormInput 컴포넌트****//
//props
//id : input 태그 id 선택자 값
//type(필수) : input 태그 type 속성 값 ex) text, email, 등등
//name(필수) : input 태그 name 속성 값
//placeholder : input 태그 placeholder 속성 값
//validOption(필수) : 유효성 검사 옵션 ex) title, name, nickname, email, date....
//onBlur : onBlur 이벤트 콜백함수
//onFocus : onFocus 이벤트 콜백함수
//onChange : onChange 이벤트 콜백함수
//selected : Datepicker에 설정할 초기 날짜 선택값, 사용하지 않을 경우 반드시 null을 전달해야함.

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.VALID_OPTION = {
      TITLE: "title",
      NAME: "name",
      NICKNAME: "nickname",
      EMAIL: "email",
      DATE: "date",
    };
  }

  //props인 selected로 state를 설정할 경우.
  //초기 렌더링 -> getDerivedStateFromProps -> componentDidMount -> 다시 렌더링 -> getDerivedStateFromProps 순서.
  //이 함수가 불릴 때마다 props로 전달한 값과 state값을 비교해 state값을 비교가능하다.
  //return 값은 갱신할 state.
  //반드시 사용하지 않을 경우 null을 전달해야 함. 안그러면 매번 불려서 오작동 일으킴.
  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.date && props.selected !== null) {
      return {
        date: props.selected,
      };
    }

    return null; //null은 state 갱신 x
  }

  getId() {
    let { id } = this.props;
    if (id !== undefined) {
      return id;
    }

    return "";
  }

  getType() {
    let { type } = this.props;
    if (type !== undefined) {
      return type;
    }

    return "";
  }

  getName() {
    let { name } = this.props;
    if (name !== undefined) {
      return name;
    }

    return "";
  }

  getPlaceholder() {
    let { placeholder } = this.props;
    if (placeholder !== undefined) {
      return placeholder;
    }

    return "";
  }

  getValue() {
    let { value } = this.props;
    if (value !== undefined) {
      return value;
    }

    return "";
  }

  getInput() {
    let type = this.getType();
    let name = this.getName();
    let placeholder = this.getPlaceholder();
    let value = this.getValue();

    let { validOption } = this.props;
    switch (validOption) {
      case this.VALID_OPTION.DATE:
        return (
          <DatePicker
            type={type}
            name={name}
            placeholder={placeholder}
            selected={this.state.date}
            onChange={this.onDateChange.bind(this)}
          />
        );
      case this.VALID_OPTION.TITLE:
        return (
          <Cleave
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={this.onBlurListener.bind(this)}
            onFocus={this.onFocusListener.bind(this)}
            onChange={this.onChangeListener.bind(this)}
            onSubmit={this.onSubmitListener.bind(this)}
            options={{ blocks: [99999], delimiter: "" }}
          ></Cleave>
        );
      default:
        return (
          <Cleave
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={this.onBlurListener.bind(this)}
            onFocus={this.onFocusListener.bind(this)}
            onChange={this.onChangeListener.bind(this)}
            onSubmit={this.onSubmitListener.bind(this)}
          ></Cleave>
        );
    }
  }

  onSubmitListener(e) {
    e.preventDefault();

    let { onSubmit } = this.props;
    if (onSubmit !== undefined) {
      onSubmit();
    }
  }

  onChangeListener(e) {
    //콜백함수가 있으면 실행.
    let { onChange } = this.props;
    if (onChange !== undefined) {
      onChange(e.target.value);
    }
  }

  onDateChange(newDate) {
    //콜백함수가 있으면 실행.
    let { onChange } = this.props;
    let shouldDateChange = true;
    if (onChange !== undefined) {
      let isValid = true;
      shouldDateChange = onChange(newDate, isValid);
    }

    if (shouldDateChange) {
      this.setState({
        date: newDate,
      });
    }
  }

  onFocusListener(e) {
    //콜백함수가 있으면 실행.
    let { onFocus } = this.props;
    if (onFocus !== undefined) {
      onFocus();
    }
  }

  onBlurListener(e) {
    //유효성 옵션에 따라 이벤트 리스너 호출
    let { validOption } = this.props;
    let inputNode;
    let isValid = false;
    switch (validOption) {
      case this.VALID_OPTION.TITLE:
        inputNode = e.target;
        isValid = this.onTitleBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.NAME:
        inputNode = e.target;
        isValid = this.onNameBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.NICKNAME:
        inputNode = e.target;
        isValid = this.onNicknameBlur(inputNode, inputNode.value);
        break;
      case this.VALID_OPTION.EMAIL:
        inputNode = e.target;
        isValid = this.onEmailBlur(inputNode, inputNode.value);
        break;
      default:
        break;
    }

    //콜백함수가 있으면 실행.
    let { onBlur } = this.props;
    if (onBlur !== undefined) {
      onBlur(isValid); //유효성 검증 결과를 인자로 보내줌.
    }
  }

  onTitleBlur(inputNode, title) {
    let isValid = true;
    if (title.length < 3) {
      inputNode.value = "제목은 3자 이상 입력해야합니다.";
      isValid = false;
    }

    return isValid;
  }

  onNameBlur(inputNode, name) {
    let isValid = true;

    if (name.length < 3) {
      inputNode.value = "이름은 3자 이상 입력해야합니다.";
      isValid = false;

      return isValid;
    }

    if (!ValidateUtil.nameValidate(name) && name !== "") {
      inputNode.value = "이름은 문자로만 이루어져야 합니다.";
      isValid = false;
    }

    return isValid;
  }

  onNicknameBlur(inputNode, nickname) {
    let isValid = true;

    if (nickname.length < 2) {
      inputNode.value = "이름은 2자 이상 입력해야합니다.";
      isValid = false;

      return isValid;
    }

    if (!ValidateUtil.nicknameValidate(nickname) && nickname !== "") {
      inputNode.value = "닉네임은 문자, 숫자로만 이루어져야 합니다.";
      isValid = false;
    }

    return isValid;
  }

  onEmailBlur(inputNode, email) {
    let isValid = true;

    if (!ValidateUtil.emailValidate(email) && email !== "") {
      inputNode.value = "이메일 형식에 맞지 않습니다.";
      isValid = false;
    }

    return isValid;
  }

  render() {
    let input = this.getInput();
    return <label className="kohub-form-input">{input}</label>;
  }
}

export default FormInput;
