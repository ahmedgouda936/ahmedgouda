// أسئلة الاختبار
const questions = [
    {
        question: "ما هي شهادة الدكتوراة التي حصل عليها الدكتور أكاش أحامد؟",
        options: ["الجيوفيزياء", "البيولوجيا", "الفيزياء النظرية", "الكيمياء"],
        correct: 0  // إجابة 1
    },
    {
        question: "في أي مجال تخصص الدكتور أكاش أحامد؟",
        options: ["علم الطيور", "علم الهيدرولوجيا", "علم الفضاء", "علم الأرض"],
        correct: 1  // إجابة 2
    },
    {
        question: "ما هو موضوع البحوث التي أجراها الدكتور أكاش أحامد؟",
        options: ["الكوارث الطبيعية", "النمو الاقتصادي", "الطب البشري", "التكنولوجيا الحيوية"],
        correct: 0  // إجابة 1
    },
    {
        question: "في أي عام بدأ العمل على مشروع إنذار مبكر للفيضانات في مصر؟",
        options: ["2015", "2016", "2017", "2018"],
        correct: 2  // إجابة 3
    },
    {
        question: "ما هي الأماكن الأكثر عرضة للفيضانات في مصر؟",
        options: ["الصحراء الغربية", "الدلتا والمناطق الساحلية وسيناء", "وادي النيل", "القاهرة"],
        correct: 1  // إجابة 2
    },
    {
        question: "من أي دولة حصل الدكتور أكاش أحامد على شهادة الدكتوراة؟",
        options: ["مصر", "كندا", "المملكة المتحدة", "الولايات المتحدة الأمريكية"],
        correct: 3  // إجابة 4
    },
    {
        question: "يساعدنا الإنذار ______ على وضع خطط تخفف من تأثير الفيضان؟",
        options: ["القضائي", "للحرائق", "الأخير", "المبكر"],
        correct: 3  // إجابة 4
    },
    {
        question: "يعتمد نظام الإنذار المبكر للاستشعار عن بعد على:",
        options: ["السفن الفضائية", "الطائرات الحربية", "الأقمار الصناعية", "أبراج المراقبة"],
        correct: 2  // إجابة 3
    },
    {
        question: "حصل الدكتور أحامد على شهادة الدكتوراة في:",
        options: ["الطب", "الجيوفيزياء", "الهندسة", "المسرح"],
        correct: 1  // إجابة 2
    }
];

// الرسائل التشجيعية
const encouragingMessages = [
    "أحسنت! إجابة صحيحة ",
    "ممتاز! معلوماتك جيدة ",
    "رائع! استمر في التقدم ",
    "صحيح تماماً! أنت مميز ",
    "نعم! هذه الإجابة صحيحة "
];

let currentQuestion = 0;
let score = 0;
let playerName = "";
let shuffledQuestions = []; // مصفوفة للأسئلة المخلوطة

// دالة لخلط الأسئلة بشكل عشوائي
function shuffleQuestions() {
    shuffledQuestions = [...questions]; // نسخ الأسئلة الأصلية
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    
    // خلط الخيارات داخل كل سؤال
    shuffledQuestions = shuffledQuestions.map(question => {
        const options = [...question.options];
        const correct = question.correct;
        const correctAnswer = options[correct];
        
        // خلط الخيارات
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // تحديث الإجابة الصحيحة بعد الخلط
        const newCorrect = options.indexOf(correctAnswer);
        
        return {
            question: question.question,
            options: options,
            correct: newCorrect
        };
    });
}

function startQuiz() {
    playerName = document.getElementById("player-name").value.trim();
    if (!playerName) {
        alert("الرجاء إدخال اسمك");
        return;
    }
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = "0";
    shuffleQuestions(); // خلط الأسئلة قبل بدء الاختبار
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const questionData = shuffledQuestions[currentQuestion];
    document.getElementById("question-number").textContent = currentQuestion + 1;
    document.getElementById("question-text").textContent = questionData.question;
    
    const options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].textContent = questionData.options[i];
        options[i].className = "option";
    }
    
    document.getElementById("message").textContent = "";
}

function checkAnswer(selectedOption) {
    const questionData = shuffledQuestions[currentQuestion];
    const options = document.getElementsByClassName("option");
    
    if (options[0].classList.contains("correct") || options[0].classList.contains("wrong")) {
        return;
    }
    
    if (selectedOption === questionData.correct) {
        options[selectedOption].classList.add("correct");
        score += 10;
        document.getElementById("score").textContent = score;
        const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
        document.getElementById("message").textContent = randomMessage;
    } else {
        options[selectedOption].classList.add("wrong");
        options[questionData.correct].classList.add("correct");
        document.getElementById("message").textContent = "للأسف! الإجابة غير صحيحة";
    }
    
    // الانتقال للسؤال التالي بعد ثانية
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < shuffledQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    
    const percentage = (score / (shuffledQuestions.length * 10)) * 100;
    document.getElementById("final-score").textContent = `النتيجة: ${score} من ${shuffledQuestions.length * 10}`;
    
    let message;
    if (percentage === 100) {
        message = `ما شاء الله! أحسنت يا ${playerName}! علامة كاملة `;
    } else if (percentage >= 80) {
        message = `ممتاز يا ${playerName}! نتيجة رائعة `;
    } else if (percentage >= 60) {
        message = `جيد يا ${playerName}! استمر في التعلم `;
    } else {
        message = `شكراً لمشاركتك يا ${playerName}! حاول مرة أخرى `;
    }
    
    document.getElementById("congratulation-message").textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = "0";
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("player-name").value = "";
    shuffleQuestions(); // خلط الأسئلة عند إعادة الاختبار
}
