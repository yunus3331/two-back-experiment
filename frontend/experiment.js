const jsPsych = initJsPsych({
  display_element: "jspsych-target",

  on_finish: function () {
    //console.log(jsPsych.data.get().values());
    //console.log(finalResult);
  },
});

const BACKEND_URL = "/api";

async function getNextFeedback() {
  try {
    const response = await fetch(
      `${BACKEND_URL}/feedback/next`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    //پاک شود
    //console.log("====================================");
    //console.log("FEEDBACK RECEIVED FROM BACKEND");
    //console.log("====================================");

    //console.log(result);

    return result.feedback_type;

  } catch (error) {
    //پاک شود
    //console.error("====================================");
    //console.error("ERROR GETTING FEEDBACK");
    //console.error("====================================");

    //console.error(error);

    throw error;
  }
}

async function sendExperimentResult() {

  if (!finalResult) {
    //console.error(
    //  "Final result is not available."
    //);

    return false;
  }

  const data = {
    student_id:
      finalResult.student_id,

    stage1_score:
      finalResult.stage1_score,

    stage2_score:
      finalResult.stage2_score,

    feedback_type:
      finalResult.feedback_type,
  };

  //پاک شود
  //console.log("====================================");
  //console.log("SENDING RESULT TO BACKEND");
  //console.log("====================================");

  //console.table(data);


  try {

    const response = await fetch(
      `${BACKEND_URL}/results`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );


    if (!response.ok) {

      throw new Error(
        `HTTP error! status: ${response.status}`
      );

    }


    const result =
      await response.json();

    //پاک شود
    //console.log("====================================");
    //console.log("BACKEND RESPONSE");
    //console.log("====================================");

    //console.log(result);


    return true;


  } catch (error) {

    //پاک شود
    //console.error("====================================");
    //console.error("ERROR SENDING RESULT");
    //console.error("====================================");

    //console.error(error);


    return false;
  }
}

function getDeviceType() {

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "mobile"
    : "desktop";
}

let participantData = {

  student_id: null,

  device_type:
    getDeviceType(),

  feedback_type: null,
};

let finalResult = null;

const timeline = [];

const welcome = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: `

    <div class="min-h-screen flex items-center justify-center px-6 select-none">

      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">

        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          به آزمایش 2-Back خوش آمدید
        </h1>

        <p class="text-lg leading-9 text-gray-600 mb-8">
          در این آزمایش، تعدادی حرف به صورت پشت سر هم
          روی صفحه نمایش داده می‌شوند.
        </p>

        <p class="text-lg leading-9 text-gray-600 mb-8">
          لازم است با دقت به حروف توجه کنید و قوانین آزمایش
          را در طول انجام آن رعایت کنید.
        </p>

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">

          <p class="text-blue-800 leading-8">
            قبل از شروع آزمایش، لطفاً دستورالعمل‌های مرحله بعد
            را با دقت مطالعه کنید.
          </p>

        </div>

        <button
          id="continue-button"
          type="button"
          class="w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-bold transition"
        >
          ادامه
        </button>

        <p class="text-gray-400 text-sm mt-4">
          یا کلید Enter را فشار دهید.
        </p>

      </div>

    </div>

  `,


  choices:
    "NO_KEYS",


  on_load: function () {

    const button =
      document.getElementById(
        "continue-button"
      );


    function continueTrial() {

      jsPsych.finishTrial();

    }


    button.addEventListener(
      "click",
      continueTrial
    );


    document.addEventListener(
      "keydown",

      function handleKey(event) {

        if (event.key === "Enter") {

          event.preventDefault();


          document.removeEventListener(
            "keydown",
            handleKey
          );


          continueTrial();

        }

      }
    );

  },

};


timeline.push(welcome);

const participantInfo = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: `

    <div class="min-h-screen flex items-center justify-center px-6 select-none">

      <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-12">

        <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">
          اطلاعات شرکت‌کننده
        </h2>

        <label
          for="student-id"
          class="block text-lg font-medium text-gray-700 mb-3"
        >
          شماره دانشجویی
        </label>

        <input
          id="student-id"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          class="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-center"
          placeholder="شماره دانشجویی خود را وارد کنید"
        />

        <p
          id="student-id-error"
          class="text-red-600 text-center mt-3 hidden"
        >
          لطفاً شماره دانشجویی خود را وارد کنید.
        </p>

        <button
          id="continue-button"
          type="button"
          class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-bold"
        >
          ادامه
        </button>

      </div>

    </div>

  `,


  choices:
    "NO_KEYS",


  on_load: function () {

    const input =
      document.getElementById(
        "student-id"
      );


    const error =
      document.getElementById(
        "student-id-error"
      );


    const button =
      document.getElementById(
        "continue-button"
      );


    input.focus();


    function continueToInstructions() {

      const studentId =
        input.value.trim();


      if (studentId === "") {

        error.classList.remove(
          "hidden"
        );

        input.focus();

        return;
      }


      participantData.student_id =
        studentId;


      //console.log("Participant Data:");

      //console.log(participantData);


      jsPsych.finishTrial({

        student_id:
          studentId,

      });

    }


    button.addEventListener(
      "click",
      continueToInstructions
    );


    input.addEventListener(
      "keydown",

      function (event) {

        if (event.key === "Enter") {

          event.preventDefault();

          continueToInstructions();

        }

      }
    );

  },

};


timeline.push(participantInfo);

const instructions = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: `

    <div class="min-h-screen flex items-center justify-center px-6 select-none">

      <div class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12">

        <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">
          دستورالعمل آزمایش
        </h2>

        <div class="space-y-6 text-lg leading-9 text-gray-700">

          <p>
            در هر مرحله، حروف یکی‌یکی روی صفحه نمایش داده می‌شوند.
          </p>

          <p>
            وظیفه شما این است که بررسی کنید آیا
            <span class="font-bold text-blue-600">
              حرف فعلی
            </span>
            با حرفی که
            <span class="font-bold text-blue-600">
              دو جایگاه قبل
            </span>
            نمایش داده شده است، یکسان است یا خیر.
          </p>


          <div class="bg-green-50 border border-green-200 rounded-xl p-5">

            <p class="text-green-800">

              اگر حرف فعلی با حرف دو جایگاه قبل یکسان بود:

            </p>

            <ul class="mt-3 space-y-2 text-green-800">

              <li>
                <span class="font-bold">در کامپیوتر یا لپ‌تاپ:</span>
                کلید
                <span class="font-bold">
                  Space
                </span>
                را فشار دهید.
              </li>

              <li>
                <span class="font-bold">در گوشی:</span>
                صفحه را لمس کنید.
              </li>

            </ul>

          </div>


          <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">

            <p class="text-gray-700">

              اگر حرف فعلی با حرف دو جایگاه قبل یکسان نبود،
              هیچ کلیدی را فشار ندهید و صفحه را لمس نکنید.

            </p>

          </div>


          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">

            <p class="font-bold text-blue-800 mb-4">
              مثال:
            </p>

            <div
              class="flex justify-center items-center gap-6 text-3xl font-bold text-gray-800"
              dir="ltr"
            >

              <span>A</span>
              <span>→</span>
              <span>B</span>
              <span>→</span>
              <span>A</span>

            </div>

            <p class="mt-5 text-blue-800 leading-8">

              حرف سوم با حرف اول یکسان است؛
              بنابراین:

            </p>

            <p class="mt-2 text-blue-800 leading-8">

              <span class="font-bold">
                در کامپیوتر یا لپ‌تاپ:
              </span>
              کلید
              <span class="font-bold">
                Space
              </span>
              را فشار دهید.

            </p>

            <p class="text-blue-800 leading-8">

              <span class="font-bold">
                در گوشی:
              </span>
              صفحه را لمس کنید.

            </p>

          </div>


          <div class="text-center pt-4">

            <button
              id="start-button"
              type="button"
              class="w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-bold transition"
            >
              شروع آزمایش
            </button>

            <p class="text-gray-400 text-sm mt-4">
              در کامپیوتر می‌توانید کلید Enter را نیز فشار دهید.
            </p>

          </div>

        </div>

      </div>

    </div>

  `,


  choices:
    "NO_KEYS",


  on_load: function () {

    const button =
      document.getElementById(
        "start-button"
      );


    function startExperiment() {

      jsPsych.finishTrial();

    }


    button.addEventListener(
      "click",
      startExperiment
    );


    document.addEventListener(
      "keydown",

      function handleKey(event) {

        if (event.key === "Enter") {

          event.preventDefault();


          document.removeEventListener(
            "keydown",
            handleKey
          );


          startExperiment();

        }

      }
    );

  },

};

timeline.push(instructions);

const stage1Trials = [

  { stim_char: "K", corr_ans: null },
  { stim_char: "R", corr_ans: null },
  { stim_char: "K", corr_ans: " " },
  { stim_char: "R", corr_ans: " " },
  { stim_char: "M", corr_ans: null },
  { stim_char: "F", corr_ans: null },
  { stim_char: "M", corr_ans: " " },
  { stim_char: "F", corr_ans: " " },
  { stim_char: "F", corr_ans: null },
  { stim_char: "X", corr_ans: null },
  { stim_char: "P", corr_ans: null },
  { stim_char: "X", corr_ans: " " },
  { stim_char: "P", corr_ans: " " },
  { stim_char: "D", corr_ans: null },
  { stim_char: "X", corr_ans: null },
  { stim_char: "D", corr_ans: " " },
  { stim_char: "V", corr_ans: null },
  { stim_char: "S", corr_ans: null },
  { stim_char: "V", corr_ans: " " },
  { stim_char: "V", corr_ans: null },
  { stim_char: "S", corr_ans: null },
  { stim_char: "Z", corr_ans: null },
  { stim_char: "L", corr_ans: null },
  { stim_char: "V", corr_ans: null },
  { stim_char: "Z", corr_ans: null },
  { stim_char: "B", corr_ans: null },
  { stim_char: "V", corr_ans: null },
  { stim_char: "B", corr_ans: " " },

];

const stage1Trial = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: function () {

    const stimChar =
      jsPsych.evaluateTimelineVariable(
        "stim_char"
      );


    return `

      <div
        id="nback-stimulus"
        class="h-screen flex items-center justify-center select-none"
      >

        <div class="text-7xl md:text-8xl font-bold text-gray-800">
          ${stimChar}
        </div>

      </div>

    `;

  },


  choices:
    "NO_KEYS",

  response_ends_trial:
    false,


  data: {

    trial_type:
      "nback",

    task:
      "response",

    stage:
      1,

    stim_char:
      jsPsych.timelineVariable(
        "stim_char"
      ),

    corr_ans:
      jsPsych.timelineVariable(
        "corr_ans"
      ),

    device_type:
      getDeviceType(),

  },


  on_load: function () {

    const deviceType =
      getDeviceType();


    let response =
      null;

    let rt =
      null;


    const trialStartTime =
      performance.now();


    let trialFinished =
      false;


    function registerResponse() {

      if (response !== null) {

        return;

      }


      response =
        " ";


      rt =
        performance.now() -
        trialStartTime;

    }


    function handleKeyDown(event) {

      if (event.code === "Space") {

        event.preventDefault();

        registerResponse();

      }

    }


    function handleTouch(event) {

      event.preventDefault();

      registerResponse();

    }


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    if (deviceType === "mobile") {

      document.addEventListener(
        "touchstart",
        handleTouch,
        { passive: false }
      );

    }


    const stimulusTimeout =
      setTimeout(() => {

        const stimulus =
          document.getElementById(
            "nback-stimulus"
          );


        if (stimulus) {

          stimulus.innerHTML =
            "";

        }

      }, 400);


    setTimeout(() => {

      if (trialFinished) {

        return;

      }


      trialFinished =
        true;


      document.removeEventListener(
        "keydown",
        handleKeyDown
      );


      if (deviceType === "mobile") {

        document.removeEventListener(
          "touchstart",
          handleTouch
        );

      }


      clearTimeout(
        stimulusTimeout
      );


      jsPsych.finishTrial({

        response:
          response,

        rt:
          rt,

      });

    }, 800);

  },

};


const stage1Procedure = {

  timeline: [
    stage1Trial
  ],

  timeline_variables:
    stage1Trials,

  randomize_order:
    false,

};


timeline.push(
  stage1Procedure
);

let stage1FinalScore = 0;
let selectedFeedback = null;

const feedbacks = [
  {
    type: "negative_destructive",
    text: "نتیجه عملکرد شما در مرحله اول نامطلوب و پایین‌تر از میانگین استاندارد این تست بود. واقعا ناامیدکننده بود و از فردی در سطح دانشگاه تهران توقع می‌رفت به‌راحتی بتواند امتیاز مطلوب این بخش را کسب کند و از عهده این تکلیف ساده برآید.",
  },
  {
    type: "negative_supportive",
    text: "نتیجه عملکرد شما در مرحله اول نامطلوب و پایین‌تر از میانگین استاندارد این تست بود. اما این نتیجه اصلا جای نگرانی ندارد، ما می‌دانیم که تست N-back چالش‌برانگیز است و حفظ توجه برای عملکرد مطلوب در این تسک کار دشواری می‌تواند باشد. هدف ما در اینجا این است که با بازخورد دادن یاد بگیریم که چجوری می‌توانیم تمرکز بالاتری داشته باشیم و مطمئنیم که در مرحله بعد حتما شاهد پیشرفت در عملکرد شما خواهیم بود.",
  },
  {
    type: "positive_destructive",
    text: "نتیجه عملکرد شما در مرحله اول مطلوب و بالاتر از میانگین استاندارد این تست بود. بااین‌حال، بهتر است بابت این نتیجه بیش از حد به خودت اطمینان پیدا نکنی؛ ممکن است آسان بودن این مرحله یا شانس هم در آن نقش داشته باشد. در هر صورت، این نتیجه به‌تنهایی چیز زیادی درباره توانایی واقعی تو ثابت نمی‌کند. فعلاً این عملکرد را برای مرحله اول می‌پذیریم؛ باید دید در مرحله بعد هم می‌توانی همین نتیجه را تکرار کنی یا نه.",
  },
  {
    type: "positive_supportive",
    text: "نتیجه عملکرد شما در مرحله اول مطلوب و بالاتر از میانگین استاندارد این تست بود. ما می‌دانیم که حفظ توجه و کسب عملکرد مطلوب در این تست چه کار سخت و دشواری است و برای کسب این نتیجه درخشان بهت تبریک می‌گم اما برای یک نخبه دانشگاه تهرانی سقفی وجود ندارد و همیشه جا برای پیشرفت هست و مطمئنم در مرحله دوم امتیاز بالاتری کسب می‌کنی.",
  },
];

const stage1FeedbackTrial = {
  type: jsPsychHtmlKeyboardResponse,

  choices: "NO_KEYS",

  stimulus: ` <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-6 select-none"> <h2 class="text-3xl md:text-4xl font-bold text-gray-800"> پایان مرحله اول </h2> <div id="stage1-feedback" class="max-w-3xl bg-blue-100 text-blue-900 rounded-xl p-6 text-lg md:text-xl leading-9 text-center" > در حال دریافت بازخورد... </div> <button id="stage1-continue-button" type="button" disabled class="w-full max-w-xs bg-gray-300 text-gray-500 rounded-xl py-3 text-lg font-bold cursor-not-allowed transition" > در حال دریافت بازخورد... </button> <p class="text-gray-400 text-sm"> یا کلید Enter را فشار دهید. </p> </div> `,
  
  on_load: function () {

    //const scoreElement =
    //  document.getElementById("stage1-score");

    const feedbackElement =
      document.getElementById("stage1-feedback");

    const continueButton =
      document.getElementById("stage1-continue-button");

    const trials = jsPsych.data
      .get()
      .filter({
        task: "response",
        stage: 1,
      });

    trials.values().forEach((trial) => {

      if (trial.corr_ans === null) {

        trial.correct = trial.response === null;

      } else {

        trial.correct =
          jsPsych.pluginAPI.compareKeys(
            trial.response,
            trial.corr_ans
          );
      }
    });


    const correctTrials =
      trials.filter({
        correct: true,
      });

    stage1FinalScore = correctTrials.count();

    //scoreElement.innerHTML =
    //  `امتیاز شما در مرحله اول: ${stage1FinalScore}/${trials.count()}`;

    let feedbackLoaded = false;
    let loadingFeedback = false;
    let trialFinished = false;

    function continueToStage2() {
      if (trialFinished) {
        return;
      }

      if (!feedbackLoaded) {
        return;
      }

      trialFinished = true;

      document.removeEventListener(
        "keydown",
        handleEnter
      );

      continueButton.removeEventListener(
        "click",
        handleButtonClick
      );

      //console.log(
      //  "Stage 1 feedback finished."
      //);

      //console.log(
      //  "Moving to Stage 2..."
      //);

      jsPsych.finishTrial();
    }


    function handleButtonClick() {
      continueToStage2();
    }


    function handleEnter(event) {

      if (event.key === "Enter") {

        event.preventDefault();

        continueToStage2();
      }
    }


    async function loadFeedback() {

      if (loadingFeedback) {
        return;
      }

      loadingFeedback = true;

      continueButton.disabled = true;

      continueButton.textContent =
        "در حال دریافت بازخورد...";


      try {

        //console.log(
        //  "Requesting feedback from backend..."
        //);


        const response = await fetch(
          "/api/feedback/next"
        );


        if (!response.ok) {

          throw new Error(
            `HTTP error: ${response.status}`
          );
        }


        const result =
          await response.json();


        //console.log(
        //  "Feedback received:",
        //  result
        //);


        selectedFeedback =
          feedbacks.find(
            (feedback) =>
              feedback.type === result.feedback_type
          );


        if (!selectedFeedback) {

          throw new Error(
            "Feedback type received from backend is invalid."
          );
        }

        participantData.feedback_type =
          selectedFeedback.type;

        feedbackElement.innerHTML =
          selectedFeedback.text;

        feedbackLoaded = true;

        continueButton.disabled = false;

        continueButton.classList.remove(
          "bg-gray-300",
          "text-gray-500",
          "cursor-not-allowed"
        );

        continueButton.classList.add(
          "bg-blue-600",
          "hover:bg-blue-700",
          "text-white",
          "cursor-pointer"
        );

        continueButton.textContent =
          "ادامه";


        //console.log(
        //  "Feedback successfully displayed."
        //);

      } catch (error) {

        //console.error(
        //  "Error getting feedback:",
        //  error
        //);


        feedbackElement.innerHTML = `
          <div style="
            color: red;
            margin-bottom: 15px;
          ">
            دریافت بازخورد با مشکل مواجه شد.
          </div>

          <div style="
            font-size: 15px;
            color: #777;
          ">
            لطفاً دوباره تلاش کنید.
          </div>
        `;


        continueButton.disabled = false;

        continueButton.textContent =
          "تلاش مجدد";

      } finally {

        loadingFeedback = false;
      }
    }


    continueButton.addEventListener(
      "click",
      handleButtonClick
    );

    document.addEventListener(
      "keydown",
      handleEnter
    );

    loadFeedback();
  },


  on_finish: function (data) {

    data.stage1_score =
      stage1FinalScore;

    data.feedback_type =
      selectedFeedback
        ? selectedFeedback.type
        : null;

    data.feedback_text =
      selectedFeedback
        ? selectedFeedback.text
        : null;


    //console.log(
    //  "Stage 1 feedback trial finished."
    //);

    //console.log(
    //  "Stage 1 score:",
    //  stage1FinalScore
    //);

    //console.log(
    //  "Feedback type:",
    //  selectedFeedback
    //    ? selectedFeedback.type
    //    : null
    //);
  },
};

timeline.push(stage1FeedbackTrial);


const paperQuestionnaires = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: `

    <div class="min-h-screen flex items-center justify-center px-6 select-none">

      <div class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">

        <h2 class="text-3xl font-bold text-gray-800 mb-8">
          پرسش‌نامه‌ها
        </h2>


        <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">

          <p class="text-lg md:text-xl text-blue-900 leading-9">

            قبل از ادامه آزمایش، لطفاً پرسش‌نامه‌های کاغذی
            را که در اختیار شما قرار گرفته است، با دقت تکمیل کنید.

          </p>

        </div>


        <p class="text-lg md:text-xl text-gray-700 leading-9 mb-8">

          پس از تکمیل پرسش‌نامه‌ها، برای ادامه آزمایش
          و ورود به مرحله دوم، دکمه «ادامه» را بزنید.

        </p>


        <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">

          <p class="text-gray-600">

            لطفاً تا زمانی که پرسش‌نامه‌ها را کامل نکرده‌اید،
            ادامه ندهید.

          </p>

        </div>


        <button
          id="continue-questionnaire-button"
          type="button"
          class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-bold transition"
        >
          ادامه
        </button>


        <p class="text-gray-400 text-sm mt-4">
          یا کلید Enter را فشار دهید.
        </p>

      </div>

    </div>

  `,


  choices:
    "NO_KEYS",


  on_load: function () {

    const button =
      document.getElementById(
        "continue-questionnaire-button"
      );


    function continueToStage2() {

      jsPsych.finishTrial();

    }


    button.addEventListener(
      "click",
      continueToStage2
    );


    document.addEventListener(
      "keydown",

      function handleKey(event) {

        if (
          event.key ===
          "Enter"
        ) {

          event.preventDefault();


          document.removeEventListener(
            "keydown",
            handleKey
          );


          continueToStage2();

        }

      }
    );

  },


  data: {

    trial_type:
      "questionnaire_instruction",

    task:
      "paper_questionnaires",

  },

};


timeline.push(
  paperQuestionnaires
);

const stage2Trials = [

  { stim_char: "A", corr_ans: null },
  { stim_char: "D", corr_ans: null },
  { stim_char: "A", corr_ans: " " },
  { stim_char: "D", corr_ans: " " },
  { stim_char: "H", corr_ans: null },
  { stim_char: "H", corr_ans: null },
  { stim_char: "H", corr_ans: " " },
  { stim_char: "J", corr_ans: null },
  { stim_char: "J", corr_ans: null },
  { stim_char: "H", corr_ans: null },
  { stim_char: "S", corr_ans: null },
  { stim_char: "E", corr_ans: null },
  { stim_char: "H", corr_ans: null },
  { stim_char: "E", corr_ans: " " },
  { stim_char: "S", corr_ans: null },
  { stim_char: "K", corr_ans: null },
  { stim_char: "L", corr_ans: null },
  { stim_char: "K", corr_ans: " " },
  { stim_char: "L", corr_ans: " " },
  { stim_char: "K", corr_ans: " " },
  { stim_char: "N", corr_ans: null },
  { stim_char: "N", corr_ans: null },
  { stim_char: "N", corr_ans: " " },
  { stim_char: "C", corr_ans: null },
  { stim_char: "K", corr_ans: null },
  { stim_char: "C", corr_ans: " " },
  { stim_char: "C", corr_ans: null },
  { stim_char: "K", corr_ans: null },

];

const stage2Trial = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: function () {

    const stimChar =
      jsPsych.evaluateTimelineVariable(
        "stim_char"
      );


    return `

      <div
        id="nback-stimulus"
        class="h-screen flex items-center justify-center select-none"
      >

        <div class="text-7xl md:text-8xl font-bold text-gray-800">
          ${stimChar}
        </div>

      </div>

    `;

  },


  choices:
    "NO_KEYS",

  response_ends_trial:
    false,


  data: {

    trial_type:
      "nback",

    task:
      "response",

    stage:
      2,

    stim_char:
      jsPsych.timelineVariable(
        "stim_char"
      ),

    corr_ans:
      jsPsych.timelineVariable(
        "corr_ans"
      ),

    device_type:
      getDeviceType(),

  },


  on_load: function () {

    const deviceType =
      getDeviceType();


    let response =
      null;

    let rt =
      null;


    const trialStartTime =
      performance.now();


    let trialFinished =
      false;


    function registerResponse() {

      if (response !== null) {

        return;

      }


      response =
        " ";


      rt =
        performance.now() -
        trialStartTime;

    }


    function handleKeyDown(event) {

      if (
        event.code ===
        "Space"
      ) {

        event.preventDefault();

        registerResponse();

      }

    }


    function handleTouch(event) {

      event.preventDefault();

      registerResponse();

    }


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    if (
      deviceType ===
      "mobile"
    ) {

      document.addEventListener(
        "touchstart",
        handleTouch,
        { passive: false }
      );

    }


    const stimulusTimeout =
      setTimeout(() => {

        const stimulus =
          document.getElementById(
            "nback-stimulus"
          );


        if (stimulus) {

          stimulus.innerHTML =
            "";

        }

      }, 400);


    setTimeout(() => {

      if (trialFinished) {

        return;

      }


      trialFinished =
        true;


      document.removeEventListener(
        "keydown",
        handleKeyDown
      );


      if (
        deviceType ===
        "mobile"
      ) {

        document.removeEventListener(
          "touchstart",
          handleTouch
        );

      }


      clearTimeout(
        stimulusTimeout
      );


      jsPsych.finishTrial({

        response:
          response,

        rt:
          rt,

      });

    }, 800);

  },

};

const stage2Procedure = {

  timeline: [
    stage2Trial
  ],

  timeline_variables:
    stage2Trials,

  randomize_order:
    false,

};


timeline.push(
  stage2Procedure
);

let stage2FinalScore = 0;


let isSending = false;


const stage2Result = {

  type:
    jsPsychHtmlKeyboardResponse,


  stimulus: function () {

    const trials =
      jsPsych.data
        .get()
        .filter({
          task:
            "response",

          stage:
            2,
        });


    trials.values().forEach(
      (trial) => {

        if (
          trial.corr_ans ===
          null
        ) {

          trial.correct =
            trial.response ===
            null;

        } else {

          trial.correct =
            jsPsych.pluginAPI.compareKeys(
              trial.response,
              trial.corr_ans
            );

        }

      }
    );


    const correctTrials =
      trials.filter({
        correct:
          true,
      });


    stage2FinalScore =
      correctTrials.count();

    finalResult = {

      student_id:
        participantData.student_id,

      stage1_score:
        stage1FinalScore,

      stage2_score:
        stage2FinalScore,

      feedback_type:
        participantData.feedback_type,

      device_type:
        participantData.device_type,

    };


    //console.log("====================================");

    //console.log(
    //  "FINAL RESULT CREATED"
    //);

    //console.log("====================================");

    //console.table(
    //  finalResult
    //);


    return `

      <div class="min-h-screen flex flex-col items-center justify-center gap-8 px-6 select-none">

        <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
          پایان مرحله دوم
        </h2>


        <div class="max-w-3xl bg-blue-100 text-blue-900 rounded-xl p-6 text-lg md:text-xl leading-9 text-center">

          از شما بابت شرکت در این تست و زمانی که برای انجام آن اختصاص دادید،
          صمیمانه تشکر می‌کنیم.

        </div>


        <button
          id="finish-experiment-button"
          type="button"
          class="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-bold transition"
        >
          پایان آزمایش
        </button>


        <p class="text-gray-400 text-sm">
          یا کلید Enter را فشار دهید.
        </p>

      </div>

    `;

  },


  choices:
    "NO_KEYS",


  on_load: function () {

    const button =
      document.getElementById(
        "finish-experiment-button"
      );


    async function finishExperiment() {

      if (isSending) {

        return;

      }


      isSending =
        true;


      button.disabled =
        true;


      button.textContent =
        "در حال ثبت نتیجه...";


      const success =
        await sendExperimentResult();


      if (success) {

        //console.log(
        //  "===================================="
        //);

        //console.log(
        //  "EXPERIMENT RESULT SAVED"
        //);

        //console.log(
        //  "===================================="
        //);


        jsPsych.finishTrial();


      } else {

        isSending =
          false;


        button.disabled =
          false;


        button.textContent =
          "تلاش مجدد";


        alert(
          "ثبت نتیجه با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
        );

      }

    }


    button.addEventListener(
      "click",
      finishExperiment
    );


    function handleEnter(event) {

      if (
        event.key ===
        "Enter"
      ) {

        event.preventDefault();

        finishExperiment();

      }

    }


    document.addEventListener(
      "keydown",
      handleEnter
    );

  },


  data: function () {

    return {

      trial_type:
        "result",

      task:
        "final_result",

      stage:
        2,

      stage2_score:
        stage2FinalScore,

      student_id:
        participantData.student_id,

      stage1_score:
        stage1FinalScore,

      feedback_type:
        participantData.feedback_type,

      device_type:
        participantData.device_type,

    };

  },


  on_finish: function () {

    //console.log("====================================");

    //console.log(
    //  "EXPERIMENT FINISHED"
    //);

    //console.log("====================================");


    //console.log(
    //  finalResult
    //);


    //console.log(
    //  "JSON FORMAT:"
    //);


    //console.log(
    //  JSON.stringify(
    //    finalResult,
    //    null,
    //    2
    //  )
    //);

  },

};


timeline.push(
  stage2Result
);


jsPsych.run(
  timeline
);

