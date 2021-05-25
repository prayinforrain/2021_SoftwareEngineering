/* global daum */
import React, { useEffect } from "react";
import "../style/modal.css";
import "../style/destination.css";
import axios from "axios";

const DestinationEnroll = ({ onClose, user }) => {
    const formCheck = (e) => {
        e.preventDefault();
        const form = document.getElementById("destination_form");
        const {
            postcode,
            roadAddress,
            jibunAddress1,
            jibunAddress2,
            extraAddress,
            customerName,
            customerContact
        } = form;
        if(
            !(
                postcode.value &&
                roadAddress.value &&
                jibunAddress1.value &&
                jibunAddress2.value &&
                extraAddress.value &&
                customerName.value &&
                customerContact.value
            )
        ) {
            alert("정보를 모두 채워주세요.");
            return;
        }
        console.log(user.id + typeof(user.id));

        axios({
            method: "POST",
            url: "http://localhost:3001/add_destination",
            data: {
                postcode: postcode.value,
                roadAddress: roadAddress.value,
                jibunAddress1: jibunAddress1.value,
                jibunAddress2: jibunAddress2.value,
                extraAddress: extraAddress.value,
                //addressOwner : 로그인 세션에서 유저ID의 데이터베이스상 인덱스번호(id)를 숫자형태로 기입
                addressOwner: user.id,
                customerName: customerName.value,
                customerContact: customerContact.value
            },
        }).then((res) => {
            console.log(res);
            onClose();
            alert('등록 완료');
        }).catch(err=>{
            console.log("err occured : " + err);
            alert("Error occured");
            return;
        })
    }

    async function execDaumPostcode() {
        await new daum.Postcode({
            oncomplete: function (data) {
                var roadAddr = data.roadAddress;
                var extraRoadAddr = "";

                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraRoadAddr +=
                        extraRoadAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }
                if (extraRoadAddr !== "") {
                    extraRoadAddr = " (" + extraRoadAddr + ")";
                }

                document.getElementById("postcode").value = data.zonecode;
                document.getElementById("roadAddress").value = roadAddr;
                document.getElementById("jibunAddress1").value =
                    data.jibunAddress;

                if (roadAddr !== "") {
                    document.getElementById(
                        "jibunAddress2"
                    ).value = extraRoadAddr;
                } else {
                    document.getElementById("jibunAddress2").value = "";
                }

                var guideTextBox = document.getElementById("guide");
                if (data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML =
                        "(예상 도로명 주소 : " + expRoadAddr + ")";
                    guideTextBox.style.display = "block";
                } else if (data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML =
                        "(예상 지번 주소 : " + expJibunAddr + ")";
                    guideTextBox.style.display = "block";
                } else {
                    guideTextBox.innerHTML = "";
                    guideTextBox.style.display = "none";
                }
            },
        }).open();
    }
    return (
        <div id="member_container">
            <div className="destination_enroll_container">
                <div className="title">배송지 등록</div>
                <form action="#" id="destination_form">
                    <div className="input_box">
                        <span className="form_span">수령인 이름</span>
                        <input
                            type="text"
                            id="customerName"
                            placeholder="수령인 이름"
                        />
                    </div>
                    <div className="input_box">
                        <span className="form_span">수령인 연락처</span>
                        <input
                            type="text"
                            id="customerContact"
                            placeholder="수령인 연락처"
                        />
                    </div>
                    <div className="input_box">
                        <span className="form_span">우편번호</span>
                        <input
                            type="text"
                            id="postcode"
                            placeholder="우편번호"
                        />
                        <input
                            id="search_button"
                            type="button"
                            onClick={execDaumPostcode}
                            value="우편번호 찾기"
                        />
                        <br />
                    </div>
                    <div className="input_box">
                        <span className="form_span">도로명 주소</span>
                        <input
                            type="text"
                            id="roadAddress"
                            placeholder="도로명주소"
                        />
                    </div>
                    <div className="input_box">
                        <span className="form_span">지번 주소</span>
                        <input
                            type="text"
                            id="jibunAddress1"
                            placeholder="지번주소"
                        />
                    </div>
                    <div className="input_box">
                        <span className="form_span"></span>
                        <input
                            type="text"
                            id="jibunAddress2"
                            placeholder="참고항목"
                        />
                    </div>
                    <span
                        id="guide"
                        style={{ color: "#999", display: "none" }}
                    ></span>
                    <div className="input_box">
                        <span className="form_span">상세 주소</span>
                        <input
                            type="text"
                            id="extraAddress"
                            placeholder="상세주소"
                        />
                    </div>
                    <div className="button_box">
                        <button type="submit"
                        onClick={formCheck}>등록하기</button>
                        <button onClick={onClose}>취소하기</button>
                    </div>
                    {
                        useEffect(() => {
                            const script = document.createElement("script");
                            script.src =
                                "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
                            script.async = true;

                            document.body.appendChild(script);

                            return () => {
                                document.body.removeChild(script);
                            };
                        }, [])

                        /* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
                <script>
                    function execDaumPostcode() {
                        new daum.Postcode({
                            oncomplete: function(data) {
                                var roadAddr = data.roadAddress; 
                                var extraRoadAddr = ''; 
                
                                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                                    extraRoadAddr += data.bname;
                                }
                                if(data.buildingName !== '' && data.apartment === 'Y'){
                                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                                }
                                if(extraRoadAddr !== ''){
                                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                                }
                
                                document.getElementById('postcode').value = data.zonecode;
                                document.getElementById("roadAddress").value = roadAddr;
                                document.getElementById("jibunAddress").value = data.jibunAddress;

                                if(roadAddr !== ''){
                                    document.getElementById("extraAddress").value = extraRoadAddr;
                                } else {
                                    document.getElementById("extraAddress").value = '';
                                }
                
                                var guideTextBox = document.getElementById("guide");
                                if(data.autoRoadAddress) {
                                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                                    guideTextBox.style.display = 'block';
                
                                } else if(data.autoJibunAddress) {
                                    var expJibunAddr = data.autoJibunAddress;
                                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                                    guideTextBox.style.display = 'block';
                                } else {
                                    guideTextBox.innerHTML = '';
                                    guideTextBox.style.display = 'none';
                                }
                            }
                        }).open();
                    }
                </script> */
                    }
                </form>
            </div>
        </div>
    );
};

export default DestinationEnroll;
