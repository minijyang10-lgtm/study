// ==============================
// 오늘의 건강 팁
// ==============================

const tips = [
    "하루 30분 이상 걷기를 실천해 보세요.",
    "금연은 심장질환 예방에 가장 효과적인 방법입니다.",
    "주 3회 이상 운동하면 심혈관 건강에 도움이 됩니다.",
    "짜게 먹는 습관을 줄이면 혈압 관리에 도움이 됩니다.",
    "스트레스는 심장 건강에도 영향을 줍니다."
];

const tipText = document.getElementById("tipText");

if (tipText) {

    const random = Math.floor(Math.random() * tips.length);

    tipText.textContent = tips[random];

}


// ==============================
// 검사 횟수
// ==============================

let count = Number(localStorage.getItem("testCount")) || 0;

const countText = document.getElementById("testCount");

if (countText) {

    countText.textContent = count;

}


// ==============================
// 1단계 기본정보 저장
// ==============================

const basicForm = document.getElementById("basicForm");

if (basicForm) {

    basicForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const basicData = {

            name: document.getElementById("name").value,

            age: document.getElementById("age").value,

            gender: document.querySelector('input[name="gender"]:checked').value,

            height: document.getElementById("height").value,

            weight: document.getElementById("weight").value

        };

        localStorage.setItem("basicData", JSON.stringify(basicData));

        window.location.href = "input2.html";

    });

}


// ==============================
// 2단계 건강정보 저장
// ==============================

const healthForm = document.getElementById("healthForm");

if (healthForm) {

    healthForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const healthData = {

            smoking: document.getElementById("smoking").value,

            exercise: document.getElementById("exercise").value,

            stress: document.getElementById("stress").value,

            systolic: Number(document.getElementById("systolic").value),

            diastolic: Number(document.getElementById("diastolic").value)

        };

        localStorage.setItem("healthData", JSON.stringify(healthData));

        count++;

        localStorage.setItem("testCount", count);

        window.location.href = "result.html";

    });

}


// ==============================
// 결과 출력
// ==============================

const resultBox = document.getElementById("resultBox");

if (resultBox) {

    const basic = JSON.parse(localStorage.getItem("basicData"));

    const health = JSON.parse(localStorage.getItem("healthData"));

    if (basic && health) {

        const bmi = (
            basic.weight /
            ((basic.height / 100) * (basic.height / 100))
        ).toFixed(1);

        // BMI 판정

        let bmiResult = "";
        let bmiColor = "";

        if (bmi < 18.5) {

            bmiResult = "저체중";
            bmiColor = "#3498db";

        }

        else if (bmi < 23) {

            bmiResult = "정상";
            bmiColor = "#2ecc71";

        }

        else if (bmi < 25) {

            bmiResult = "과체중";
            bmiColor = "#f39c12";

        }

        else {

            bmiResult = "비만";
            bmiColor = "#e74c3c";

        }


        let score = 0;


        if (health.smoking == "흡연") score += 30;

        if (health.exercise == "거의 안 함") score += 20;

        if (health.stress >= 4) score += 20;

        if (health.systolic >= 140) score += 20;

        if (health.diastolic >= 90) score += 10;


        let level = "";
        let color = "";


        if (score < 30) {

            level = "낮음";

            color = "#2ecc71";

        }

        else if (score < 60) {

            level = "보통";

            color = "#f39c12";

        }

        else {

            level = "높음";

            color = "#e74c3c";

        }


        resultBox.innerHTML = `

        <div class="result-card">

            <h2>예측 결과</h2>

            <h1 style="color:${color};">${level}</h1>

            <p>위험 점수 : ${score}점</p>

            <div class="progress">

                <div class="progress-bar" id="bar"></div>

            </div>

        </div>


        <div class="result-card">

            <h2>BMI 분석</h2>

            <h1 style="color:${bmiColor};">
                ${bmi}
            </h1>

            <h3 style="color:${bmiColor}; margin-top:10px;">
                ${bmiResult}
            </h3>

        </div>


        <div class="result-card">

            <h2>입력 정보</h2>

            <table class="info-table">

                <tr><td>이름</td><td>${basic.name}</td></tr>

                <tr><td>나이</td><td>${basic.age}</td></tr>

                <tr><td>성별</td><td>${basic.gender}</td></tr>

                <tr><td>키</td><td>${basic.height} cm</td></tr>

                <tr><td>몸무게</td><td>${basic.weight} kg</td></tr>

                <tr><td>혈압</td><td>${health.systolic}/${health.diastolic}</td></tr>

                <tr><td>흡연</td><td>${health.smoking}</td></tr>

                <tr><td>운동</td><td>${health.exercise}</td></tr>

                <tr><td>스트레스</td><td>${health.stress}</td></tr>

            </table>

        </div>

        
        `;

        const bar = document.getElementById("bar");

        setTimeout(() => {

            bar.style.width = score + "%";

            bar.style.background = color;

        }, 200);

    }

}
const openInfo = document.getElementById("openInfo");
const emergencyBox = document.getElementById("emergencyBox");

if(openInfo){

    openInfo.addEventListener("click",()=>{

        if(emergencyBox.style.display==="block"){

            emergencyBox.style.display="none";
            openInfo.innerHTML="심정지 리듬 알아보기 ▼";

        }else{

            emergencyBox.style.display="block";
            openInfo.innerHTML="닫기 ▲";

        }

    });

}
const saveBtn = document.getElementById("saveBtn");

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        html2canvas(document.querySelector("#captureArea"), {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        }).then(canvas => {

            const link = document.createElement("a");

            link.download = "HeartCare_Result.png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        });

    });

}
