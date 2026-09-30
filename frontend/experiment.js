const jsPsych = initJsPsych({
  display_element: "jspsych-target",

  on_finish: function () {
    console.log(jsPsych.data.get().values());
  },
});


// ========================================
// Timeline
// ========================================

const timeline = [];


// ========================================
// Welcome
// ========================================

const welcome = {
  type: jsPsychHtmlKeyboardResponse,

  stimulus: `
    <div class="min-h-screen flex items-center justify-center px-6">
      
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

        <p class="text-gray-500">
          برای ادامه، یک کلید از صفحه‌کلید را فشار دهید.
        </p>

      </div>

    </div>
  `,

  choices: "ALL_KEYS",
};

timeline.push(welcome);


// ========================================
// Instructions
// ========================================

const instructions = {
  type: jsPsychHtmlKeyboardResponse,

  stimulus: `
    <div class="min-h-screen flex items-center justify-center px-6">
      
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
              اگر حرف فعلی با حرف دو جایگاه قبل یکسان بود،
              کلید
              <span class="font-bold">
                Space
              </span>
              را فشار دهید.
            </p>
          </div>

          <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p class="text-gray-700">
              اگر حرف فعلی با حرف دو جایگاه قبل یکسان نبود،
              هیچ کلیدی را فشار ندهید.
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
              بنابراین باید کلید
              <span class="font-bold">
                Space
              </span>
              را فشار دهید.
            </p>

          </div>

          <p class="text-center text-gray-500 pt-4">
            برای شروع آزمایش، یک کلید از صفحه‌کلید را فشار دهید.
          </p>

        </div>

      </div>

    </div>
  `,

  choices: "ALL_KEYS",
};

timeline.push(instructions);


// ========================================
// Stage 1 Trials
// ========================================

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


// ========================================
// Stage 1 Trial
// ========================================

const stage1Trial = {
  type: jsPsychHtmlKeyboardResponse,

  stimulus: function () {

    const stimChar =
      jsPsych.evaluateTimelineVariable("stim_char");

    return `
      <div
        id="nback-stimulus"
        class="h-screen flex items-center justify-center"
      >
        <div class="text-7xl md:text-8xl font-bold text-gray-800">
          ${stimChar}
        </div>
      </div>
    `;
  },

  // فقط Space پاسخ معتبر است
  choices: [" "],

  // کل Trial = 800ms
  trial_duration: 800,

  // با زدن Space، Trial تمام نشود
  response_ends_trial: false,

  // داده‌های خام Trial
  data: {
    trial_type: "nback",
    task: "response",
    stage: 1,

    stim_char: jsPsych.timelineVariable("stim_char"),
    corr_ans: jsPsych.timelineVariable("corr_ans"),
  },

  // بعد از 400ms حرف حذف شود
  on_load: function () {

    setTimeout(() => {

      const stimulus =
        document.getElementById("nback-stimulus");

      if (stimulus) {
        stimulus.innerHTML = "";
      }

    }, 400);
  },
};


// ========================================
// Stage 1 Procedure
// ========================================

const stage1Procedure = {
  timeline: [
    stage1Trial
  ],

  timeline_variables: stage1Trials,

  randomize_order: false,
};

timeline.push(stage1Procedure);


// ========================================
// Stage 1 Score
// ========================================

const stage1Score = {
  type: jsPsychHtmlKeyboardResponse,

  stimulus: function () {

    // گرفتن فقط Trialهای مربوط به پاسخ در Stage 1
    const trials = jsPsych.data
      .get()
      .filter({
        task: "response",
        stage: 1,
      });


    // محاسبه correct برای هر Trial
    trials.values().forEach((trial) => {

      if (trial.corr_ans === null) {

        // Non-target:
        // اگر هیچ پاسخی نداده باشد، درست است
        trial.correct = trial.response === null;

      } else {

        // Target:
        // پاسخ باید Space باشد
        trial.correct =
          jsPsych.pluginAPI.compareKeys(
            trial.response,
            trial.corr_ans
          );
      }

    });


    // فقط پاسخ‌های صحیح
    const correctTrials = trials.filter({
      correct: true,
    });


    // امتیاز از 28
    const score = correctTrials.count();


    return `
      <div class="min-h-screen flex items-center justify-center px-6">

        <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">

          <h2 class="text-3xl font-bold text-gray-800 mb-8">
            پایان مرحله اول
          </h2>

          <p class="text-lg text-gray-600 mb-6">
            امتیاز شما در مرحله اول:
          </p>

          <div class="text-6xl font-bold text-blue-600 mb-8">
            ${score}
            <span class="text-3xl text-gray-500">
              / 28
            </span>
          </div>

          <p class="text-gray-500">
            برای ادامه، یک کلید از صفحه‌کلید را فشار دهید.
          </p>

        </div>

      </div>
    `;
  },

  choices: "ALL_KEYS",
};

timeline.push(stage1Score);


// ========================================
// Run Experiment
// ========================================

jsPsych.run(timeline);
