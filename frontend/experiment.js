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


  const participantInfo = {
    type: jsPsychHtmlKeyboardResponse,
  
    stimulus: `
      <div class="min-h-screen flex items-center justify-center px-6">
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
  
          <p id="student-id-error"
             class="text-red-600 text-center mt-3 hidden">
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
  
    choices: "NO_KEYS",
  
    on_load: function () {
      const input = document.getElementById("student-id");
      const error = document.getElementById("student-id-error");
      const button = document.getElementById("continue-button");
  
      input.focus();
  
      function continueToInstructions() {
        const studentId = input.value.trim();
  
        if (studentId === "") {
          error.classList.remove("hidden");
          input.focus();
          return;
        }
  
        jsPsych.finishTrial({
          student_id: studentId,
        });
      }
  
      button.addEventListener("click", continueToInstructions);
  
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          continueToInstructions();
        }
      });
    },
  };
  
  timeline.push(participantInfo);
  
  
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
  // Stage 1 Result
  // ========================================
  
  let stage1FinalScore = 0;
  let selectedFeedback = null;
  
  
  // ========================================
  // Feedbacks
  // ========================================
  
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
  
  
  // ========================================
  // Stage 1 Feedback Trial
  // ========================================
  
  const stage1Feedback = {
    type: jsPsychHtmlKeyboardResponse,
  
    stimulus: function () {
  
      // ------------------------------------
      // گرفتن Trialهای مرحله اول
      // ------------------------------------
  
      const trials = jsPsych.data
        .get()
        .filter({
          task: "response",
          stage: 1,
        });
  
  
      // ------------------------------------
      // محاسبه correct برای هر Trial
      // ------------------------------------
  
      trials.values().forEach((trial) => {
  
        if (trial.corr_ans === null) {
  
          // Non-target:
          // نباید پاسخی داده شده باشد
  
          trial.correct =
            trial.response === null;
  
        } else {
  
          // Target:
          // باید Space زده شده باشد
  
          trial.correct =
            jsPsych.pluginAPI.compareKeys(
              trial.response,
              trial.corr_ans
            );
  
        }
  
      });
  
  
      // ------------------------------------
      // محاسبه Score
      // ------------------------------------
  
      const correctTrials = trials.filter({
        correct: true,
      });
  
      stage1FinalScore = correctTrials.count();
  
  
      // ------------------------------------
      // انتخاب تصادفی Feedback
      // ------------------------------------
  
      selectedFeedback =
        feedbacks[
          Math.floor(
            Math.random() * feedbacks.length
          )
        ];
  
  
      // ------------------------------------
      // نمایش Feedback
      // ------------------------------------
  
      return `
        <div class="h-screen flex flex-col items-center justify-center gap-8 px-6">
  
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            پایان مرحله اول
          </h2>
  
          <div class="text-4xl md:text-5xl font-bold text-gray-800">
            ${stage1FinalScore} / 28
          </div>
  
          <div class="max-w-3xl bg-blue-100 text-blue-900 rounded-xl p-6 text-lg md:text-xl leading-9 text-center">
            ${selectedFeedback.text}
          </div>
  
          <p class="text-lg text-gray-600">
            برای ادامه، یک کلید از صفحه‌کلید را فشار دهید.
          </p>
  
        </div>
      `;
    },
  
  
    choices: "ALL_KEYS",
  
  
    // ------------------------------------
    // داده‌های Trial مربوط به Feedback
    // ------------------------------------
  
    data: function () {
  
      return {
        trial_type: "feedback",
  
        task: "feedback",
  
        stage: 1,
  
        stage1_score: stage1FinalScore,
  
        feedback_type: selectedFeedback
          ? selectedFeedback.type
          : null,
  
        feedback_text: selectedFeedback
          ? selectedFeedback.text
          : null,
      };
  
    },
  };
  
  timeline.push(stage1Feedback);
  
  
  // ========================================
  // Run Experiment
  // ========================================
  
  jsPsych.run(timeline);